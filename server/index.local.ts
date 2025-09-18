import app from "./serverApp";
import { envConfig } from "./config/env";

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
  console.log("📋 Available routes:");
  console.log("   POST /api/anfrage");
  console.log("   POST /api/schadenmeldung");
  console.log("   POST /api/kredit-anfrage");
  console.log("   GET  /health");
});
