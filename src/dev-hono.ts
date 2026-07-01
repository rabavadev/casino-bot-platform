// Local dev entry that runs the SAME Hono app the Worker uses.
import "dotenv/config";
import { buildHonoApp } from "./hono-app.js";
const app = buildHonoApp();
const port = Number(process.env.PORT ?? 3000);
export default { port, fetch: app.fetch };
console.log(`🚀 Hono app (Worker code path) on :${port}`);
