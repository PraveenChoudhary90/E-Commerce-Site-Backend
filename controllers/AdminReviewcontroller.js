// controllers/AdminReviewController.js
import Product from "../models/AddProductModel.js";

// --- Admin: Get all reviews for all products ---
export const getAllReviewsAdmin = async (req, res) => {
  try {
    // Sab products le lo
    const products = await Product.find({ isDeleted: false }).select("name reviews");

    // Sab reviews ek array me flatten karo, product info ke sath
    const allReviews = [];

    products.forEach(product => {
      product.reviews.forEach(review => {
        allReviews.push({
          productId: product._id,
          productName: product.name,
          reviewId: review._id,
          userId: review.userId,
          username: review.username,
          avatar: review.avatar,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
        });
      });
    });

    res.status(200).json({
      success: true,
      count: allReviews.length,
      reviews: allReviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// --- Admin: Delete a review ---
export const deleteReviewAdmin = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const review = product.reviews.id(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    review.remove();
    await product.save();

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const editReviewAdmin = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const review = product.reviews.id(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await product.save();

    res.status(200).json({ success: true, message: "Review updated successfully", review });
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
