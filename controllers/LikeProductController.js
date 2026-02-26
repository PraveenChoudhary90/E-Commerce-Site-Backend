import Product from "../models/AddProductModel.js";
import mongoose from "mongoose";

// Toggle like/unlike a product
export const toggleLikeProduct = async (req, res) => {
  try {
    // Nested object se data nikalna
    const userIdFromBody = req.body.userId.userId;
    const productId = req.body.userId.ProductId;

    if (!mongoose.Types.ObjectId.isValid(userIdFromBody) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid userId or productId" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const hasLiked = product.likes.some(id => id.toString() === userIdFromBody.toString());

    if (hasLiked) {
      // Unlike
      product.likes = product.likes.filter(id => id.toString() !== userIdFromBody.toString());
    } else {
      // Like
      product.likes.push(userIdFromBody);
    }

    await product.save();

    res.json({
      success: true,
      liked: !hasLiked,
      totalLikes: product.likes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product details including like info
export const getProductWithLikes = async (req, res) => {
  try {
    const { productId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Make sure likes is an array
    const likesArray = Array.isArray(product.likes) ? product.likes : [];

    const likedByUser = userId
      ? likesArray.some(id => id.toString() === userId.toString())
      : false;

    res.json({
      ...product,
      likedByUser,
      totalLikes: likesArray.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get most liked products for homepage sections
export const getMostLikedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const products = await Product.aggregate([
      {
        $addFields: { totalLikes: { $size: "$likes" } }
      },
      { $sort: { totalLikes: -1 } },
      { $limit: limit }
    ]);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};