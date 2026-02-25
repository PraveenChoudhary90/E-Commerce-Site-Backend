import express from "express";
import { getAllFeedbacksAdmin, deleteFeedback, updateFeedback } from "../controllers/AdminGetFeedbackController.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

// Admin - Get all feedback
route.get("/feedback", adminAuth, getAllFeedbacksAdmin);

// Admin - Delete feedback
route.delete("/feedback/:id",adminAuth, deleteFeedback);

// Admin - Update feedback
route.put("/feedback/:id",adminAuth, updateFeedback);

export default route;