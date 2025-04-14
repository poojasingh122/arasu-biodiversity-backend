import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Teams = db.Team;

export const createTeam = async (req, res) => {
  try {
    const { name, designation, member } = req.body;
    if (!name || !designation || !member) {
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

    const newTeam = await Teams.create({
      name,
      designation,
      member,
      images,
    });
    return res.status(201).json({
      message: "Team member created successfully",
      data: newTeam,
    });
  } catch (error) {
    console.error("Error create a team member:", error);
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const team = await Teams.findAll();
    return res.status(200).json({ data: team });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Teams.findByPk(id);
    if (!team)
      return res.status(400).json({ message: "Team member not found" });
    res.status(201).json(team);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, member } = req.body;
    const team = await Teams.findByPk(id);
    if (!team)
      return res.status(404).json({ message: "Team Member not found" });

    let images = team.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

    await team.update({
      name,
      designation,
      member,
      images,
    });
    return res.status(201).json({
      message: "Team Member updated successfully",
      data: team,
    });
  } catch (error) {
    console.error("Error in updateTeam Member", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Teams.findByPk(id);
    if (!team)
      return res.status(400).json({ message: "Team member not found" });
    await team.destroy();
    return res.status(200).json({ message: "Team Member deleted sucessfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
