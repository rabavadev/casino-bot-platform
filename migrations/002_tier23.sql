-- ============================================================
--  Migration 002 — Tier 2/3: billing, broadcasts, postbacks
--  Idempotent: safe to run more than once.
-- ============================================================

-- Broadcast worker: resumable cursor so a batch job can pick up
-- exactly where the previous tick left off.
ALTER TABLE broadcasts ADD COLUMN IF NOT EXISTS cursor_tg_user_id BIGINT NOT NULL DEFAULT 0;

-- Postbacks: each streamer gets a secret key that casinos call.
ALTER TABLE users ADD COLUMN IF NOT EXISTS postback_key TEXT UNIQUE;

-- Clicks carry a public reference id that gets substituted into the
-- affiliate URL ({click_ref}) so casinos can echo it back in postbacks.
ALTER TABLE clicks ADD COLUMN IF NOT EXISTS click_ref TEXT;
CREATE INDEX IF NOT EXISTS clicks_click_ref_idx ON clicks (click_ref);

-- Conversions: registrations / deposits reported by casinos.
CREATE TABLE IF NOT EXISTS conversions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    offer_id    UUID REFERENCES offers(id) ON DELETE SET NULL,
    click_ref   TEXT,
    event       TEXT NOT NULL,               -- 'registration' | 'deposit' | 'cpa' | ...
    amount      NUMERIC(20,8),
    currency    TEXT,
    raw         JSONB,                       -- full query string for debugging
    ts          TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS conversions_owner_idx ON conversions (owner_id, ts);
