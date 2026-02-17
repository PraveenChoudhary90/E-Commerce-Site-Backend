
import Order from "../models/PaymentModel.js";

export const GetAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

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
