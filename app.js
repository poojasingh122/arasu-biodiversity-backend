import express from "express";
import dotenv from "dotenv";
import { db } from "./models/index.js";
import { router } from "./routes/index.js";
import bodyParser from 'body-parser';
// import {createAdmin} from './controller/admin.js'
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

db.sequelize
  .sync({ force: false, alter: true })
.then(async () =>{
  console.log("Database Connected Successfully");
  // await createAdmin();
  
})
  .catch((error) => console.error("Database connection failed:", error));

export default app;
