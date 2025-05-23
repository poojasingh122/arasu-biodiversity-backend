import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Blog = db.Blog;

export const createBlog = async (req, res) => {
  try {
    const { title, content, date, readTime, author, blogCategory,visibility } = req.body;
    if (!title || !content || !author || !date || !readTime || !visibility) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    let imageUrls = [];
    const images = req.files?.images;

    if (images && images.length > 0) {
      imageUrls = await Promise.all(
        images.map((image) => imageUploadUtil(image.buffer))
      );
    }

    const newBlog = await Blog.create({
      title,
      content,
      date,
      readTime,
      author,
      blogCategory,
      images: imageUrls,
      visibility,
    });
    return res.status(201).json({
      message: "Blog Created Successfully",
      data: newBlog,
    });
  } catch (error) {
    console.error("Error create a blog:", error);
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.findAll();
    return res.status(200).json({ data: blog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(400).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date, readTime, author, blogCategory,visibility } = req.body;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let images = blog.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }
    await blog.update({
      title,
      content,
      date,
      readTime,
      author,
      images,
      blogCategory,
      visibility
    });
    res.status(201).json({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error("Error in updateEvnt", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(400).json({ message: "Blog not found" });
    await blog.destroy();
    return res.status(201).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No blog IDs provided" });
    }

    await Blog.destroy({ where: { id: ids } });

    return res.status(200).json({ message: "Selected blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
