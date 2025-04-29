import { db } from "../models/index.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const totalBlogs = await db.Blog.count();
    const totalGallery = await db.Gallery.count();
    const totalProjects = await db.postAd.count();
    const totalEvents = await db.Events.count();
    const totalTeam = await db.Team.count();

    const totalContent = totalBlogs + totalGallery + totalProjects + totalEvents + totalTeam;

    const toPercent = (count) => `${((count / totalContent) * 100).toFixed(0)}%`;

    res.json({
      totalContent,
      totalBlogs,
      totalGallery,
      totalProjects,
      totalEvents,
      totalTeam,
      distributionPercentage: {
        blogs: toPercent(totalBlogs),
        gallery: toPercent(totalGallery),
        projects: toPercent(totalProjects),
        events: toPercent(totalEvents),
        team: toPercent(totalTeam)
      }
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
