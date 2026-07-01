# Casino Bot Platform — Phase 1 starter

Multi-tenant Telegram bot engine for casino/gambling streamers.
One server runs every streamer's bot (bring-your-own-token), serves their
promo codes via `/code`, and tracks every click on their referral links.

See `ARCHITECTURE.md` for the full design and `schema.sql` for the database.

## What works in Phase 1

- **BYO-token onboarding** — validate via `getMe`, encrypt token (AES-256-GCM), register webhook
- **Multi-bot webhook router** — one `POST /hook/:secret` endpoint runs ALL bots
- **`/start`** — welcome message + subscriber tracking (audience for broadcasts later)
- **`/code`** — sends the streamer's active offers: casino, promo code, tracked claim button
- **Custom commands** — per-bot commands from the `bot_commands` table
- **`GET /r/:slug`** — instant 302 to the real affiliate URL, click logged async
  (salted IP hash, 24h unique detection, country via Cloudflare header, Telegram user attribution)
- **`GET /api/stats`** — clicks + unique clicks per offer

## Run it (~10 minutes)

### 1. Database
```bash
createdb casino_bot
psql postgres://localhost/casino_bot -f schema.sql
```

### 2. Environment
```bash
cp .env.example .env
# generate the encryption key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# paste it into TOKEN_ENC_KEY, set DATABASE_URL + ADMIN_API_KEY + IP_HASH_SALT
```

### 3. Public HTTPS (Telegram requires it)
```bash
cloudflared tunnel --url http://localhost:3000
# copy the https://xxxx.trycloudflare.com URL into PUBLIC_BASE_URL in .env
```

### 4. Start
```bash
npm install
npm run dev
```

### 5. Walkthrough (curl)

Create a test bot in **@BotFather** first and copy its token.

```bash
BASE=http://localhost:3000
KEY="your ADMIN_API_KEY"

# 1. Create a streamer account
curl -s -X POST $BASE/api/users \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"email":"streamer@example.com","display_name":"TestStreamer"}'
# → copy the returned "id" as OWNER

# 2. Onboard their bot (paste the BotFather token)
curl -s -X POST $BASE/api/bots \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"owner_id":"OWNER","token":"123456:ABC-DEF...","welcome_message":"Welcome to my bonus bot 🎰"}'

# 3. Add an offer
curl -s -X POST $BASE/api/offers \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"owner_id":"OWNER","casino":"Stake","label":"Stake — 200% deposit bonus","referral_url":"https://stake.com/?c=YOURCODE","promo_code":"GAMER50","bonus_text":"200% up to $1000 on first deposit"}'

# 4. Open the bot in Telegram → /start → /code
#    Tap the claim button, then check stats:
curl -s "$BASE/api/stats?owner_id=OWNER&days=7" -H "x-api-key: $KEY"
```

## Project layout

```
src/
├── index.ts      boot
├── config.ts     env loading + validation
├── db.ts         pg pool + query helpers
├── crypto.ts     token encryption, IP hashing, slug/secret generation
├── telegram.ts   raw Bot API calls for onboarding (getMe, setWebhook)
├── botEngine.ts  grammY multi-bot factory + /start, /code, custom commands
└── server.ts     Fastify: /hook/:secret router, /r/:slug redirect, /api/*
```

## Production notes

- **Scale out:** the gateway is stateless — run N copies behind a load balancer.
  Move the bot-instance cache invalidation to Redis pub/sub when you do.
- **Click volume:** `clicks` is partitioned monthly; automate partition creation
  (pg_partman or a cron). A DEFAULT partition catches anything unrouted.
- **Heavy handlers:** ack the webhook with 200 immediately and queue the work
  (BullMQ) once handlers do more than a couple of DB queries.
- **Never log tokens.** They only exist decrypted in memory.

## Next (Phase 2)

- Broadcasts: rate-limited worker (~30 msg/s), `broadcasts` table is ready
- Go-live auto-post: Twitch EventSub first, Kick after verifying their API
- Billing: crypto (USDT) / Telegram Stars — schema is ready (`subscriptions`, `payments`)
- Dashboard: Next.js over the same admin API (replace the X-Api-Key auth)
