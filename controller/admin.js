import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Admin = db.Admin;
// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET;

export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminCount = await Admin.count();
    if (adminCount >= 1) {
      return res
        .status(403)
        .json({ message: "Admin already created. Only one allowed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Admin created and logged in successfully",
      admin: { id: newAdmin.id, email: newAdmin.email },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: existingAdmin.id, email: existingAdmin.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: existingAdmin.id,
        email: existingAdmin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminId = req.admin.id;

    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (email) {
      const existingEmail = await Admin.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== adminId) {
        return res.status(400).json({ message: "Email already in use" });
      }
      admin.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    return res.status(200).json({
      message: "Admin updated successfully",
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(400).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
