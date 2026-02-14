
import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { GetAllUserAdmin } from "../controllers/GetAllUserAdminController.js";


const route = express.Router();

route.get("/get-all-user", adminAuth, GetAllUserAdmin);




export default route;
