import express from "express";
import { adminAuth } from "../middleware/authMiddleware.js";
import { getAllReviewsAdmin, deleteReviewAdmin, editReviewAdmin } from "../controllers/AdminReviewcontroller.js";

const route = express.Router();

// Get all reviews for admin
route.get("/reviews",adminAuth, getAllReviewsAdmin);

// Delete a review
route.delete("/reviews/:productId/:reviewId",adminAuth, deleteReviewAdmin);

// Edit a review
route.put("/reviews/:productId/:reviewId", adminAuth, editReviewAdmin);

export default route;
