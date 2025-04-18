import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Gallery = db.Gallery;

export const createGallery = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const images =
    req.files?.images && req.files.images.length
      ? await Promise.all(
          req.files.images.map((file) => imageUploadUtil(file.buffer))
        )
      : [];
  const gallery = await Gallery.create({
    title,
    images,
  });
  return res.status(200).json({
    message: "Gallery created succesfully",
    data: gallery,
  });
};

export const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findAll();
    return res.status(200).json({ data: gallery });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByPk(id);
    if (!gallery) return res.status(400).json({ message: "Gallery not found" });
    res.status(200).json(gallery);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title,visibility} = req.body;
    const gallery = await Gallery.findByPk(id);
    if (!gallery) return res.status(404).json({ message: "Gallery not found" });

    let images = gallery.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

    await gallery.update({
      title,
      visibility,
      images,
    });
    return res.status(201).json({
      message: "Gallery Updated Successfully",
      data: gallery,
    });
  } catch (error) {
    console.error("Error in updateGallery", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByPk(id);
    if (!gallery) return res.status(400).json({ message: "Gallery not found" });
    await gallery.destroy();
    return res.status(200).json({
      message: "Gallery deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
