-- ============================================================
--  Casino / Streamer Bot Platform  —  PostgreSQL schema
--  Multi-tenant Telegram bot constructor (bring-your-own-token)
--  Core idea: ONE server runs N streamers' bots + tracks every click.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "citext";     -- case-insensitive email/username

-- ---------- ENUM TYPES ----------
CREATE TYPE plan_tier        AS ENUM ('free', 'pro', 'agency');
CREATE TYPE sub_status       AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'expired');
CREATE TYPE bot_status       AS ENUM ('pending', 'active', 'paused', 'revoked');
CREATE TYPE pay_provider     AS ENUM ('crypto', 'telegram_stars', 'manual');
CREATE TYPE pay_status       AS ENUM ('pending', 'confirmed', 'failed', 'refunded');
CREATE TYPE stream_platform  AS ENUM ('twitch', 'kick', 'youtube');
CREATE TYPE broadcast_status AS ENUM ('draft', 'scheduled', 'sending', 'sent', 'failed', 'canceled');


-- ============================================================
--  1. TENANTS  —  your paying customers (the streamers)
-- ============================================================
CREATE TABLE users (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email             CITEXT UNIQUE,
    telegram_user_id  BIGINT UNIQUE,               -- if they log in via Telegram
    display_name      TEXT,
    plan              plan_tier NOT NULL DEFAULT 'free',
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
--  2. BOTS  —  the heart of multi-tenancy.
--     Each row = one streamer's Telegram bot, run by your server.
-- ============================================================
CREATE TABLE bots (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tg_bot_id        BIGINT UNIQUE,               -- numeric id from getMe
    username         TEXT,                         -- @TheirBrandBot
    token_encrypted  BYTEA NOT NULL,               -- AES-GCM ciphertext, NEVER plaintext
    token_hint       TEXT,                         -- last 4 chars, for the dashboard UI
    webhook_secret   TEXT NOT NULL UNIQUE,         -- routing id + X-Telegram secret header
    status           bot_status NOT NULL DEFAULT 'pending',
    welcome_message  TEXT,                         -- shown on /start
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON bots (owner_id);
-- webhook_secret already unique -> that index IS the router lookup.


-- ============================================================
--  3. CASINOS  —  catalog of platforms streamers promote.
--     Global rows are curated by you; users can add custom ones.
-- ============================================================
CREATE TABLE casinos (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug         TEXT UNIQUE NOT NULL,             -- 'stake', 'roobet', 'rollbit'
    name         TEXT NOT NULL,
    logo_url     TEXT,
    website_url  TEXT,
    is_global    BOOLEAN NOT NULL DEFAULT true,    -- platform-curated vs user-added
    created_by   UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
--  4. OFFERS  —  a streamer's specific promo on a casino.
--     THE core content object: their referral link + promo code.
-- ============================================================
CREATE TABLE offers (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id      UUID NOT NULL REFERENCES users(id)   ON DELETE CASCADE,
    casino_id     UUID NOT NULL REFERENCES casinos(id) ON DELETE RESTRICT,
    label         TEXT NOT NULL,                   -- "Stake — 200% deposit bonus"
    referral_url  TEXT NOT NULL,                   -- the REAL affiliate URL
    promo_code    TEXT,                            -- "GAMER50"
    bonus_text    TEXT,                            -- human blurb shown in the bot
    priority      INT  NOT NULL DEFAULT 0,         -- ordering in the /codes list
    is_active     BOOLEAN NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON offers (owner_id, is_active);


-- ============================================================
--  5. SHORT_LINKS  —  tracked redirects (your moat).
--     yoursite.com/r/<slug>  ->  offer.referral_url
--     One offer can have many, one per source/campaign.
-- ============================================================
CREATE TABLE short_links (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id    UUID NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
    slug        TEXT UNIQUE NOT NULL,             -- 'ab12x'  in  /r/ab12x
    source      TEXT,                             -- 'telegram' | 'bio' | 'live-post'
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON short_links (offer_id);


-- ============================================================
--  6. CLICKS  —  raw event log. High volume -> partition by month.
--     Real conversion (deposits) comes later from casino postbacks.
-- ============================================================
CREATE TABLE clicks (
    id             BIGINT GENERATED ALWAYS AS IDENTITY,
    short_link_id  UUID NOT NULL REFERENCES short_links(id) ON DELETE CASCADE,
    ts             TIMESTAMPTZ NOT NULL DEFAULT now(),
    ip_hash        BYTEA,                          -- hashed IP (privacy + dedupe)
    country        TEXT,
    user_agent     TEXT,
    referer        TEXT,
    tg_user_id     BIGINT,                         -- set if click came from inside a bot
    is_unique      BOOLEAN NOT NULL DEFAULT true,
    PRIMARY KEY (id, ts)
) PARTITION BY RANGE (ts);

-- Example monthly partition (automate creation with pg_partman or a cron):
CREATE TABLE clicks_2026_07 PARTITION OF clicks
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');

-- Safety net: catches rows outside defined partitions so inserts NEVER fail.
CREATE TABLE clicks_default PARTITION OF clicks DEFAULT;
CREATE INDEX ON clicks (short_link_id, ts);

-- Pre-aggregated rollup so the dashboard never scans raw clicks:
CREATE TABLE click_daily (
    day            DATE NOT NULL,
    short_link_id  UUID NOT NULL REFERENCES short_links(id) ON DELETE CASCADE,
    clicks         INT  NOT NULL DEFAULT 0,
    unique_clicks  INT  NOT NULL DEFAULT 0,
    PRIMARY KEY (day, short_link_id)
);


-- ============================================================
--  7. BOT_SUBSCRIBERS  —  people who use each streamer's bot.
--     Needed for the /broadcast feature.
-- ============================================================
CREATE TABLE bot_subscribers (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id       UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    tg_user_id   BIGINT NOT NULL,
    tg_username  TEXT,
    first_name   TEXT,
    language     TEXT,
    is_blocked   BOOLEAN NOT NULL DEFAULT false,  -- true once they block the bot
    first_seen   TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_seen    TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (bot_id, tg_user_id)
);
CREATE INDEX ON bot_subscribers (bot_id) WHERE is_blocked = false;


-- ============================================================
--  8. BOT_COMMANDS  —  per-bot custom commands.
--     Maps "/code" etc. to an offer or a text response.
-- ============================================================
CREATE TABLE bot_commands (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id       UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    command      TEXT NOT NULL,                   -- 'code', 'vip'  (no slash)
    response     TEXT,                            -- template; supports {code} {link} {bonus}
    offer_id     UUID REFERENCES offers(id) ON DELETE SET NULL,
    is_enabled   BOOLEAN NOT NULL DEFAULT true,
    UNIQUE (bot_id, command)
);


-- ============================================================
--  9. STREAM_CHANNELS  —  go-live auto-post source.
--     Twitch EventSub / Kick / YouTube -> triggers a post.
-- ============================================================
CREATE TABLE stream_channels (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform         stream_platform NOT NULL,
    channel_name     TEXT NOT NULL,
    external_id      TEXT,                         -- platform user id
    is_live          BOOLEAN NOT NULL DEFAULT false,
    last_live_at     TIMESTAMPTZ,
    auto_post_bot_id UUID REFERENCES bots(id) ON DELETE SET NULL,
    live_template    TEXT,                         -- message posted on go-live
    UNIQUE (platform, channel_name)
);


-- ============================================================
--  10. BROADCASTS  —  mass message to a bot's subscribers.
--      Sent via a rate-limited worker (Telegram ~30 msg/s).
-- ============================================================
CREATE TABLE broadcasts (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bot_id        UUID NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
    body          TEXT NOT NULL,
    media_url     TEXT,
    buttons       JSONB,                           -- inline keyboard spec
    status        broadcast_status NOT NULL DEFAULT 'draft',
    scheduled_at  TIMESTAMPTZ,
    sent_at       TIMESTAMPTZ,
    total_count   INT DEFAULT 0,
    sent_count    INT DEFAULT 0,
    fail_count    INT DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ============================================================
--  11. BILLING  —  crypto / Telegram Stars (NOT Stripe: see notes).
-- ============================================================
CREATE TABLE subscriptions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan                plan_tier NOT NULL,
    status              sub_status NOT NULL DEFAULT 'trialing',
    provider            pay_provider NOT NULL,
    current_period_end  TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON subscriptions (user_id);

CREATE TABLE payments (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id  UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    provider         pay_provider NOT NULL,
    amount           NUMERIC(20,8) NOT NULL,       -- crypto-friendly precision
    currency         TEXT NOT NULL DEFAULT 'USDT',
    tx_ref           TEXT,                         -- chain tx hash / Stars charge id
    status           pay_status NOT NULL DEFAULT 'pending',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON payments (user_id);
