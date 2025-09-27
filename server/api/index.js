import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import anfrageRoutes from "./anfrage.js";
import schadenRoutes from "./schadenmeldung/create.js";
import { handleKreditAnfrage } from "./kredit-anfrage.js";

const app = express();

app.use(cors({
  origin: [
    "https://filip-bonat-deploy.vercel.app",
    /\.vercel\.app$/ 
  ],
  credentials: true
}));


app.use(bodyParser.json({ 
  limit: "50mb",
  verify: (req, res, buf) => {
    const sizeMB = (buf.length / 1024 / 1024).toFixed(2)
    console.log(`📦 Request payload size: ${sizeMB}MB`)
    if (buf.length > 50 * 1024 * 1024) {
      throw new Error(`Request too large: ${sizeMB}MB exceeds 50MB limit`)
    }
  }
}));

// Rutas
app.use("/api/anfrage", anfrageRoutes);
app.use("/api/schadenmeldung", schadenRoutes);
app.post("/api/kredit-anfrage", handleKreditAnfrage);

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Exportar handler para Vercel
export const handler = serverless(app);