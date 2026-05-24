import { Request, Response } from "express";
import { Assignment } from "../models/Assignment";
import { sendError, sendSuccess } from "../utils/response";

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
