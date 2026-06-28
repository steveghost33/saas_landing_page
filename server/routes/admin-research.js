import express from "express";
import { getResearchForm, submitResearch, skipResearch } from "../controllers/researchController.js";

const router = express.Router();

// GET /api/admin/research-form - Fetch lead data or list pending leads
router.get("/research-form", getResearchForm);

// POST /api/admin/research-submit - Submit research findings
router.post("/research-submit", submitResearch);

// POST /api/admin/research-skip - Skip a lead
router.post("/research-skip", skipResearch);

export default router;
