import { sequelize } from "../config/db.js";
import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const postAd = db.postAd;

export const createPostAd = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const images =
      req.files?.images && req.files.images.length
        ? await Promise.all(
            req.files.images.map((file) => imageUploadUtil(file.buffer))
          )
        : [];
    const newPost = await postAd.create(
      {
        title,
        description,
        images,
      },
      { transaction }
    );
    await transaction.commit();
    return res
      .status(201)
      .json({ message: "Post created sucessfully", data: newPost });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in createdPostAd:", error);
  } finally {
    console.log("Transaction completed");
  }
};

export const getAllPostAd = async (req, res) => {
  try {
    const post = await postAd.findAll();
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPostAdById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postAd.findByPk(id);
    if (!post) return res.status(400).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePostAd = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const post = await db.postAd.findByPk(id);
    if (!post) return res.status(404).json({ message: "PostAd not found" });

    let images = post.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

    await post.update({
      title,
      description,
      images,
    });
    return res.status(201).json({
      message: "PostAd updated successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error in updatePost", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deletePostAd = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postAd.findByPk(id);
    if (!post) return res.status(400).json({ message: "Post not found" });
    await post.destroy();
    return res.status(200).json({ message: "PostAd deleted sucessfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
