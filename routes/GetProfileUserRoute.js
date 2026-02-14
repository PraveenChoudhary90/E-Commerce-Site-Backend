

import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { GetUserProfile, updateProfile } from "../controllers/GetUserProfileController.js";


const route = express.Router();

route.get("/get-profile",userAuth, GetUserProfile);
route.put("/update-profile/:id", userAuth, updateProfile);



export default route;