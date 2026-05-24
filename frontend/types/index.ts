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

export interface CreateAssignmentDTO {
  title: string;
  subject: string;
  gradeLevel: string;
  dueDate: string;
  questionConfig: QuestionConfig[];
  additionalInstructions?: string;
  uploadedFileUrl?: string;
}
