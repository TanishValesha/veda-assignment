import { createClient } from "redis";
import { ENV } from "./env";

export const redisClient = createClient({ url: ENV.REDIS_URL });

export async function connectRedis() {
  redisClient.on("error", (err: any) => console.error("Redis error:", err));
  await redisClient.connect();
  console.log("Redis connected");
}
