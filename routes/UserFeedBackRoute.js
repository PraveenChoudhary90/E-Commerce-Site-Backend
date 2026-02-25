import express from "express";
import { createFeedback, getAllFeedbacks } from "../controllers/UserFeedBackController.js";
import { userAuth } from "../middleware/authMiddleware.js";

const route = express.Router();

// POST feedback
route.post("/feedback", userAuth,createFeedback);

// GET all feedback
route.get("/feedback",userAuth, getAllFeedbacks);

export default route;