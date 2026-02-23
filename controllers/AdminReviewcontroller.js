import Product from "../models/AddProductModel.js";

/* ======================================================
   ADMIN: Get All Reviews (Flattened)
====================================================== */
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .select("name reviews");

    const allReviews = [];

    products.forEach((product) => {
      product.reviews.forEach((review) => {
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

/* ======================================================
   ADMIN: Delete Review
====================================================== */
export const deleteReviewAdmin = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const review = product.reviews.id(reviewId);
    if (!review)
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    // Remove review
    product.reviews.pull(reviewId);

    // Recalculate average rating
    const totalReviews = product.reviews.length;
    product.averageRating =
      totalReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => acc + item.rating, 0) /
          totalReviews;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting review",
    });
  }
};

/* ======================================================
   ADMIN: Edit Review
====================================================== */
export const editReviewAdmin = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    const review = product.reviews.id(reviewId);
    if (!review)
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });

    // Validate rating
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    // Recalculate average rating
    const totalReviews = product.reviews.length;
    product.averageRating =
      totalReviews === 0
        ? 0
        : product.reviews.reduce((acc, item) => acc + item.rating, 0) /
          totalReviews;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating review",
    });
  }
};