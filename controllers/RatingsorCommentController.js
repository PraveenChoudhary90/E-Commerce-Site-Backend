import Product from "../models/AddProductModel.js";
import mongoose from "mongoose";

// ========================
// Add a review to a product using MongoDB _id
// userId is optional
// ========================
export const addReview = async (req, res) => {
  try {
    // Frontend payload: { productId, userName, rating, comment, avatar?, userId? }
    const { productId, userName, rating, comment, avatar, userId } = req.body;

    // Validate required fields
    if (!productId || !userName || !rating) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    // Find product by _id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if user already reviewed (using userId if available, else username)
    const alreadyReviewed = product.reviews.find(r =>
      userId ? r.userId?.toString() === userId.toString() : r.username === userName
    );
    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: "You already reviewed this product" });
    }

    // Create review object
    const review = {
      userId: userId || null,   // optional
      username: userName,
      rating,
      comment,
      avatar: avatar || ""      // optional
    };

    // Push review and save
    product.reviews.push(review);
    await product.save();
    res.status(201).json({ success: true, review });

  } catch (error) {
    console.error("Error in addReview:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ========================
// Get all reviews for a product using _id
// ========================
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await Product.findById(productId).select("reviews");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error("Error in getReviews:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};