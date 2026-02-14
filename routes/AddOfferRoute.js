import express from "express";
import {
  createCoupon,
  createSpecialOffer,
  deleteCoupon,
  deleteSpecialOffer,
  getAllCoupons,
  getAllSpecialOffers,
  updateCoupon,
  updateSpecialOffer,
} from "../controllers/AddOfferController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

// Create a reward
route.post("/create-coupon", adminAuth,createCoupon);
route.post("/create-reward", adminAuth,createSpecialOffer);

// Get all rewards (optional type filter)
route.get("/get-coupons",adminAuth,getAllCoupons);
route.get("/get-reward-list",adminAuth,getAllSpecialOffers);

// Get single reward by ID
// route.get("/:id", getRewardById);

// Update reward
route.put("/update-coupon/:id", adminAuth,updateCoupon);
route.put("/update-reward/:id", adminAuth,updateSpecialOffer);

// Delete reward
route.delete("/delete-coupon/:id",adminAuth,deleteCoupon);
route.delete("/delete-reward/:id",adminAuth,deleteSpecialOffer);

export default route;
