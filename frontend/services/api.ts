import axios from "axios";
import { CreateAssignmentDTO } from "../types/index";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function createAssignment(dto: CreateAssignmentDTO) {
  const res = await api.post("/api/assignments", dto);
  return res.data;
}

export async function getAssignmentStatus(id: string) {
  const res = await api.get(`/api/assignments/${id}/status`);
  return res.data;
}

export async function getQuestionPaper(id: string) {
  const res = await api.get(`/api/assignments/${id}/paper`);
  return res.data;
}

export async function getAllAssignments() {
  const res = await api.get("/api/assignments");
  return res.data;
}
