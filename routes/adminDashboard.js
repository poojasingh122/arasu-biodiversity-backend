import { Router } from "express";
import { getDashboardSummary } from "../controller/adminDashboard.js";

const router = Router();

router.get('/dashboard',getDashboardSummary);

export default router;