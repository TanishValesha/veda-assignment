import { Router } from "express";
import { getAllAssignments } from "../controllers/assignment.controller";

const router = Router();

router.get("/", getAllAssignments);

export default router;
