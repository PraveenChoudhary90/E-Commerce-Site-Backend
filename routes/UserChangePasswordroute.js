

import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/UserPasswordChangeController.js";

const route  = express.Router();


route.put("/change-password", userAuth, changePassword);





export default route;
