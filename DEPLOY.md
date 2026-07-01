# Deploy Guide — Supabase + Cloudflare Workers

Two services. No VPS. Free tiers cover the whole MVP.

---

## 1. Supabase (database)

1. Create a project at https://supabase.com (free tier)
2. Open the SQL Editor → paste the contents of `schema.sql` → Run
3. Go to Project Settings → Database → Connection string → **URI**
4. Copy it (looks like `postgresql://postgres:PASSWORD@db.XXXXXX.supabase.co:5432/postgres`)
5. Save it — you'll use it as `DATABASE_URL`

That's it. Supabase gives you managed Postgres with the exact version we need.

---

## 2. Cloudflare Workers (app)

### Install wrangler (if you don't have it)
```bash
npm install -g wrangler
wrangler login
```

### Set your secrets
```bash
cd casino-bot-platform

# The Supabase connection string from step 1
wrangler secret put DATABASE_URL

# Generate a token encryption key:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
wrangler secret put TOKEN_ENC_KEY

# Random values for the other two:
wrangler secret put ADMIN_API_KEY
wrangler secret put IP_HASH_SALT
```

### Update PUBLIC_BASE_URL
Edit `wrangler.toml` → change to your actual workers subdomain:
```toml
PUBLIC_BASE_URL = "https://casino-bot-platform.YOUR-SUBDOMAIN.workers.dev"
```
(You'll know the exact URL after your first deploy. Deploy once, then update it.)

### Deploy
```bash
npm run deploy
# or: wrangler deploy
```

### Optional: Hyperdrive (connection pooling)
If you want pooled DB connections (better performance under load):
```bash
wrangler hyperdrive create casino-db \
  --connection-string="postgresql://postgres:PASS@db.PROJECT.supabase.co:5432/postgres"
```
Paste the returned ID into `wrangler.toml` under `[[hyperdrive]]`, then redeploy.

---

## 3. Test the live deployment

```bash
BASE=https://casino-bot-platform.YOUR-SUBDOMAIN.workers.dev
KEY="your ADMIN_API_KEY"

# Create a streamer
curl -s -X POST $BASE/api/users \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"email":"test@test.com","display_name":"TestStreamer"}'

# Onboard their bot (paste a BotFather token)
curl -s -X POST $BASE/api/bots \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"owner_id":"OWNER_ID","token":"BOT_TOKEN","welcome_message":"Welcome!"}'

# Add an offer
curl -s -X POST $BASE/api/offers \
  -H "x-api-key: $KEY" -H "content-type: application/json" \
  -d '{"owner_id":"OWNER_ID","casino":"Stake","label":"Stake - 200% bonus","referral_url":"https://stake.com/?c=CODE","promo_code":"GAMER50"}'

# Open the bot in Telegram → /start → /code
```

---

## Local dev (optional)

```bash
# Install deps
bun install   # or npm install

# Copy env template
cp .env.example .env
# Fill in DATABASE_URL (your Supabase string) + generate keys

# Run the Node version locally
npm run dev

# Or run the Worker locally with wrangler
npm run dev:worker

# Or test a real bot via long polling (no hosting)
bun src/demo.ts <bot-token>
```
