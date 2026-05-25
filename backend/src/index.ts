import express, { Application, Request, Response } from "express";
import http from "http";
import { connectDB } from "./config/db";
import assignmentRoutes from "./routes/assignment.routes";
import { connectRedis } from "./config/redis";
import { startWorker } from "./queues/worker";
import { WebSocketServer } from "ws";
import { wsManager } from "./ws/wsManager";
import { ENV } from "./config/env";
import cors from "cors";

const app: Application = express();
const server = http.createServer(app);
const PORT = ENV.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://veda-assignment.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/assignments", assignmentRoutes);

// Health check route
app.get("/health", (_, res: Response) => {
  res.json({ success: true, message: "Server is running!" });
});

const wss = new WebSocketServer({ server });
wsManager.init(wss);

async function init() {
  await connectDB();
  await connectRedis();
  startWorker();

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

init().catch((err) => {
  console.error("Failed to initialize server:", err);
  process.exit(1);
});
