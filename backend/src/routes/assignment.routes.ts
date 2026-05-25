import { Router } from "express";
import {
  createAssignment,
  deleteAssignment,
  getAllAssignments,
  getAssignmentStatus,
  getQuestionPaper,
} from "../controllers/assignment.controller";

const router = Router();

router.post("/", createAssignment);
router.get("/", getAllAssignments);
router.delete("/:id", deleteAssignment);
router.get("/:id/status", getAssignmentStatus);
router.get("/:id/paper", getQuestionPaper);

export default router;
