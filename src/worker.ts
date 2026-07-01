// ------------------------------------------------------------------
// Cloudflare Workers entry point.
//
// Uses dynamic import so shared modules (config.ts, db.ts) pick up
// env vars from the Workers runtime before they evaluate.
// ------------------------------------------------------------------
export default {
  async fetch(req: Request, env: Record<string, any>): Promise<Response> {
    // Populate process.env so shared modules work unchanged.
    if (typeof (globalThis as any).process === "undefined") {
      (globalThis as any).process = { env: {} };
    }
    const pe = (globalThis as any).process.env;
    pe.DATABASE_URL = env.HYPERDRIVE?.connectionString ?? env.DATABASE_URL;
    pe.PUBLIC_BASE_URL = env.PUBLIC_BASE_URL;
    pe.TOKEN_ENC_KEY = env.TOKEN_ENC_KEY;
    pe.ADMIN_API_KEY = env.ADMIN_API_KEY;
    pe.IP_HASH_SALT = env.IP_HASH_SALT;
    pe.LOGIN_BOT_TOKEN = env.LOGIN_BOT_TOKEN;
    pe.LOGIN_BOT_USERNAME = env.LOGIN_BOT_USERNAME;
    pe.ALLOW_DEV_LOGIN = env.ALLOW_DEV_LOGIN;

    const { buildHonoApp } = await import("./hono-app.js");
    const app = buildHonoApp();
    return app.fetch(req, env as any);
  },
};
