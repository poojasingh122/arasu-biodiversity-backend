import { Router } from "express";
import {
  createOrLoginAdmin,
  updateAdmin,
  //  loginAdmin
} from "../controller/admin.js";
import { verifyAdminToken } from "../helpers/token.js";

const router = Router();
router.post("/create", createOrLoginAdmin);

router.put("/update", verifyAdminToken, updateAdmin);

export default router;
