import express from "express";
import {
  toggleLikeProduct,
  getProductWithLikes,
  getMostLikedProducts,
} from "../controllers/LikeProductController.js"
import { userAuth } from "../middleware/authMiddleware.js";


const route = express.Router();

// Toggle like/unlike
route.post("/like", userAuth, toggleLikeProduct);

// Get product details including likes
route.get("/getlike/:productId/:userId", userAuth, getProductWithLikes);

// Get most liked products for homepage section
route.get("/like/most-liked", getMostLikedProducts);

export default route;