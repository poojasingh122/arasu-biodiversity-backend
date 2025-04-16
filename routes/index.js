import express from "express";

const router = express.Router();
import adminRoutes from "./admin.js";
import postAdRoutes from "./postAd.js";
import eventsRoutes from "./events.js";
import blogRoutes from "./blog.js";
import teamRoutes from "./team.js";
import galleryRoutes from "./gallery.js";
import otpRoutes from "./otp.js";
import contactUsRoutes from "./contactUs.js";

router.use("/", adminRoutes);
router.use("/post", postAdRoutes);
router.use("/events", eventsRoutes);
router.use("/blog", blogRoutes);
router.use("/team", teamRoutes);
router.use("/gallery", galleryRoutes);
router.use("/otp", otpRoutes);
router.use("/contact", contactUsRoutes);

export { router };
