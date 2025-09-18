import serverless from "serverless-http";
import app from "./serverApp";

// 👇 Esto es lo que Vercel entiende como Serverless Function
export default serverless(app);
