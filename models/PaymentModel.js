import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true },
    },

    products: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        brand: { type: String },
        qty: { type: Number, required: true },
        user_price: { type: Number, required: true },
        images: [{ type: String }],
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    razorpay_order_id: {
      type: String,
      unique: true,
      index: true,
    },

    razorpay_payment_id: {
      type: String,
      default: null,
    },

    razorpay_signature: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["created", "paid", "failed", "cancelled"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("PaymentOrder", OrderSchema);

export default Order;
