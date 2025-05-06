import { sequelize } from "../config/db.js";
import AdminModel from "./admin.js";
import PostAdModel from "./postAd.js";
import EventModel from "./events.js";
import BlogModel from './blog.js';
import TeamModel from './team.js';
import GalleryModel from './gallery.js';
import ContactUsModel from './contactUs.js';
import UserTrackModel from './user.js'
import paymentFormModel from "./paymentForm.js";

const db = {};

db.sequelize = sequelize;
db.Admin = AdminModel(sequelize);
db.postAd = PostAdModel(sequelize);
db.Events = EventModel(sequelize);
db.Blog = BlogModel(sequelize);
db.Team = TeamModel(sequelize);
db.Gallery = GalleryModel(sequelize);
db.ContactUs = ContactUsModel(sequelize)
db.UserTrack= UserTrackModel(sequelize)
db.paymentForm = paymentFormModel(sequelize)

// Object.keys(models).forEach((modelName) => {
//     if (models[modelName].associate) {
//       models[modelName].associate(models);
//     }
//   });

export { db };
