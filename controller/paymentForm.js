import { db } from "../models/index.js";
const PaymentForm = db.PaymentForm;

export const createpaymentForm = async (req, res) => {
  try {
    const {fullName,email,billingAddress,street,city,state,zip,country,pan,amount,} = req.body;

    if (!fullName || !email || !billingAddress || !street || !city || !state || !zip || !country || !pan || !amount) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const newpaymentUser = await PaymentForm.create({
      fullName,email,billingAddress,street,city,state,zip,country,pan,amount,
    });
    return res.status(201).json({
      message: "Payment form created successfully",
      data: newpaymentUser,
    });
  } catch (error) {
    console.error("Error to create a paymentUser:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllPaymentUser = async (req, res) => {
  try {
    const paymentUser = await PaymentForm.findAll();
    return res.status(200).json({ data: paymentUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPaymentUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentUser = await PaymentForm.findByPk(id);

    if (!paymentUser) return res.status(400).json({ message: "paymentUser not found" });
    return res.status(200).json(paymentUser);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
