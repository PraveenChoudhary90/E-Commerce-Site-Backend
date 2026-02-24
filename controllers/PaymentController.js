import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/PaymentModel.js";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==============================
// 1️⃣ CREATE ORDER
// ==============================
export const createOrder = async (req, res) => {
  try {
    const { products, total, address } = req.body;

    // Validate required fields
    if (!products || !total || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    if (!Array.isArray(products)) {
      return res.status(400).json({ success: false, message: "Products must be an array" });
    }

    // Format products
    const formattedProducts = products.map((item) => ({
      id: item.productId || item.id,
      name: item.name,
      brand: item.brand || "",
      qty: item.qty,
      user_price: item.user_price,
      images: item.images || [],
    }));

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100, // amount in paise
      currency: "INR",
      receipt: "order_rcpt_" + Date.now(),
    });

    // Save order in DB
    const newOrder = await Order.create({
      user: req.user._id, // ✅ use authenticated user
      address,
      products: formattedProducts,
      total,
      razorpay_order_id: razorpayOrder.id,
      status: "created",
    });

    return res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: total * 100,
      currency: "INR",
    });
  } catch (error) {
    console.error("🔥 Create Order Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==============================
// 2️⃣ VERIFY PAYMENT
// ==============================
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Find order
    const order = await Order.findOne({ razorpay_order_id, user: req.user._id }); // optional: ensure order belongs to logged-in user
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "paid") {
      return res.status(400).json({ success: false, message: "Payment already verified" });
    }

    // Verify Razorpay signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      order.status = "failed";
      await order.save();
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Payment verified successfully
    order.razorpay_payment_id = razorpay_payment_id;
    order.razorpay_signature = razorpay_signature;
    order.status = "paid";
    await order.save();

    return res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("🔥 Verify Payment Error:", error);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};