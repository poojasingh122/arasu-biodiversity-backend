import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Teams = db.Team;

export const createTeam = async (req, res) => {
  try {
    const { name, designation,description, role, visibility } = req.body;
    if (!name || !role || !visibility || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!["founder", "boa"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Role must be either founder or boa" });
    }

    const images =
      req.files?.images && req.files.images.length
        ? await Promise.all(
            req.files.images.map((file) => imageUploadUtil(file.buffer))
          )
        : [];

    const newTeam = await Teams.create({
      name,
      designation: role === "boa" ? designation : null,
      description,
      role,
      visibility,
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
    const  team = await Teams.findAll();

    return res.status(200).json({ data:team  });
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
    const { name, designation ,description, role,visibility } = req.body;
    const team = await Teams.findByPk(id);
    if (!team)
      return res.status(404).json({ message: "Team Member not found" });

    let images = team.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

    if (!["founder", "boa"].includes(role)) {
      return res
        .status(400)
        .json({ error: 'Role must be either "founder" or "boa' });
    }

    if (role === "boa" && !designation) {
      return res
        .status(400)
        .json({ error: "Designation is required for boa role" });
    }

    team.name = name || team.name;
    team.designation = role === "boa" ? designation : null;
    team.description = description || team.description;
    team.role = role || team.role;
    team.visibility = visibility;
    if (images) team.images = images;
    await team.save();
    res.status(201).json({
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

export const deleteAll = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No team IDs provided" });
    }

    await Teams.destroy({ where: { id: ids } });

    return res.status(200).json({ message: "Selected team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
