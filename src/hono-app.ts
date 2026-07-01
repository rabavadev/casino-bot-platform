import { Hono } from "hono";
import type { Update } from "grammy/types";
import { config } from "./config.js";
import { one, query } from "./db.js";
import { encryptToken, newLinkSlug, newWebhookSecret } from "./crypto.js";
import { getBotBySecret, handleUpdateForBot } from "./botEngine.js";
import { getMe, setWebhook } from "./telegram.js";
import { buildDashboard } from "./dashboard.js";
import { logClick } from "./clicks.js";

type Bindings = {
  PUBLIC_BASE_URL: string;
  TOKEN_ENC_KEY: string;
  ADMIN_API_KEY: string;
  IP_HASH_SALT: string;
  DATABASE_URL: string;
  HYPERDRIVE?: { connectionString: string };
};

export function buildHonoApp(): Hono<{ Bindings: Bindings }> {
  const app = new Hono<{ Bindings: Bindings }>();

  app.get("/health", (c) => c.json({ ok: true }));

  // =================================================================
  // 1) TELEGRAM WEBHOOK — one endpoint for ALL bots
  // =================================================================
  app.post("/hook/:secret", async (c) => {
    const secret = c.req.param("secret");
    if (c.req.header("x-telegram-bot-api-secret-token") !== secret) {
      return c.body(null, 401);
    }
    const row = await getBotBySecret(secret);
    if (!row || row.status === "revoked") return c.body(null, 404);
    const update = await c.req.json<Update>();
    await handleUpdateForBot(row, update);
    return c.body(null, 200);
  });

  // =================================================================
  // 2) TRACKED REDIRECT
  // =================================================================
  app.get("/r/:slug", async (c) => {
    const slug = c.req.param("slug");
    const link = await one<{ id: string; referral_url: string }>(
      `SELECT sl.id, o.referral_url
         FROM short_links sl JOIN offers o ON o.id = sl.offer_id
        WHERE sl.slug = $1 AND o.is_active`,
      [slug]
    );
    if (!link) return c.json({ error: "link not found" }, 404);

    const u = c.req.query("u");
    const tgUserId = u && /^\d+$/.test(u) ? Number(u) : null;
    const country = c.req.header("cf-ipcountry") ?? null;
    const ip = c.req.header("cf-connecting-ip") ?? "0.0.0.0";

    // On Workers, use waitUntil so the click log survives the response.
    // On Node (hono dev), fall back to fire-and-forget.
    let ctx: any = null;
    try { ctx = (c as any).executionCtx; } catch { /* not on Workers */ }
    const bg = ctx?.waitUntil
      ? (p: Promise<unknown>) => ctx.waitUntil(p)
      : (p: Promise<unknown>) => void p.catch(() => {});
    bg(logClick(
      link.id, ip,
      c.req.header("user-agent") ?? null,
      c.req.header("referer") ?? null,
      country, tgUserId
    ));
    return c.redirect(link.referral_url);
  });

  // =================================================================
  // 3) ADMIN API
  // =================================================================
  const api = new Hono<{ Bindings: Bindings }>();
  api.use("*", async (c, next) => {
    if (c.req.header("x-api-key") !== config.adminApiKey) {
      return c.json({ error: "bad api key" }, 401);
    }
    await next();
  });

  api.post("/users", async (c) => {
    const body = await c.req.json<{ email?: string; display_name?: string }>();
    return c.json(await one(
      `INSERT INTO users (email, display_name) VALUES ($1, $2)
       RETURNING id, email, display_name`,
      [body.email ?? null, body.display_name ?? null]
    ));
  });

  api.post("/bots", async (c) => {
    const { owner_id, token, welcome_message } = await c.req.json<{
      owner_id: string; token: string; welcome_message?: string;
    }>();
    if (!owner_id || !token) return c.json({ error: "owner_id and token required" }, 400);

    const me = await getMe(token);
    const secret = newWebhookSecret();
    const encToken = await encryptToken(token);

    const row = await one<{ id: string }>(
      `INSERT INTO bots (owner_id, tg_bot_id, username, token_encrypted,
                         token_hint, webhook_secret, status, welcome_message)
       VALUES ($1, $2, $3, $4, $5, $6, 'active', $7)
       ON CONFLICT (tg_bot_id) DO UPDATE
         SET token_encrypted = EXCLUDED.token_encrypted,
             token_hint = EXCLUDED.token_hint,
             webhook_secret = EXCLUDED.webhook_secret,
             status = 'active', updated_at = now()
       RETURNING id`,
      [owner_id, me.id, me.username, encToken, token.slice(-4), secret, welcome_message ?? null]
    );

    await setWebhook(token, `${config.publicBaseUrl}/hook/${secret}`, secret);
    return c.json({ bot_id: row!.id, username: me.username, webhook: "set", try_it: `https://t.me/${me.username}` });
  });

  api.post("/offers", async (c) => {
    const body = await c.req.json<{
      owner_id: string; casino: string; label: string; referral_url: string;
      promo_code?: string; bonus_text?: string; priority?: number;
    }>();
    if (!body.owner_id || !body.casino || !body.label || !body.referral_url)
      return c.json({ error: "owner_id, casino, label, referral_url required" }, 400);

    const slug = body.casino.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const casinoRow = (await one<{ id: string }>(
      `INSERT INTO casinos (slug, name, is_global, created_by)
       VALUES ($1, $2, false, $3)
       ON CONFLICT (slug) DO UPDATE SET name = casinos.name RETURNING id`,
      [slug, body.casino, body.owner_id]
    ))!;

    const offer = (await one<{ id: string }>(
      `INSERT INTO offers (owner_id, casino_id, label, referral_url, promo_code, bonus_text, priority)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [body.owner_id, casinoRow.id, body.label, body.referral_url,
       body.promo_code ?? null, body.bonus_text ?? null, body.priority ?? 0]
    ))!;

    const linkSlug = newLinkSlug();
    await query(
      `INSERT INTO short_links (offer_id, slug, source) VALUES ($1, $2, 'telegram')`,
      [offer.id, linkSlug]
    );
    return c.json({ offer_id: offer.id, tracked_link: `${config.publicBaseUrl}/r/${linkSlug}` });
  });

  api.get("/stats", async (c) => {
    const owner_id = c.req.query("owner_id");
    const days = c.req.query("days") ?? "7";
    if (!owner_id) return c.json({ error: "owner_id required" }, 400);
    return c.json(await query(
      `SELECT o.label, c.name AS casino,
              count(cl.*)::int AS clicks,
              count(cl.*) FILTER (WHERE cl.is_unique)::int AS unique_clicks
         FROM offers o JOIN casinos c ON c.id = o.casino_id
         LEFT JOIN short_links sl ON sl.offer_id = o.id
         LEFT JOIN clicks cl ON cl.short_link_id = sl.id AND cl.ts > now() - make_interval(days => $2::int)
        WHERE o.owner_id = $1
        GROUP BY o.id, o.label, c.name ORDER BY clicks DESC`,
      [owner_id, days]
    ));
  });

  app.route("/api", api);

  // =================================================================
  // 4) STREAMER DASHBOARD (Telegram Login + self-serve UI)
  // =================================================================
  app.route("/", buildDashboard());
  app.get("/", (c) => c.redirect("/dashboard"));

  return app;
}
