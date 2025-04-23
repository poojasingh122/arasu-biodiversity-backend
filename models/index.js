import { sequelize } from "../config/db.js";
import AdminModel from "./admin.js";
import PostAdModel from "./postAd.js";
import EventModel from "./events.js";
import BlogModel from "./blog.js";
import TeamModel from "./team.js";
import GalleryModel from "./gallery.js";
import ContactUsModel from "./contactUs.js";
import PaymentFormModel from "./paymentForm.js";
import UserModel from './user.js'

const db = {};

db.sequelize = sequelize;
db.Admin = AdminModel(sequelize);
db.postAd = PostAdModel(sequelize);
db.Events = EventModel(sequelize);
db.Blog = BlogModel(sequelize);
db.Team = TeamModel(sequelize);
db.Gallery = GalleryModel(sequelize);
db.ContactUs = ContactUsModel(sequelize);
db.PaymentForm = PaymentFormModel(sequelize);
db.User= UserModel(sequelize)

// Object.keys(models).forEach((modelName) => {
//     if (models[modelName].associate) {
//       models[modelName].associate(models);
//     }
//   });

export { db };
