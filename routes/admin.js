import { Router } from "express";
import {
  createAdmin,
  getAdminById,
  loginAdmin,
  updateAdmin,
} from "../controller/admin.js";
import { verifyAdminToken } from "../helpers/token.js";

const router = Router();
router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.get("/getById/:id", getAdminById);
router.put("/update", verifyAdminToken, updateAdmin);

export default router;
