import express from "express";
import { adminLogin } from "../controllers/AdminController.js";

const route = express.Router();

// Only login route for admin
route.post("/login", adminLogin);

export default route;
