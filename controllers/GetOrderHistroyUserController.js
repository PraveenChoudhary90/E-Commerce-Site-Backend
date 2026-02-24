import Orders from "../models/PaymentModel.js";

// GET orders for logged-in user
export const getOrderHistoryUser = async (req, res) => {
  try {
    // Get authenticated user's ID from middleware
    const userId = req.user._id;

    // Fetch orders for this user, include all details
    const orders = await Orders.find({ user: userId })
      .sort({ createdAt: -1 }) // latest orders first
      .populate("user", "name email number"); // populate user info (optional)

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: "No orders found for this user", orders: [] });
    }

    // Return full details
    res.status(200).json({
      msg: "Orders fetched successfully",
      orders: orders.map(order => ({
        id: order._id,
        invoiceNumber: order.invoiceNumber,
        address: order.address,
        products: order.products,
        total: order.total,
        status: order.status,
        razorpay_order_id: order.razorpay_order_id,
        razorpay_payment_id: order.razorpay_payment_id,
        razorpay_signature: order.razorpay_signature,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        user: order.user, // populated name, email, contact
      })),
    });

  } catch (error) {
    console.error("🔥 Get Order History Error:", error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};