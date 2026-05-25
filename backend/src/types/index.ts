export type QuestionType =
  | "mcq"
  | "short"
  | "long"
  | "diagram"
  | "numerical"
  | "true_false";

export type Difficulty = "easy" | "moderate" | "challenging";

export interface QuestionConfig {
  type: QuestionType;
  count: number;
  marks: number;
}
export interface CreateAssignmentDTO {
  title: string; // "Delhi Public School, Sector-4, Bokaro"
  subject: string; // "Mathematics"
  gradeLevel: string; // "Grade 10"
  dueDate: string;
  questionConfig: QuestionConfig[];
  additionalInstructions?: string; // "Additional instructions for the assignment"
  uploadedFileUrl?: string; // URL of the uploaded file (if any)
}

export interface Question {
  id: string;
  text: string; // actualQuestion: "What is the capital of India?"
  type: QuestionType;
  difficulty: Difficulty;
  marks: number; // marks allocated for this question
  options?: string[]; // for MCQs: ["Delhi", "Mumbai", "Kolkata", "Chennai"]
  answer?: string; //answer: "Delhi" for MCQ, "Delhi" for short answer, detailed explanation for long answer, etc.
}

export interface Section {
  label: string; // "Section A: Multiple Choice Questions"
  title: string; // "Multiple Choice Questions"
  instruction: string; // "Instructions for this section"
  questionType: QuestionType;
  questions: Question[];
  totalMarks: number; // total marks for this section
}

export interface GeneratedPaper {
  assignmentId: string;
  title: string; // "Delhi Public School, Sector-4, Bokaro"
  subject: string; // "Mathematics"
  gradeLevel: string; // "Grade 10"
  dueDate: string;
  timeAllowed: string; // "2 hours"
  totalMarks: number; // total marks for the entire paper
  sections: Section[]; // array of sections in the paper
  pdfUrl?: string; // URL to the generated PDF (optional, can be added after generation)
  generatedAt: string; // timestamp of when the paper was generated
}

export type JobStatus = "waiting" | "active" | "completed" | "failed";

export interface ApiResponse<T = null> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
