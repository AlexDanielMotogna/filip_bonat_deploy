import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import anfrageRoutes from "./anfrage.js";
import schadenRoutes from "./schadenmeldung/create.js";
import { handleKreditAnfrage } from "./kredit-anfrage.js";

const app = express();

// ✅ CORS configurado
app.use(cors({
  origin: [
    "https://filip-bonat-deploy.vercel.app",
    /\.vercel\.app$/ // permite todos los previews
  ],
  credentials: true
}));

app.use(bodyParser.json({ limit: "25mb" }));

// Rutas
app.use("/api/anfrage", anfrageRoutes);
app.use("/api/schadenmeldung", schadenRoutes);
app.post("/api/kredit-anfrage", handleKreditAnfrage);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ⚠️ Exportar handler para Vercel
export const handler = serverless(app);
