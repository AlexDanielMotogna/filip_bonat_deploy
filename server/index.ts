import serverless from "serverless-http";
import app from "./serverApp";

// Exportar handler para Vercel
export const handler = serverless(app);

// Solo para desarrollo local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅ Local server running at http://localhost:${PORT}`);
  });
}
