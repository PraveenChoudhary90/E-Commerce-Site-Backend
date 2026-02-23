
import express from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { addReview, getReviews } from "../controllers/RatingsorCommentController.js";


const route = express.Router();


route.post("/add-rating-review", userAuth, addReview);
route.get("/get-rating-review/:productId",getReviews);


export default route;