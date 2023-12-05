import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from './modules/routes.js';
import AssignmentRoutes from './assignments/routes.js';
import UserRoutes from "./users/routes.js";
import "dotenv/config";
import session from "express-session";

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Hello(app);
Lab5(app); 
app.listen(process.env.PORT || 4000)