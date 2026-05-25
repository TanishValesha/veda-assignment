import { Request, Response } from "express";
import { Assignment } from "../models/Assignment";
import { sendError, sendSuccess } from "../utils/response";
import { CreateAssignmentDTO } from "../types";
import { assignmentQueue } from "../queues/assignmentQueue";
import { QuestionPaper } from "../models/QuestionPaper";
import { redisClient } from "../config/redis";

// Create a new assignment + add to queue for processing
export async function createAssignment(req: Request, res: Response) {
  try {
    const dto: CreateAssignmentDTO = req.body;

    // Some basic & important validation
    if (!dto.title || !dto.subject || !dto.gradeLevel || !dto.dueDate) {
      return sendError(res, "Missing required fields", 400);
    }

    if (!dto.questionConfig || dto.questionConfig.length === 0) {
      return sendError(res, "At least one question type required", 400);
    }

    for (const q of dto.questionConfig) {
      if (q.count <= 0 || q.marks <= 0) {
        return sendError(res, "Count and marks must be positive", 400);
      }
    }

    const assignment = await Assignment.create({ ...dto, status: "waiting" });
    const assignmentId = assignment._id.toString();

    const job = await assignmentQueue.add("generate", { assignmentId, dto });
    await Assignment.findByIdAndUpdate(assignmentId, { jobId: job.id });

    return sendSuccess(
      res,
      { assignmentId, jobId: job.id },
      "Assignment created, generation started",
      201,
    );
  } catch (error: any) {
    return sendError(res, error.message);
  }
}

// Get assignment generation status
export async function getAssignmentStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (!assignment) return sendError(res, "Assignment not found", 404);

    return sendSuccess(res, {
      assignmentId: id,
      status: assignment.status,
      jobId: assignment.jobId,
    });
  } catch (err: any) {
    return sendError(res, err.message);
  }
}

// Get generated question paper for an assignment
export async function getQuestionPaper(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const cached = await redisClient.get(`paper:${id}`);
    if (cached) {
      return sendSuccess(res, JSON.parse(cached), "Fetched from cache");
    }

    const paper = await QuestionPaper.findOne({ assignmentId: id });
    if (!paper)
      return sendError(res, "Paper not found or not generated yet", 404);

    await redisClient.setEx(`paper:${id}`, 3600, JSON.stringify(paper));

    return sendSuccess(res, paper, "Paper fetched successfully");
  } catch (err: any) {
    return sendError(res, err.message);
  }
}

// Get all assignments (for listing page)
export async function getAllAssignments(req: Request, res: Response) {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    return sendSuccess(
      res,
      { count: assignments.length, assignments },
      "Assignments fetched successfully",
    );
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
}

// Delete an assignment and its paper
export async function deleteAssignment(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);
    if (!assignment) return sendError(res, "Assignment not found", 404);

    await QuestionPaper.deleteOne({ assignmentId: id });

    await Assignment.findByIdAndDelete(id);

    await redisClient.del(`paper:${id}`);

    return sendSuccess(res, null, "Assignment deleted successfully");
  } catch (err: any) {
    return sendError(res, err.message);
  }
}
