import mongoose, { Schema, Document } from "mongoose";
import { CreateAssignmentDTO, JobStatus } from "../types";

export interface IAssignment extends Document, CreateAssignmentDTO {
  jobId?: string;
  status: JobStatus;
  createdAt: Date;
  pdfUrl?: String;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    dueDate: { type: String, required: true },
    questionConfig: [
      {
        type: {
          type: String,
          enum: ["mcq", "short", "long", "diagram", "numerical", "true_false"],
        },
        count: Number,
        marks: Number,
      },
    ],
    additionalInstructions: String,
    uploadedFileUrl: String,
    jobId: String,
    status: {
      type: String,
      enum: ["waiting", "active", "completed", "failed"],
      default: "waiting",
    },
    pdfUrl: String,
  },
  { timestamps: true },
);

export const Assignment = mongoose.model<IAssignment>(
  "Assignment",
  AssignmentSchema,
);
