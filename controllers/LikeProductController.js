import Product from "../models/AddProductModel.js";

// Toggle like/unlike a product
export const toggleLikeProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id; // assuming auth middleware sets req.user

    const product = await Product.findOne({ productId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const hasLiked = product.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      product.likes = product.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like
      product.likes.push(userId);
    }

    await product.save();

    res.json({
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
    const { productId } = req.params;
    const userId = req.user?._id;

    const product = await Product.findOne({ productId }).lean();
    if (!product) return res.status(404).json({ message: "Product not found" });

    const likedByUser = userId ? product.likes.includes(userId) : false;

    res.json({
      ...product,
      likedByUser,
      totalLikes: product.likes.length,
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

    const products = await Product.find()
      .sort({ "likes.length": -1 }) // sort by number of likes
      .limit(limit)
      .lean();

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};