import { create } from "zustand";
import { CreateAssignmentDTO, QuestionConfig } from "../types/index";

interface AssignmentStore {
  form: CreateAssignmentDTO;
  assignmentsCount: number;
  setField: <K extends keyof CreateAssignmentDTO>(
    key: K,
    value: CreateAssignmentDTO[K],
  ) => void;
  addQuestionConfig: () => void;
  removeQuestionConfig: (index: number) => void;
  updateQuestionConfig: (index: number, data: Partial<QuestionConfig>) => void;
  setAssignmentsCount: (count: number) => void;
  reset: () => void;
}

const defaultForm: CreateAssignmentDTO = {
  title: "",
  subject: "",
  gradeLevel: "",
  dueDate: "",
  questionConfig: [
    { type: "mcq", count: 4, marks: 1 },
    { type: "short", count: 3, marks: 2 },
  ],
  additionalInstructions: "",
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  form: defaultForm,
  assignmentsCount: 0,

  setAssignmentsCount: (count: number) =>
    set({
      assignmentsCount: count,
    }),

  setField: (key, value) => set((s) => ({ form: { ...s.form, [key]: value } })),

  addQuestionConfig: () =>
    set((s) => ({
      form: {
        ...s.form,
        questionConfig: [
          ...s.form.questionConfig,
          { type: "mcq", count: 1, marks: 1 },
        ],
      },
    })),

  removeQuestionConfig: (index) =>
    set((s) => ({
      form: {
        ...s.form,
        questionConfig: s.form.questionConfig.filter((_, i) => i !== index),
      },
    })),

  updateQuestionConfig: (index, data) =>
    set((s) => ({
      form: {
        ...s.form,
        questionConfig: s.form.questionConfig.map((q, i) =>
          i === index ? { ...q, ...data } : q,
        ),
      },
    })),

  reset: () => set({ form: defaultForm }),
}));
