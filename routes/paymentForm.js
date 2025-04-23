import { Router } from "express";
import { createpaymentForm,getAllPaymentUser, getPaymentUserById } from "../controller/paymentForm.js";

const router = Router();
router.post("/createpaymentUser", createpaymentForm);
router.get("/getAll-payment-user", getAllPaymentUser);
router.get("/getById/:id", getPaymentUserById);

export default router;
