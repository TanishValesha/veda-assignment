import { Queue } from "bullmq";
import { ENV } from "../config/env";

export const assignmentQueue = new Queue("assignment-generation", {
  connection: {
    url: ENV.REDIS_URL,
  },
  defaultJobOptions: {
    removeOnComplete: {
      age: 3600, // keep completed jobs for 1 hour then delete
      count: 100, // keep max 100 completed jobs
    },
    removeOnFail: {
      age: 24 * 3600, // keep failed jobs for 24 hours for debugging/retrying
    },
  },
});
