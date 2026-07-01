# Casino / Streamer Bot Platform — Architecture Reference

A multi-tenant Telegram **bot constructor** for casino & gambling streamers
(Kick / Twitch). Streamers plug in their own bot, load their referral links &
promo codes, and the platform distributes + **tracks** them. One server runs
everyone's bots.

---

## 0. The one hard constraint

**You cannot create Telegram bots with code.** Only @BotFather mints a bot +
token, and there is no API for it. So the model is **bring-your-own-token
(BYO-token)**:

1. Customer creates their bot in @BotFather, copies the token.
2. They paste it into your dashboard.
3. Your server points that bot's webhook at itself.
4. Your one server runs their bot from then on.

The product you build once is **the engine that runs everybody's bots** — not a bot.

---

## 1. System components

```
                          ┌──────────────────────────────┐
                          │      Streamer Dashboard        │  Next.js (web)
                          │  onboarding · offers · stats   │
                          └───────────────┬────────────────┘
                                          │ REST / tRPC
                                          ▼
┌────────────┐   webhook    ┌──────────────────────────────┐
│  Telegram  │ ───────────▶ │        API / Bot Gateway       │
│  (N bots)  │  /hook/:sec  │  • webhook router (by secret)  │
└────────────┘              │  • grammY multi-bot engine     │
      ▲                     │  • /r/:slug redirect service   │
      │ sendMessage         └──────┬──────────────────┬──────┘
      │ (their token)              │ enqueue          │ read/write
      │                           ▼                  ▼
┌─────┴───────┐          ┌────────────────┐   ┌──────────────┐
│  Broadcast  │◀─────────│ Redis          │   │  PostgreSQL  │
│   Worker    │   jobs   │ queue·cache·   │   │  (core data) │
└─────────────┘          │ rate-limit     │   └──────────────┘
                         └────────────────┘
                                 ▲
                                 │ live events
                     ┌───────────┴────────────┐
                     │     Stream Watcher       │
                     │  Twitch EventSub / Kick  │
                     └──────────────────────────┘
```

| Component            | Job                                                                 |
|----------------------|--------------------------------------------------------------------|
| **Dashboard**        | Streamer onboarding, token entry, manage casinos/offers/codes, analytics |
| **API / Bot Gateway**| Single webhook endpoint, routes each update to the right bot, runs bot logic |
| **Redirect service** | `/r/:slug` → 302 to the real affiliate URL, logs the click async    |
| **Broadcast worker** | Rate-limited mass sender (Telegram caps ~30 msg/s)                  |
| **Stream watcher**   | Detects go-live on Twitch/Kick, triggers auto-post                  |
| **PostgreSQL**       | Source of truth (see `schema.sql`)                                  |
| **Redis**            | Job queue, per-bot rate limiting, hot config cache                  |

---

## 2. Multi-bot webhook routing  (the core trick)

One HTTPS endpoint serves thousands of bots. The `webhook_secret` in the URL
tells you which bot an update belongs to.

**When a streamer adds a token:**
```
1. getMe(token)                     → validate, read bot id + @username
2. encrypt(token) → store in bots   → generate a random webhook_secret
3. setWebhook(
     token,
     url         = https://you.com/hook/<webhook_secret>,
     secret_token= <webhook_secret>            // Telegram echoes this back
   )
```

**When a player messages @TheirBot:**
```
4. Telegram → POST /hook/<secret>
              header: X-Telegram-Bot-Api-Secret-Token: <secret>
5. Router: verify header == secret  (reject if not)
6. Look up bot by webhook_secret  → load config + decrypt token  (cache in Redis)
7. grammY handles the update (/start, /code, ...)
8. Reply using THAT bot's token
9. Upsert bot_subscribers (for future broadcasts)
```

One codebase, N bots. To offboard a bot: `deleteWebhook(token)` + set status `revoked`.

---

## 3. Core flows

**`/code` command (the money command)**
```
player: /code
 → load active offers for this bot's owner (ordered by priority)
 → render: casino name · promo code · a TRACKED link (/r/<slug>)
 → inline buttons: [Claim bonus] → the /r/<slug> url
```

**Click tracking (your moat)**
```
player taps /r/ab12x
 → look up short_link by slug  → get offer.referral_url
 → 302 redirect immediately (don't make them wait)
 → async: INSERT into clicks (ts, ip_hash, country, tg_user_id, source)
 → nightly job rolls clicks → click_daily for fast dashboards
```
> Click = free to build and it's the feature streamers actually want.
> **Deposit** conversion needs the casino's **postback/S2S** data (from the
> streamer's affiliate program) — save that for a paid tier.

**Go-live auto-post**
```
Twitch EventSub 'stream.online'  (or Kick poll)
 → find stream_channels row → its auto_post_bot_id + live_template
 → enqueue a broadcast: "I'm LIVE 🔴 + code + link"
```
> Twitch EventSub is clean & documented. Kick's official API is newer/thinner —
> verify current capabilities before promising it.

**Broadcast**
```
streamer composes → broadcasts row (status=scheduled)
 → worker pulls subscribers in batches, respects ~30 msg/s
 → on 403 "bot was blocked" → mark subscriber is_blocked=true
 → update sent_count / fail_count live
```

---

## 4. Data model (see `schema.sql`)

```
users ──1:N── bots ──1:N── bot_subscribers
  │             │
  │             └──1:N── bot_commands ──► offers
  │
  ├──1:N── offers ──► casinos
  │           └──1:N── short_links ──1:N── clicks ──rollup──► click_daily
  │
  ├──1:N── stream_channels ──► bots (auto_post)
  ├──1:N── subscriptions ──1:N── payments
  └──         bots ──1:N── broadcasts
```

Grouped:
- **Tenancy:** `users`, `bots`
- **Content:** `casinos`, `offers`, `short_links`, `bot_commands`
- **Tracking:** `clicks`, `click_daily`
- **Audience:** `bot_subscribers`, `broadcasts`
- **Growth:** `stream_channels`
- **Money:** `subscriptions`, `payments`

---

## 5. Tech stack (recommended)

| Layer        | Pick                          | Why                                            |
|--------------|-------------------------------|------------------------------------------------|
| Bot engine   | **Node + grammY**             | Best-in-class multi-bot / "bots as a service"  |
| API          | Fastify / Hono                | Fast webhook + redirect handling               |
| Dashboard    | Next.js + tRPC                | Type-safe front-to-back                        |
| DB           | PostgreSQL                    | Relational + JSONB + partitioning              |
| Queue/cache  | Redis (BullMQ)                | Broadcast queue, rate-limit, config cache      |
| Clicks @scale| ClickHouse (later)            | If click volume explodes                       |
| Hosting      | Fly.io / Railway / VPS        | Long-lived process + webhook ingress           |

---

## 6. Scaling notes
- **Config cache:** cache `bot by webhook_secret` in Redis; DB only on cache miss.
- **Clicks:** partition by month (shown in schema). Move to ClickHouse if needed.
- **Broadcasts:** per-bot queues; global throttle to respect Telegram limits.
- **Horizontal:** gateway is stateless → scale behind a load balancer; state is in PG/Redis.

## 7. Security notes
- **Tokens are secrets.** AES-GCM encrypt at rest (`token_encrypted`), never log them.
- **Verify every webhook** via the `X-Telegram-Bot-Api-Secret-Token` header.
- **Hash IPs** in `clicks` (privacy + dedupe), don't store raw.
- **Rotate** the webhook secret if a token is ever re-issued.

## 8. Billing landmine (business, not legal advice)
Stripe / Paddle / most mainstream processors ban gambling-adjacent businesses —
they'll approve you then freeze the account later. Your audience is crypto-native
already, so bill in **crypto (USDT)** or **Telegram Stars** from day one. Bake it
in, don't bolt it on.

---

## 9. Build order

**Phase 1 — MVP (prove the loop)**
1. `users` + `bots` + BYO-token onboarding
2. Webhook router + grammY multi-bot
3. `casinos` + `offers` + `/code` command
4. `short_links` + `/r/:slug` redirect + `clicks`
5. Basic stats page (clicks per code)

**Phase 2 — retention**
6. `bot_subscribers` + `/broadcast` + worker
7. `stream_channels` + go-live auto-post (Twitch first)
8. Crypto / Stars billing + plan gating

**Phase 3 — moat**
9. Casino postback ingestion → real deposit/CPA tracking
10. Multi-bot per streamer, agency tier, team seats
