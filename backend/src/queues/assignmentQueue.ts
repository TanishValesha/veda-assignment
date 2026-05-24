import { Queue } from "bullmq";
import { ENV } from "../config/env";

export const assignmentQueue = new Queue("assignment-generation", {
  connection: {
    url: ENV.REDIS_URL,
  },
});
