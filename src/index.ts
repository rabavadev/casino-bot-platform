import { buildServer } from "./server.js";
import { config } from "./config.js";

const app = buildServer();

app
  .listen({ port: config.port, host: "0.0.0.0" })
  .then(() => {
    console.log(`🚀 Bot platform listening on :${config.port}`);
    console.log(`   Public base: ${config.publicBaseUrl}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
