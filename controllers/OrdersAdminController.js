import Order from "../models/OrderAdminModel.js";

// 🔹 Get all orders for Admin
export const GetAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: false })
      .populate("user", "name email") // populate user info
      .populate("products.product", "name product_mrp user_price") // populate product info
      .sort({ createdAt: -1 }); // latest orders first

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    console.error("GetAllOrdersAdmin Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
