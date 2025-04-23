import { Router } from "express";
import {createEvent,deleteAll,deleteEvent,getAllEvents,getEventsById,updateEvnets } from "../controller/events.js";
import { upload } from "../helpers/uploads.js";
import { verifyAdminToken } from "../helpers/token.js";

const router = Router();

router.post("/createEvent", verifyAdminToken,upload, createEvent);
router.get("/getAll-events", getAllEvents);
router.get("/getById/:id", getEventsById);
router.put("/updateEvent/:id",upload, updateEvnets);
router.delete("/deleteEvent/:id", deleteEvent);
router.post("/deleteAll",deleteAll)

export default router;
