// ------------------------------------------------------------------
// Streamer dashboard: Telegram Login auth + self-serve UI.
//
// Routes:
//   GET  /dashboard            HTML app (login screen or dashboard)
//   POST /auth/telegram        Telegram Login widget callback
//   POST /auth/dev             Dev-only login (ALLOW_DEV_LOGIN=1)
//   POST /auth/logout
//   GET  /dash/api/me
//   GET  /dash/api/offers      list own offers (+ tracked links, clicks)
//   POST /dash/api/offers      create offer
//   PATCH /dash/api/offers/:id toggle active
//   GET  /dash/api/stats/daily clicks per day (14d) for the chart
//   GET  /dash/api/bots        list own bots
//   POST /dash/api/bots        connect a bot (paste BotFather token)
//
// Session: HMAC-SHA256 signed cookie, key = TOKEN_ENC_KEY. Web Crypto
// only, so it runs identically on Node, Bun, and Cloudflare Workers.
// ------------------------------------------------------------------
import { Hono } from "hono";
import { config } from "./config.js";
import { one, query } from "./db.js";
import { encryptToken, newLinkSlug, newWebhookSecret } from "./crypto.js";
import { getMe, setWebhook } from "./telegram.js";

// ---------------- session helpers ----------------

const SESSION_TTL_S = 60 * 60 * 24 * 30; // 30 days

let _hmacKey: CryptoKey | null = null;
async function hmacKey(): Promise<CryptoKey> {
  if (_hmacKey) return _hmacKey;
  _hmacKey = await crypto.subtle.importKey(
    "raw", config.tokenEncKey, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]
  );
  return _hmacKey;
}

async function signSession(payload: { uid: string; exp: number }): Promise<string> {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(), new TextEncoder().encode(body));
  return `${body}.${Buffer.from(sig).toString("base64url")}`;
}

async function verifySession(cookie: string | undefined): Promise<string | null> {
  if (!cookie) return null;
  const [body, sig] = cookie.split(".");
  if (!body || !sig) return null;
  const ok = await crypto.subtle.verify(
    "HMAC", await hmacKey(),
    Buffer.from(sig, "base64url"), new TextEncoder().encode(body)
  );
  if (!ok) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (typeof payload.uid !== "string" || payload.exp < Date.now() / 1000) return null;
    return payload.uid;
  } catch { return null; }
}

function getCookie(header: string | undefined, name: string): string | undefined {
  return header?.split(/;\s*/).find((c) => c.startsWith(name + "="))?.slice(name.length + 1);
}

// ---------------- telegram login verification ----------------

interface TgLogin {
  id: number; first_name?: string; last_name?: string; username?: string;
  photo_url?: string; auth_date: number; hash: string;
}

async function verifyTelegramLogin(data: TgLogin, botToken: string): Promise<boolean> {
  const { hash, ...fields } = data;
  const checkString = Object.keys(fields).sort()
    .filter((k) => (fields as any)[k] !== undefined)
    .map((k) => `${k}=${(fields as any)[k]}`).join("\n");
  const secretKey = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(botToken));
  const key = await crypto.subtle.importKey("raw", secretKey, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(checkString));
  const expected = Buffer.from(sig).toString("hex");
  const fresh = Date.now() / 1000 - data.auth_date < 86400;
  return expected === hash && fresh;
}

// ---------------- app ----------------

export function buildDashboard(): Hono {
  const app = new Hono();

  // ---- auth ----
  app.post("/auth/telegram", async (c) => {
    const loginBotToken = process.env.LOGIN_BOT_TOKEN;
    if (!loginBotToken) return c.json({ error: "telegram login not configured" }, 501);
    const data = await c.req.json<TgLogin>();
    if (!(await verifyTelegramLogin(data, loginBotToken)))
      return c.json({ error: "bad telegram signature" }, 401);

    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || String(data.id);
    const row = (await one<{ id: string }>(
      `INSERT INTO users (telegram_user_id, display_name)
       VALUES ($1, $2)
       ON CONFLICT (telegram_user_id) DO UPDATE SET display_name = EXCLUDED.display_name, updated_at = now()
       RETURNING id`,
      [data.id, name]
    ))!;
    const token = await signSession({ uid: row.id, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_S });
    c.header("Set-Cookie", `sess=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_S}${config.publicBaseUrl.startsWith("https") ? "; Secure" : ""}`);
    return c.json({ ok: true });
  });

  app.post("/auth/dev", async (c) => {
    if (process.env.ALLOW_DEV_LOGIN !== "1") return c.json({ error: "disabled" }, 403);
    const { telegram_user_id, display_name } = await c.req.json<{ telegram_user_id: number; display_name?: string }>();
    const row = (await one<{ id: string }>(
      `INSERT INTO users (telegram_user_id, display_name) VALUES ($1, $2)
       ON CONFLICT (telegram_user_id) DO UPDATE SET updated_at = now() RETURNING id`,
      [telegram_user_id, display_name ?? `dev-${telegram_user_id}`]
    ))!;
    const token = await signSession({ uid: row.id, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_S });
    c.header("Set-Cookie", `sess=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_S}`);
    return c.json({ ok: true });
  });

  app.post("/auth/logout", (c) => {
    c.header("Set-Cookie", "sess=; Path=/; HttpOnly; Max-Age=0");
    return c.json({ ok: true });
  });

  // ---- session-scoped API ----
  const api = new Hono<{ Variables: { uid: string } }>();
  api.use("*", async (c, next) => {
    const uid = await verifySession(getCookie(c.req.header("cookie"), "sess"));
    if (!uid) return c.json({ error: "not logged in" }, 401);
    c.set("uid", uid);
    await next();
  });

  api.get("/me", async (c) => {
    const me = await one(
      `SELECT id, display_name, telegram_user_id, plan, created_at FROM users WHERE id = $1`,
      [c.get("uid")]
    );
    return me ? c.json(me) : c.json({ error: "gone" }, 401);
  });

  api.get("/offers", async (c) => {
    return c.json(await query(
      `SELECT o.id, o.label, ca.name AS casino, o.promo_code, o.bonus_text,
              o.is_active, o.priority, sl.slug,
              count(cl.*)::int AS clicks,
              count(cl.*) FILTER (WHERE cl.is_unique)::int AS unique_clicks
         FROM offers o
         JOIN casinos ca ON ca.id = o.casino_id
         LEFT JOIN short_links sl ON sl.offer_id = o.id
         LEFT JOIN clicks cl ON cl.short_link_id = sl.id
        WHERE o.owner_id = $1
        GROUP BY o.id, ca.name, sl.slug
        ORDER BY o.priority DESC, o.created_at DESC`,
      [c.get("uid")]
    ));
  });

  api.post("/offers", async (c) => {
    const b = await c.req.json<{
      casino: string; label: string; referral_url: string;
      promo_code?: string; bonus_text?: string;
    }>();
    if (!b.casino || !b.label || !b.referral_url)
      return c.json({ error: "casino, label, referral_url required" }, 400);
    try { new URL(b.referral_url); } catch { return c.json({ error: "referral_url must be a valid URL" }, 400); }

    const uid = c.get("uid");
    const slug = b.casino.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const casinoRow = (await one<{ id: string }>(
      `INSERT INTO casinos (slug, name, is_global, created_by) VALUES ($1, $2, false, $3)
       ON CONFLICT (slug) DO UPDATE SET name = casinos.name RETURNING id`,
      [slug, b.casino, uid]
    ))!;
    const offer = (await one<{ id: string }>(
      `INSERT INTO offers (owner_id, casino_id, label, referral_url, promo_code, bonus_text)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [uid, casinoRow.id, b.label, b.referral_url, b.promo_code ?? null, b.bonus_text ?? null]
    ))!;
    const linkSlug = newLinkSlug();
    await query(`INSERT INTO short_links (offer_id, slug, source) VALUES ($1, $2, 'telegram')`, [offer.id, linkSlug]);
    return c.json({ offer_id: offer.id, tracked_link: `${config.publicBaseUrl}/r/${linkSlug}` });
  });

  api.patch("/offers/:id", async (c) => {
    const { is_active } = await c.req.json<{ is_active: boolean }>();
    const row = await one(
      `UPDATE offers SET is_active = $1, updated_at = now()
        WHERE id = $2 AND owner_id = $3 RETURNING id, is_active`,
      [is_active, c.req.param("id"), c.get("uid")]
    );
    return row ? c.json(row) : c.json({ error: "not found" }, 404);
  });

  api.get("/stats/daily", async (c) => {
    return c.json(await query(
      `SELECT to_char(d.day, 'YYYY-MM-DD') AS day,
              coalesce(count(cl.*), 0)::int AS clicks,
              coalesce(count(cl.*) FILTER (WHERE cl.is_unique), 0)::int AS unique_clicks
         FROM generate_series(current_date - 13, current_date, '1 day') AS d(day)
         LEFT JOIN (
             SELECT cl.ts, cl.is_unique FROM clicks cl
               JOIN short_links sl ON sl.id = cl.short_link_id
               JOIN offers o ON o.id = sl.offer_id
              WHERE o.owner_id = $1 AND cl.ts > current_date - 14
         ) cl ON cl.ts::date = d.day
        GROUP BY d.day ORDER BY d.day`,
      [c.get("uid")]
    ));
  });

  api.get("/bots", async (c) => {
    return c.json(await query(
      `SELECT id, username, token_hint, status, created_at FROM bots WHERE owner_id = $1 ORDER BY created_at DESC`,
      [c.get("uid")]
    ));
  });

  api.post("/bots", async (c) => {
    const { token, welcome_message } = await c.req.json<{ token: string; welcome_message?: string }>();
    if (!token) return c.json({ error: "token required" }, 400);
    let me;
    try { me = await getMe(token); }
    catch { return c.json({ error: "Telegram rejected that token — double-check it in @BotFather" }, 400); }

    const uid = c.get("uid");
    const secret = newWebhookSecret();
    const encToken = await encryptToken(token);
    const row = (await one<{ id: string }>(
      `INSERT INTO bots (owner_id, tg_bot_id, username, token_encrypted, token_hint, webhook_secret, status, welcome_message)
       VALUES ($1, $2, $3, $4, $5, $6, 'active', $7)
       ON CONFLICT (tg_bot_id) DO UPDATE
         SET token_encrypted = EXCLUDED.token_encrypted, token_hint = EXCLUDED.token_hint,
             webhook_secret = EXCLUDED.webhook_secret, status = 'active', updated_at = now()
       RETURNING id`,
      [uid, me.id, me.username, encToken, token.slice(-4), secret, welcome_message ?? null]
    ))!;
    await setWebhook(token, `${config.publicBaseUrl}/hook/${secret}`, secret);
    return c.json({ bot_id: row.id, username: me.username, try_it: `https://t.me/${me.username}` });
  });

  app.route("/dash/api", api);

  // ---- HTML ----
  app.get("/dashboard", async (c) => {
    const uid = await verifySession(getCookie(c.req.header("cookie"), "sess"));
    const loginBotUsername = process.env.LOGIN_BOT_USERNAME ?? "";
    const devLogin = process.env.ALLOW_DEV_LOGIN === "1";
    return c.html(uid ? APP_HTML : loginHtml(loginBotUsername, devLogin));
  });

  return app;
}

// ---------------- templates ----------------

const BASE_CSS = `
  :root { --bg:#0d1117; --panel:#161b22; --border:#30363d; --fg:#e6edf3; --dim:#8b949e;
          --accent:#f0b429; --green:#3fb950; --red:#f85149; }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--bg); color:var(--fg); font:15px/1.5 -apple-system,'Segoe UI',Roboto,sans-serif; }
  .wrap { max-width:960px; margin:0 auto; padding:24px 16px; }
  .panel { background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:20px; margin-bottom:20px; }
  h1 { font-size:20px; } h2 { font-size:16px; margin-bottom:12px; color:var(--accent); }
  input, textarea { width:100%; background:var(--bg); color:var(--fg); border:1px solid var(--border);
          border-radius:6px; padding:8px 10px; margin-bottom:10px; font:inherit; }
  button { background:var(--accent); color:#000; border:0; border-radius:6px; padding:8px 16px;
           font:600 14px/1 inherit; cursor:pointer; }
  button.ghost { background:transparent; color:var(--dim); border:1px solid var(--border); }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--border); }
  th { color:var(--dim); font-weight:500; }
  .muted { color:var(--dim); } .ok { color:var(--green); } .off { color:var(--red); }
  .row { display:flex; gap:16px; flex-wrap:wrap; } .row > * { flex:1; min-width:220px; }
  .stat { font-size:28px; font-weight:700; } .copy { cursor:pointer; text-decoration:underline dotted; }
  #toast { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:var(--accent);
           color:#000; padding:10px 18px; border-radius:8px; font-weight:600; display:none; }
`;

function loginHtml(botUsername: string, devLogin: boolean): string {
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Streamer Dashboard — Login</title><style>${BASE_CSS}
  .center { min-height:90vh; display:flex; align-items:center; justify-content:center; }
  .card { text-align:center; max-width:380px; }
</style></head><body>
<div class="center"><div class="panel card">
  <h1 style="margin-bottom:8px">🎰 Streamer Dashboard</h1>
  <p class="muted" style="margin-bottom:20px">Manage your bot, offers and click stats.</p>
  ${botUsername
    ? `<script async src="https://telegram.org/js/telegram-widget.js?22"
         data-telegram-login="${botUsername}" data-size="large"
         data-onauth="onTgAuth(user)" data-request-access="write"></script>`
    : `<p class="muted">Telegram login isn't configured yet (set LOGIN_BOT_TOKEN + LOGIN_BOT_USERNAME).</p>`}
  ${devLogin ? `
  <div style="margin-top:24px;border-top:1px solid var(--border);padding-top:16px">
    <p class="muted" style="margin-bottom:8px">Dev login</p>
    <input id="devid" type="number" placeholder="Telegram user id">
    <button onclick="devLogin()">Enter</button>
  </div>` : ""}
</div></div>
<script>
async function onTgAuth(user) {
  const r = await fetch('/auth/telegram', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(user)});
  if (r.ok) location.reload(); else alert('Login failed: ' + (await r.json()).error);
}
async function devLogin() {
  const id = Number(document.getElementById('devid').value);
  if (!id) return;
  const r = await fetch('/auth/dev', {method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({telegram_user_id:id})});
  if (r.ok) location.reload(); else alert('Failed');
}
</script></body></html>`;
}

const APP_HTML = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Streamer Dashboard</title><style>${BASE_CSS}</style></head><body>
<div class="wrap">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h1>🎰 Streamer Dashboard</h1>
    <div><span id="whoami" class="muted"></span>
    <button class="ghost" onclick="logout()" style="margin-left:10px">Log out</button></div>
  </div>

  <div class="row">
    <div class="panel"><h2>Clicks (14d)</h2><div class="stat" id="totClicks">–</div></div>
    <div class="panel"><h2>Unique (14d)</h2><div class="stat" id="totUnique">–</div></div>
    <div class="panel"><h2>Active offers</h2><div class="stat" id="totOffers">–</div></div>
  </div>

  <div class="panel"><h2>Daily clicks</h2><svg id="chart" width="100%" height="120" preserveAspectRatio="none"></svg>
    <div id="chartLabels" class="muted" style="display:flex;justify-content:space-between;font-size:11px"></div></div>

  <div class="panel"><h2>Your bot</h2>
    <div id="botList" class="muted">Loading…</div>
    <div style="margin-top:12px">
      <input id="botToken" placeholder="Paste bot token from @BotFather (123456:ABC-...)">
      <input id="botWelcome" placeholder="Welcome message (optional)">
      <button onclick="connectBot()">Connect bot</button>
    </div>
  </div>

  <div class="panel"><h2>New offer</h2>
    <div class="row">
      <input id="oCasino" placeholder="Casino (e.g. Stake)">
      <input id="oLabel" placeholder="Label (e.g. 200% deposit bonus)">
    </div>
    <input id="oUrl" placeholder="Your affiliate URL (https://...)">
    <div class="row">
      <input id="oCode" placeholder="Promo code (optional)">
      <input id="oBonus" placeholder="Bonus text shown in bot (optional)">
    </div>
    <button onclick="createOffer()">Create offer</button>
  </div>

  <div class="panel"><h2>Offers</h2>
    <table><thead><tr><th>Offer</th><th>Link</th><th>Clicks</th><th>Unique</th><th>Status</th><th></th></tr></thead>
    <tbody id="offers"></tbody></table>
  </div>
</div>
<div id="toast"></div>
<script>
const $ = (id) => document.getElementById(id);
function toast(msg) { const t=$('toast'); t.textContent=msg; t.style.display='block'; setTimeout(()=>t.style.display='none',2500); }
async function api(path, opts) {
  const r = await fetch('/dash/api'+path, opts);
  if (r.status === 401) { location.reload(); throw new Error('session expired'); }
  return r.json();
}
async function logout() { await fetch('/auth/logout',{method:'POST'}); location.reload(); }

async function load() {
  const me = await api('/me');
  $('whoami').textContent = (me.display_name||'') + ' · ' + me.plan;
  const [offers, daily, bots] = await Promise.all([api('/offers'), api('/stats/daily'), api('/bots')]);

  $('totClicks').textContent = daily.reduce((s,d)=>s+d.clicks,0);
  $('totUnique').textContent = daily.reduce((s,d)=>s+d.unique_clicks,0);
  $('totOffers').textContent = offers.filter(o=>o.is_active).length;

  // chart
  const max = Math.max(1, ...daily.map(d=>d.clicks));
  const w = 100/daily.length;
  $('chart').setAttribute('viewBox','0 0 100 40');
  $('chart').innerHTML = daily.map((d,i)=>{
    const h = d.clicks/max*36;
    return '<rect x="'+(i*w+0.5)+'" y="'+(40-h)+'" width="'+(w-1)+'" height="'+h+'" rx="0.6" fill="#f0b429"><title>'+d.day+': '+d.clicks+'</title></rect>';
  }).join('');
  $('chartLabels').innerHTML = '<span>'+daily[0].day.slice(5)+'</span><span>'+daily[daily.length-1].day.slice(5)+'</span>';

  // bots
  $('botList').innerHTML = bots.length
    ? bots.map(b=>'<div>@'+b.username+' <span class="muted">(…'+b.token_hint+')</span> <span class="'+(b.status==='active'?'ok':'off')+'">'+b.status+'</span></div>').join('')
    : 'No bot connected yet — paste your token below.';

  // offers
  $('offers').innerHTML = offers.map(o=>'<tr>'+
    '<td><b>'+esc(o.casino)+'</b><br><span class="muted">'+esc(o.label)+'</span></td>'+
    '<td>'+(o.slug?'<span class="copy" onclick="copyLink(\\''+o.slug+'\\')">/r/'+o.slug+'</span>':'–')+'</td>'+
    '<td>'+o.clicks+'</td><td>'+o.unique_clicks+'</td>'+
    '<td class="'+(o.is_active?'ok':'off')+'">'+(o.is_active?'active':'off')+'</td>'+
    '<td><button class="ghost" onclick="toggleOffer(\\''+o.id+'\\','+(!o.is_active)+')">'+(o.is_active?'Disable':'Enable')+'</button></td>'+
  '</tr>').join('') || '<tr><td colspan="6" class="muted">No offers yet.</td></tr>';
}
function esc(s){ return (s??'').replace(/[&<>"]/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch])); }
function copyLink(slug){ navigator.clipboard.writeText(location.origin+'/r/'+slug); toast('Link copied'); }
async function toggleOffer(id, on){ await api('/offers/'+id,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify({is_active:on})}); load(); }
async function createOffer(){
  const body = { casino:$('oCasino').value.trim(), label:$('oLabel').value.trim(), referral_url:$('oUrl').value.trim(),
                 promo_code:$('oCode').value.trim()||undefined, bonus_text:$('oBonus').value.trim()||undefined };
  const r = await api('/offers',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  if (r.error) return toast(r.error);
  ['oCasino','oLabel','oUrl','oCode','oBonus'].forEach(id=>$(id).value='');
  toast('Offer created'); load();
}
async function connectBot(){
  const token = $('botToken').value.trim();
  if (!token) return toast('Paste a bot token first');
  const r = await api('/bots',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token, welcome_message:$('botWelcome').value.trim()||undefined})});
  if (r.error) return toast(r.error);
  $('botToken').value=''; toast('Bot @'+r.username+' connected'); load();
}
load();
</script></body></html>`;
