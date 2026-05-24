import mongoose, { Schema, Document } from "mongoose";
import { GeneratedPaper } from "../types";

export interface IQuestionPaper extends Document, GeneratedPaper {}

const QuestionSchema = new Schema({
  id: String,
  text: String,
  type: String,
  difficulty: { type: String, enum: ["easy", "moderate", "challenging"] },
  marks: Number,
  options: [String],
  answer: String,
});

const SectionSchema = new Schema({
  label: String,
  title: String,
  instruction: String,
  questionType: String,
  questions: [QuestionSchema],
  totalMarks: Number,
});

const QuestionPaperSchema = new Schema<IQuestionPaper>(
  {
    assignmentId: { type: String, required: true, index: true },
    title: String,
    subject: String,
    gradeLevel: String,
    dueDate: String,
    timeAllowed: String,
    totalMarks: Number,
    sections: [SectionSchema],
    generatedAt: String,
  },
  { timestamps: true },
);

export const QuestionPaper = mongoose.model<IQuestionPaper>(
  "QuestionPaper",
  QuestionPaperSchema,
);
