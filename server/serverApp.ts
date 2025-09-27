import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import anfrageRoutes from "./api/anfrage";
import schadenRoutes from "./api/schadenmeldung/create";
import { handleKreditAnfrage } from "./api/kredit-anfrage";

const app = express();

// ✅ Middleware CORS
app.use(cors({
  origin: [
    "https://filip-bonat-deploy.vercel.app",
    /\.vercel\.app$/ // permite todos los previews
  ],
  credentials: true
}));

// ✅ Body parser
app.use(bodyParser.json({
  limit: "50mb",
  verify: (req: any, res, buf) => {
    const sizeMB = (buf.length / 1024 / 1024).toFixed(2)
    console.log(`📦 Received payload: ${sizeMB}MB`)


    if (buf.length > 50 * 1024 * 1024) {
      throw new Error(`Request too large: ${sizeMB}MB exceeds 50MB limit`);
    }
  }
}));

// ✅ Logging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ✅ Rutas
app.use("/api/anfrage", anfrageRoutes);
app.use("/api/schadenmeldung", schadenRoutes);
app.post("/api/kredit-anfrage", handleKreditAnfrage);

// ✅ Healthcheck
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// ✅ 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

export default app;