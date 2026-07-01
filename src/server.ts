import Fastify from "fastify";
import type { Update } from "grammy/types";
import { config } from "./config.js";
import { one, query } from "./db.js";
import { encryptToken, newLinkSlug, newWebhookSecret } from "./crypto.js";
import { getBotBySecret, handleUpdateForBot } from "./botEngine.js";
import { getMe, setWebhook } from "./telegram.js";
import { logClick } from "./clicks.js";

export function buildServer() {
  const app = Fastify({ logger: true, trustProxy: true });

  app.get("/health", async () => ({ ok: true }));

  // =================================================================
  // 1) TELEGRAM WEBHOOK — one endpoint for ALL bots, routed by secret
  // =================================================================
  app.post("/hook/:secret", async (req, reply) => {
    const { secret } = req.params as { secret: string };
    if (req.headers["x-telegram-bot-api-secret-token"] !== secret) {
      return reply.code(401).send();
    }
    const row = await getBotBySecret(secret);
    if (!row || row.status === "revoked") return reply.code(404).send();
    await handleUpdateForBot(row, req.body as Update);
    return reply.code(200).send();
  });

  // =================================================================
  // 2) TRACKED REDIRECT — /r/:slug → real affiliate URL (+ click log)
  // =================================================================
  app.get("/r/:slug", async (req, reply) => {
    const { slug } = req.params as { slug: string };
    const link = await one<{ id: string; referral_url: string }>(
      `SELECT sl.id, o.referral_url
         FROM short_links sl JOIN offers o ON o.id = sl.offer_id
        WHERE sl.slug = $1 AND o.is_active`,
      [slug]
    );
    if (!link) return reply.code(404).send({ error: "link not found" });

    const u = (req.query as { u?: string }).u;
    const tgUserId = u && /^\d+$/.test(u) ? Number(u) : null;
    const country = (req.headers["cf-ipcountry"] as string | undefined) ?? null;

    void logClick(
      link.id, req.ip,
      (req.headers["user-agent"] as string | undefined) ?? null,
      (req.headers["referer"] as string | undefined) ?? null,
      country, tgUserId
    );
    return reply.redirect(link.referral_url);
  });

  // =================================================================
  // 3) ADMIN API
  // =================================================================
  app.register(
    async (api) => {
      api.addHook("preHandler", async (req, reply) => {
        if (req.headers["x-api-key"] !== config.adminApiKey) {
          return reply.code(401).send({ error: "bad api key" });
        }
      });

      api.post("/users", async (req) => {
        const { email, display_name } = req.body as { email?: string; display_name?: string };
        return one(
          `INSERT INTO users (email, display_name) VALUES ($1, $2)
           RETURNING id, email, display_name`,
          [email ?? null, display_name ?? null]
        );
      });

      api.post("/bots", async (req, reply) => {
        const { owner_id, token, welcome_message } = req.body as {
          owner_id: string; token: string; welcome_message?: string;
        };
        if (!owner_id || !token) return reply.code(400).send({ error: "owner_id and token required" });

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
        return { bot_id: row!.id, username: me.username, webhook: "set", try_it: `https://t.me/${me.username}` };
      });

      api.post("/offers", async (req, reply) => {
        const { owner_id, casino, label, referral_url, promo_code, bonus_text, priority } =
          req.body as { owner_id: string; casino: string; label: string; referral_url: string;
                        promo_code?: string; bonus_text?: string; priority?: number };
        if (!owner_id || !casino || !label || !referral_url)
          return reply.code(400).send({ error: "owner_id, casino, label, referral_url required" });

        const slug = casino.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const casinoRow = (await one<{ id: string }>(
          `INSERT INTO casinos (slug, name, is_global, created_by)
           VALUES ($1, $2, false, $3)
           ON CONFLICT (slug) DO UPDATE SET name = casinos.name RETURNING id`,
          [slug, casino, owner_id]
        ))!;

        const offer = (await one<{ id: string }>(
          `INSERT INTO offers (owner_id, casino_id, label, referral_url, promo_code, bonus_text, priority)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
          [owner_id, casinoRow.id, label, referral_url, promo_code ?? null, bonus_text ?? null, priority ?? 0]
        ))!;

        const linkSlug = newLinkSlug();
        await query(
          `INSERT INTO short_links (offer_id, slug, source) VALUES ($1, $2, 'telegram')`,
          [offer.id, linkSlug]
        );
        return { offer_id: offer.id, tracked_link: `${config.publicBaseUrl}/r/${linkSlug}` };
      });

      api.get("/stats", async (req, reply) => {
        const { owner_id, days } = req.query as { owner_id?: string; days?: string };
        if (!owner_id) return reply.code(400).send({ error: "owner_id required" });
        return query(
          `SELECT o.label, c.name AS casino,
                  count(cl.*)::int AS clicks,
                  count(cl.*) FILTER (WHERE cl.is_unique)::int AS unique_clicks
             FROM offers o JOIN casinos c ON c.id = o.casino_id
             LEFT JOIN short_links sl ON sl.offer_id = o.id
             LEFT JOIN clicks cl ON cl.short_link_id = sl.id AND cl.ts > now() - make_interval(days => $2::int)
            WHERE o.owner_id = $1
            GROUP BY o.id, o.label, c.name ORDER BY clicks DESC`,
          [owner_id, days ?? "7"]
        );
      });
    },
    { prefix: "/api" }
  );

  return app;
}
