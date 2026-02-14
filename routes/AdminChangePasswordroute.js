

import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/ChangePasswordAdminController.js";

const route  = express.Router();


route.put("/change-password", adminAuth, changePassword);





export default route;
