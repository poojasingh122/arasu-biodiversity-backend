import { Router } from "express";

const router = Router();
import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  deleteAll,
} from "../controller/gallery.js";
import { upload } from "../helpers/uploads.js";
import { verifyAdminToken } from "../helpers/token.js";

router.post("/createGallery", verifyAdminToken, upload, createGallery);
router.get("/getAll-gallery", getAllGallery);
router.get("/getById-gallery/:id", getGalleryById);
router.put("/update-gallery/:id",upload, updateGallery);
router.delete("/delete-gallery/:id", deleteGallery);
router.delete("/deleteAll",deleteAll)

export default router;
