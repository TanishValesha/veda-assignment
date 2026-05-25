export type QuestionType =
  | "mcq"
  | "short"
  | "long"
  | "diagram"
  | "numerical"
  | "true_false";

export interface QuestionConfig {
  type: QuestionType;
  count: number;
  marks: number;
}

export type Difficulty = "easy" | "moderate" | "challenging";

export interface CreateAssignmentDTO {
  title: string;
  subject: string;
  gradeLevel: string;
  dueDate: string;
  questionConfig: QuestionConfig[];
  additionalInstructions?: string;
  uploadedFileUrl?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  options?: string[];
  answer?: string;
}

export interface Section {
  label: string;
  title: string;
  instruction: string;
  questionType: QuestionType;
  questions: Question[];
  totalMarks: number;
}

export interface GeneratedPaper {
  assignmentId: string;
  title: string;
  subject: string;
  gradeLevel: string;
  dueDate: string;
  timeAllowed: string;
  totalMarks: number;
  sections: Section[];
  generatedAt: string;
  pdfUrl?: string;
}
