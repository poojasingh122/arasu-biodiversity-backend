/* eslint-disable no-undef */

import { db } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Admin = db.Admin;
const JWT_SECRET = process.env.JWT_SECRET;

export const createOrLoginAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ where: { email } });

    if (existingAdmin) {
      const isMatch = await bcrypt.compare(password, existingAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: existingAdmin.id, email: existingAdmin.email },
        JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        admin: {
          id: existingAdmin.id,
          name: existingAdmin.name,
          email: existingAdmin.email,
        },
      });
    }

    const adminCount = await Admin.count();
    if (adminCount >= 1) {
      return res
        .status(403)
        .json({ message: "Admin already created. Only one allowed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "Admin created and logged in successfully",
      token,
      admin: { id: newAdmin.id, name: newAdmin.name, email: newAdmin.email },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// PUT /admin/update - Update admin email and/or password
export const updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminId = req.user.id; // from verifyToken

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

    return res.status(200).json({ message: "Admin updated successfully", admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email
    }});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
