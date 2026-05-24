import { Router } from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentStatus,
  getQuestionPaper,
} from "../controllers/assignment.controller";

const router = Router();

router.post("/", createAssignment);
router.get("/", getAllAssignments);
router.get("/:id/status", getAssignmentStatus);
router.get("/:id/paper", getQuestionPaper);

export default router;
