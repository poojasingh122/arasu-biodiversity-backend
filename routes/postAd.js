import { Router } from "express";

const router = Router();
import {
  createPostAd,
  getAllPostAd,
  getPostAdById,
  updatePostAd,
  deletePostAd,
} from "../controller/postAd.js";
import { upload } from "../helpers/uploads.js";
import { verifyAdminToken } from "../helpers/token.js";

router.post("/createPost",verifyAdminToken, upload, createPostAd);
router.get("/getAll-post", getAllPostAd);
router.get("/getById-post/:id", getPostAdById);
router.put("/update-post/:id", updatePostAd);
router.delete("/delete-post/:id", deletePostAd);

export default router;
