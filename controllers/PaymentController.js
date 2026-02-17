import Razorpay from "razorpay"
import crypto  from"crypto"
import Order from "../models/PaymentModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ==============================
// 1️⃣ CREATE ORDER
// ==============================
export const createOrder = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);  // 👈 ADD THIS

    const { user, products, total } = req.body;

    if (!user || !products || !total) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Products must be array",
      });
    }

    const formattedProducts = products.map((item) => ({
      id: item.productId || item.id,
      name: item.name,
      brand: item.brand || "",
      qty: item.qty,
      user_price: item.user_price,
      images: item.images || [],
    }));

    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: "INR",
      receipt: "order_rcpt_" + Date.now(),
    });

    const newOrder = await Order.create({
      user,
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
    console.error("🔥 FULL ERROR:", error);  // 👈 IMPORTANT
    return res.status(500).json({
      success: false,
      message: error.message,  // show real error
    });
  }
};


// ==============================
// 2️⃣ VERIFY PAYMENT
// ==============================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const order = await Order.findOne({ razorpay_order_id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      order.status = "failed";
      await order.save();

      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    // ✅ Payment Verified
    order.razorpay_payment_id = razorpay_payment_id;
    order.razorpay_signature = razorpay_signature;
    order.status = "paid";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
