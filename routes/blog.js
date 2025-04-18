import { Router } from "express";
import {
  createBlog,
  deleteAll,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "../controller/blog.js";
import { upload } from "../helpers/uploads.js";
import { verifyAdminToken } from "../helpers/token.js";
const router = Router();

router.post("/createBlog",verifyAdminToken, upload, createBlog);
router.get("/getAll-blog", getAllBlog);
router.get("/getById-blog/:id", getBlogById);
router.put("/updateBlog/:id",upload, updateBlog);
router.delete("/deleteBlog/:id", deleteBlog);
router.post("/deleteAll",deleteAll)

export default router;
