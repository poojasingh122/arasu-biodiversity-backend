import { db } from "../models/index.js";
const UserTrack = db.UserTrack;

export const createUserTrack = async (req, res) => {
  try {
    const {ip,name,city,region,country,postal,latitude,longitude,timeZone,} = req.body;
    if ( !ip|| !name|| !city|| !region|| !country|| !postal|| !latitude|| !longitude|| !timeZone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newUserTrack = await UserTrack.create({
        ip,name,city,region,country,postal,latitude,longitude,timeZone,

     });
     const existingTrack = await UserTrack.findOne({ where: { ip } });
     if (existingTrack) {
       return res.status(200).json({ message: "IP already tracked", data: existingTrack });
     }
     
    return res.status(201).json({
      message: " create UserTrack successfully",
      data: newUserTrack,
    });
  } catch (error) {
    console.error("Error to create a userTrack:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUserTrack = async (req, res) => {
  try {
    const userTrack = await UserTrack.findAll();
    return res.status(200).json({ data: userTrack });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteUserTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const userTrack = await UserTrack.findByPk(id);
    if (!userTrack)
      return res.status(400).json({ message: "userTrack not found" });
    await userTrack.destroy();
    return res.status(200).json({
      message: "userTrack deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No userTrack IDs provided" });
    }

    await UserTrack.destroy({ where: { id: ids } });

    return res.status(200).json({ message: "Selected UserTrack deleted successfully" });
  } catch (error) {
    console.error("Error deleting UserTrack:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
