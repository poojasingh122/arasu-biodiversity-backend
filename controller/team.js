import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Teams = db.Team;

export const createTeam = async (req, res) => {
  try {
<<<<<<< Updated upstream
    const { name, designation, role, visibility } = req.body;
    if (!name || !role || !visibility) {
=======
    const { name, designation, role } = req.body;
    if (!name || !designation || !role) {
>>>>>>> Stashed changes
      return res.status(400).json({
        message: "All fields are required",
      });
    }
<<<<<<< Updated upstream
    if (!["founder", "boa"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Role must be either founder or boa" });
=======
    if (!["founder", "bao"].includes(role)) {
      return res
        .status(400)
        .json({ error: "Role must be either founder or bao" });
>>>>>>> Stashed changes
    }

    const images =
      req.files?.images && req.files.images.length
        ? await Promise.all(
            req.files.images.map((file) => imageUploadUtil(file.buffer))
          )
        : [];

    const newTeam = await Teams.create({
      name,
<<<<<<< Updated upstream
      designation: role === "boa" ? designation : null,
      role,
      visibility,
=======
      designation: role === "bao" ? designation : null,
      role,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const  team = await Teams.findAll();

    return res.status(200).json({ data:team  });
=======
    const founder = await Teams.findAll({ where: { role: "founder" } });
    const baos = await Teams.findAll({ where: { role: "bao" } });
    return res.status(200).json({ data: founder, baos });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const { name, designation, role,visibility } = req.body;
=======
    const { name, designation, role } = req.body;
>>>>>>> Stashed changes
    const team = await Teams.findByPk(id);
    if (!team)
      return res.status(404).json({ message: "Team Member not found" });

    let images = team.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

<<<<<<< Updated upstream
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
    team.role = role || team.role;
    team.visibility = visibility || team.visibility;
=======
    if (!["founder", "bao"].includes(role)) {
      return res
        .status(400)
        .json({ error: 'Role must be either "founder" or "bao' });
    }

    if (role === "bao" && !designation) {
      return res
        .status(400)
        .json({ error: "Designation is required for BAO role" });
    }

    team.name = name || team.name;
    team.designation = role === "bao" ? designation : null;
    team.role = role || team.role;
>>>>>>> Stashed changes
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
