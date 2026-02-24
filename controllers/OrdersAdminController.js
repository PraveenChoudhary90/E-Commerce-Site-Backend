import Order from "../models/PaymentModel.js";

export const GetAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email number");

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders.map(order => ({
        id: order._id,
        invoiceNumber: order.invoiceNumber,
        user: order.user,
        address: order.address,
        products: order.products,
        total: order.total,
        status: order.status,
        razorpay_order_id: order.razorpay_order_id,
        razorpay_payment_id: order.razorpay_payment_id,
        razorpay_signature: order.razorpay_signature,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
    });
  } catch (err) {
    console.error("GetAllOrdersAdmin Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};