

import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { addBanner, getBanner, BannerDelete, BannerUpdate } from "../controllers/AddBannerRoute.js";


const route =  express.Router();


route.post("/create-banner",adminAuth,addBanner);
route.get("/get-banners", adminAuth, getBanner);
route.delete("/delete-banner/:id", adminAuth, BannerDelete);
route.put("/update-banner/:id", adminAuth, BannerUpdate);


export default  route;