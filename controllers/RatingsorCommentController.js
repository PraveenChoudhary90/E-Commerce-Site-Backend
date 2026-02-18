import Product from "../models/AddProductModel.js";

// Add a review to a product
export const addReview = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Login required" });

    const { rating, comment, avatar } = req.body;
    const { id } = req.params; // product id

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      r => r.userId.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: "You already reviewed this product" });
    }

    const review = {
      userId: req.user._id,
      username: req.user.name,
      rating,
      comment,
      avatar, // optional user image URL
    };

    product.reviews.push(review);
    await product.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all reviews for a product
export const getReviews = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const product = await Product.findById(id).select("reviews");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
