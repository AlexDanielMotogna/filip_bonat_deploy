import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import anfrageRoutes from "./api/anfrage";
import schadenRoutes from "./api/schadenmeldung/create";
import { handleKreditAnfrage } from "./api/kredit-anfrage";
import { envConfig } from "./config/env";

const app = express();
const PORT = envConfig.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json({
  limit: "25mb",
  verify: (req: any, res, buf) => {
    if (buf.length > 25 * 1024 * 1024) {
      throw new Error('Request entity too large');
    }
  }
}));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Server Error:', err);
  if (err.message === 'Request entity too large') {
    return res.status(413).json({
      success: false,
      message: 'File size exceeds the 25MB limit'
    });
  }
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use("/api/anfrage", anfrageRoutes);
app.use("/api/schadenmeldung", schadenRoutes);
app.post("/api/kredit-anfrage", handleKreditAnfrage);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
  console.log(`📋 Available routes:`);
  console.log(`   POST /api/anfrage`);
  console.log(`   POST /api/schadenmeldung`);
  console.log(`   POST /api/kredit-anfrage`);
  console.log(`   GET  /health`);
});
