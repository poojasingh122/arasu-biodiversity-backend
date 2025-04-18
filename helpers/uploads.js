/* eslint-disable no-undef */

import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

// Multer configuration
const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/mov",
      "video/avi",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images,videos are allowed"), false);
    }

    cb(null, true);
  },
}).fields([
  { name: "images", maxCount: 10 },
  { name: "video", maxCount: 1 },
]);

// upload images to Cloudinary
async function imageUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    const base64String = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      base64String,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
        }
      }
    );
  });
}

// Function to upload videos to Cloudinary
async function videoUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    const base64String = `data:video/mp4;base64,${buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      base64String,
      { resource_type: "video" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url); // Return video URL
        }
      }
    );
  });
}

export { upload, imageUploadUtil, videoUploadUtil };
