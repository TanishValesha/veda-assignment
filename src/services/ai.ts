import Groq from "groq-sdk";
import { ENV } from "../config/env";
import { v4 as uuidv4 } from "uuid";
import {
  CreateAssignmentDTO,
  GeneratedPaper,
  Question,
  QuestionType,
  Section,
} from "../types";

const groq = new Groq({ apiKey: ENV.GROQ_API_KEY });

const SECTION_META: Record<
  QuestionType,
  { title: string; instruction: string }
> = {
  mcq: {
    title: "Multiple Choice Questions",
    instruction: "Choose the correct option for each question.",
  },
  short: {
    title: "Short Answer Questions",
    instruction: "Attempt all questions. Answer in 2-3 sentences.",
  },
  long: {
    title: "Long Answer Questions",
    instruction: "Attempt all questions. Answer in detail.",
  },
  diagram: {
    title: "Diagram / Graph Based Questions",
    instruction: "Draw and label diagrams wherever necessary.",
  },
  numerical: {
    title: "Numerical Problems",
    instruction: "Show all steps and calculations clearly.",
  },
  true_false: {
    title: "True or False",
    instruction: "Write True or False for each statement.",
  },
};

const SECTION_LABELS = ["A", "B", "C", "D", "E", "F"];

function buildPrompt(dto: CreateAssignmentDTO): string {
  const sectionBreakdown = dto.questionConfig
    .map(
      (q, i) =>
        `Section ${SECTION_LABELS[i]}: ${q.count} ${q.type} question(s), ${q.marks} mark(s) each`,
    )
    .join("\n");

  return `You are an expert teacher. Generate a structured question paper strictly as JSON.

Assignment Info:
- Title: ${dto.title}
- Subject: ${dto.subject}
- Grade: ${dto.gradeLevel}
- Due Date: ${dto.dueDate}
${dto.additionalInstructions ? `- Extra Instructions: ${dto.additionalInstructions}` : ""}

Sections to generate:
${sectionBreakdown}

Rules:
- difficulty must be one of: "easy", "moderate", "challenging"
- For mcq, include an "options" array with 4 items
- Do NOT include any explanation or markdown, only raw JSON

Respond with this exact JSON structure:
{
  "timeAllowed": "45 minutes",
  "sections": [
    {
      "type": "mcq",
      "questions": [
        {
          "text": "Question text here",
          "difficulty": "easy",
          "options": ["A", "B", "C", "D"],
          "answer": "A"
        }
      ]
    }
  ]
}`;
}

function parseResponse(
  raw: string,
  dto: CreateAssignmentDTO,
  assignmentId: string,
): GeneratedPaper {
  // strip markdown fences if model adds them
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  let totalMarks = 0;

  const sections: Section[] = parsed.sections.map((s: any, index: number) => {
    const config = dto.questionConfig[index];
    const meta = SECTION_META[config.type as QuestionType];

    const questions: Question[] = s.questions.map((q: any) => ({
      id: uuidv4(),
      text: q.text,
      type: config.type,
      difficulty: q.difficulty,
      marks: config.marks,
      options: q.options || [],
      answer: q.answer || "",
    }));

    const sectionTotal = questions.length * config.marks;
    totalMarks += sectionTotal;

    return {
      label: `Section ${SECTION_LABELS[index]}`,
      title: meta.title,
      instruction: meta.instruction,
      questionType: config.type,
      questions,
      totalMarks: sectionTotal,
    } as Section;
  });

  return {
    assignmentId,
    title: dto.title,
    subject: dto.subject,
    gradeLevel: dto.gradeLevel,
    dueDate: dto.dueDate,
    timeAllowed: parsed.timeAllowed || "45 minutes",
    totalMarks,
    sections,
    generatedAt: new Date().toISOString(),
  };
}

export async function generateQuestionPaper(
  dto: CreateAssignmentDTO,
  assignmentId: string,
): Promise<GeneratedPaper> {
  const prompt = buildPrompt(dto);

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 4096,
  });

  const raw = response.choices[0]?.message?.content || "";
  return parseResponse(raw, dto, assignmentId);
}
