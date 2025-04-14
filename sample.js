import createError from "http-errors";
import db from "@/database";
import sequelize from "@/database";
import { imageUploadUtil, videoUploadUtil } from "../helpers/upload.js";

/**
 * Create a new post ad
 * POST /ads
 */
export const createPostAd = async (req, res, next) => {
  
  const transaction = await sequelize.transaction();
  try {
    const { category, subcategory, title,description,price,street, city, state, postalCode, country} = req.body;
    const userId = req.user?.id; // Ensure userId is extracted correctly
console.log("userId--------",userId);

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    // Upload images safely
    const images = req.files?.images && req.files.images.length ? await Promise.all(req.files.images.map((file) => imageUploadUtil(file.buffer))) : [];

    const video = req.files?.video && req.files.video.length ? await Promise.all(req.files.video.map((file) => videoUploadUtil(file.buffer))) :[];
    // Ensure the model exists
    if (!db.models.post_ad) {
      throw new Error("postAd model not found in Sequelize");
    }

    // Create a new ad inside the transaction
    const newPost = await db.models.post_ad.create(
      {
        category,
        subcategory,
        title,
        price,
        description,
        images, // Cloudinary image URLs
        video,
        street, city, state, postalCode, country,
        userId,

      },
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json({ message: "Post created successfully", data: newPost });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in createPostAd:", error);
    return next(createError(500, error.message));
  } finally {
    console.log("Transaction completed");
  }
};

/**
 * Get all post ads
 * GET /ads
 */
export const getAllPostAds = async (req, res, next) => {
  try {
    const ads = await db.models.post_ad.findAll();
    return res.status(200).json({ data: ads });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * Get a single post ad by ID
 * GET /ads/:id
 */
export const getPostAdById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await db.models.post_ad.findByPk(id);

    if (!post) return next(createError(404, "Post not found"));

    return res.status(200).json({ data: post });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * Delete a post ad
 * DELETE /ads/:id
 */
export const deletePostAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await db.models.post_ad.findByPk(id);

    if (!post) return next(createError(404, "Post not found"));

    await post.destroy();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

/**
 * Update a post ad
 * PUT /ads/:id
 */
export const updatePostAd = async (req, res, next) => {
  console.log("updatePostAd");
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { category, subcategory, title, subtitle, price, description , street, city, state, postalCode, country,} = req.body;

    // Find the existing post
    const post = await db.models.post_ad.findByPk(id);
    if (!post) return next(createError(404, "Post not found"));

    // Upload new images if provided
    let images = post.images;
    if (req.files?.length) {
      images = await Promise.all(req.files.map((file) => imageUploadUtil(file.buffer)));
    }
let video = post.video;
    if(req.files?.length){
      video = await Promise.all(req.files.map((file) => videoUploadUtil(file.buffer)))
    }
    // Update the post with new data
    await post.update(
      {
        category,
        subcategory,
        title,
        subtitle,
        price,
        description,
        images, // Updated images in Cloudinary
        video,
        street, city, state, postalCode, country,
       
      },
      { transaction }
    );

    await transaction.commit();
    return res.status(200).json({ message: "Post updated successfully", data: post });
  } catch (error) {
    await transaction.rollback();
    console.error("Error in updatePostAd:", error);
    return next(createError(500, error.message));
  } finally {
    console.log("Transaction completed");
  }
};
