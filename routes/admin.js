import { Router } from "express";
import {
  createAdmin,
 
  loginAdmin,
 
  updateAdmin,
  //  loginAdmin
} from "../controller/admin.js";
import { verifyAdminToken } from "../helpers/token.js";

const router = Router();
router.post("/create", createAdmin);
router.post("/login",loginAdmin)

router.put("/update", verifyAdminToken, updateAdmin);

export default router;
