import { Router } from "express";
import { createContact } from "../controller/contactUs.js";

const router = Router();

router.post("/createContact", createContact);

export default router;
