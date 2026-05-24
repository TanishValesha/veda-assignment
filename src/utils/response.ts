import { Response } from "express";
import { ApiResponse } from "../types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "success",
  statusCode = 200,
) {
  const response: ApiResponse<T> = { success: true, message, data };
  return res.status(statusCode).json(response);
}

export function sendError(res: Response, error: string, statusCode = 500) {
  const response: ApiResponse = { success: false, error };
  return res.status(statusCode).json(response);
}
