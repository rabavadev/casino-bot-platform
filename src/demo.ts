// ------------------------------------------------------------------
// DEMO RUNNER — long polling, zero hosting required.
//   bun src/demo.ts <bot-token-from-BotFather>
// ------------------------------------------------------------------
import { Bot } from "grammy";
import { one } from "./db.js";
import { encryptToken, newWebhookSecret } from "./crypto.js";
import { wireHandlers, type BotRow } from "./botEngine.js";
import { getMe, deleteWebhook } from "./telegram.js";

const token = process.env.DEMO_BOT_TOKEN ?? process.argv[2];
if (!token) {
  console.error("Usage: bun src/demo.ts <bot-token>   (or set DEMO_BOT_TOKEN)");
  process.exit(1);
}

const me = await getMe(token);
console.log(`Token valid: @${me.username}`);

const owner = (await one<{ id: string }>(
  `INSERT INTO users (email, display_name)
   VALUES ('demo@local', 'Demo Streamer')
   ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name
   RETURNING id`
))!;

const encToken = await encryptToken(token);
const row = (await one<BotRow>(
  `INSERT INTO bots (owner_id, tg_bot_id, username, token_encrypted,
                     token_hint, webhook_secret, status)
   VALUES ($1, $2, $3, $4, $5, $6, 'active')
   ON CONFLICT (tg_bot_id) DO UPDATE
     SET token_encrypted = EXCLUDED.token_encrypted, status = 'active', updated_at = now()
   RETURNING id, owner_id, tg_bot_id, username, token_encrypted, webhook_secret,
             status, welcome_message`,
  [owner.id, me.id, me.username, encToken, token.slice(-4), newWebhookSecret()]
))!;

await deleteWebhook(token);
const bot = new Bot(token);
wireHandlers(bot, row);

console.log(`@${me.username} is LIVE via long polling.`);
console.log(`   Open  https://t.me/${me.username}  and send /start then /code`);
console.log(`   Demo owner id: ${owner.id}`);
void bot.start();
