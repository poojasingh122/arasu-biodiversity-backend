import { Router } from "express";
import {createTeam,deleteAll,deleteTeam,getAllTeams,getTeamById,updateTeam,} from "../controller/team.js";
import { verifyAdminToken } from "../helpers/token.js";
import { upload } from "../helpers/uploads.js";

const router = Router();

router.post("/createTeam", verifyAdminToken,upload,createTeam);
router.get("/getAllTeam", getAllTeams);
router.get("/getById/:id", getTeamById);
router.put("/updateTeam/:id",upload, updateTeam);
router.delete("/deleteTeam/:id", deleteTeam);
router.post("/deleteAll",deleteAll)

export default router;
