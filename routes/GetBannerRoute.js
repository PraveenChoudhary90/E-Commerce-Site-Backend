
import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { GetBannerUser } from "../controllers/GetBannerUserController.js";


const route = express.Router();


route.get("/get-banners",userAuth,GetBannerUser);





export default route;