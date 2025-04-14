import { Router } from "express";

const router = Router();
import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controller/gallery.js";
import { upload } from "../helpers/uploads.js";
import { verifyAdminToken } from "../helpers/token.js";

router.post("/createPost", verifyAdminToken,upload, createGallery);
router.get("/getAll-post", getAllGallery);
router.get("/getById-post/:id", getGalleryById);
router.put("/update-post/:id", updateGallery);
router.delete("/delete-post/:id", deleteGallery);

export default router;
