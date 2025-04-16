import express from "express";
import dotenv from "dotenv";
import { db } from "./models/index.js";
import { router } from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
// import {createAdmin} from './controller/admin.js'
dotenv.config();

const app = express();
const allowedOrigins = [];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "RefreshToken"],
  exposedHeaders: ["Content-Length", "Content-Type", "RefreshToken", "Token"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.options("*", cors(corsOptions));

app.use("/api", router);

db.sequelize
  .sync({ force: false, alter: true })
  .then(async () => {
    console.log("Database Connected Successfully");
    // await createAdmin();
  })
  .catch((error) => console.error("Database connection failed:", error));

export default app;
