import { sendEmail } from "../helpers/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();
import { db } from "../models/index.js";
const Contact = db.ContactUs;

export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });
    await sendEmail({
      to: email,
      subject: "Thank you for contacting us!",
      text: `
        Name: ${firstName} ${lastName}
         Phone: ${phoneNumber}
        Message: ${message}
      `,
    });
    return res.status(201).json({
      message: "Contact Us created Successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Error to create a contactUs:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
