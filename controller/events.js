import { imageUploadUtil } from "../helpers/uploads.js";
import { db } from "../models/index.js";
const Events = db.Events;

export const createEvent = async (req, res) => {
  try {
    const { title, description, location, eventDate, eventTime,visibility} = req.body;

    if (!title || !description || !location || !eventDate || !eventTime || !visibility) {
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

    // create a new event
    const newEvents = await Events.create({
      title,
      description,
      location,
      eventDate,
      eventTime,
      images,
      visibility
    });
    return res
      .status(201)
      .json({ message: "Event created successfully", data: newEvents });
  } catch (error) {
    console.error("Error create an event:", error);
  }
};

// GetAll Events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.findAll();
    return res.status(200).json({ data: events });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GetEvents BY ID
export const getEventsById = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Events.findByPk(id);

    if (!events) return res.status(400).json({ message: "Event not found" });
    res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEvnets = async (req, res) => {
  try {
    const { id } = req.params;
    const { occassion, title, description, location, eventDate, eventTime } =
      req.body;
    const event = await Events.findByPk(id);
    if (!event) return res.status(404).json({ message: "Event are not found" });

    let images = event.images;
    if (req.files?.length) {
      images = await Promise.all(
        req.files.map((file) => imageUploadUtil(file.buffer))
      );
    }

    await event.update({
      occassion,
      title,
      description,
      location,
      eventDate,
      eventTime,
      images,
    });
    return res.status(201).json({
      message: "Event Updated Successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error in updateEvnt", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Events.findByPk(id);
    if (!event) return res.status(400).json({ message: "Event not found" });
    await event.destroy();
    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
