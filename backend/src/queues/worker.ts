import { Worker, Job } from "bullmq";
import { ENV } from "../config/env";
import { generateQuestionPaper } from "../services/aiService";
import { Assignment } from "../models/Assignment";
import { QuestionPaper } from "../models/QuestionPaper";
import { wsManager } from "../ws/wsManager";
import { CreateAssignmentDTO } from "../types";
import { generatePDF } from "../services/pdfService";

export interface AssignmentJobData {
  assignmentId: string;
  dto: CreateAssignmentDTO;
}

export function startWorker() {
  const worker = new Worker<AssignmentJobData>(
    "assignment-generation",
    async (job: Job<AssignmentJobData>) => {
      const { assignmentId, dto } = job.data;

      try {
        // 1. Notify frontend: job started
        wsManager.notify(assignmentId, {
          event: "status",
          status: "active",
          message: "Generating your question paper...",
        });

        // 2. Update assignment status
        await Assignment.findByIdAndUpdate(assignmentId, { status: "active" });

        // 3. Generate via Groq
        const paper = await generateQuestionPaper(dto, assignmentId);

        // 4. Save to MongoDB
        const savedPaper = await QuestionPaper.create(paper);
        const pdfUrl = await generatePDF(paper);

        await QuestionPaper.findByIdAndUpdate(savedPaper._id, { pdfUrl });

        // 5. Update assignment status
        await Assignment.findByIdAndUpdate(assignmentId, {
          status: "completed",
          pdfUrl,
        });

        // 6. Notify frontend: done
        wsManager.notify(assignmentId, {
          event: "completed",
          status: "completed",
          assignmentId,
          paper,
          pdfUrl,
        });

        return paper;
      } catch (err: any) {
        // Update status to failed
        await Assignment.findByIdAndUpdate(assignmentId, { status: "failed" });

        // Notify frontend: failed
        wsManager.notify(assignmentId, {
          event: "failed",
          status: "failed",
          message: err.message || "Generation failed",
        });

        throw err;
      }
    },
    {
      connection: {
        url: ENV.REDIS_URL,
      },
    },
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  console.log("BullMQ worker started");
  return worker;
}
