import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../controller/team.js";
import { verifyAdminToken } from "../helpers/token.js";

const router = Router();

router.post("/createTeam", verifyAdminToken,createTeam);
router.get("/getAllTeam", getAllTeams);
router.get("/getById/:id", getTeamById);
router.put("/updateTeam/:id", updateTeam);
router.delete("/deleteTeam/:id", deleteTeam);

export default router;
