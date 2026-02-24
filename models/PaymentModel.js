import mongoose from "mongoose";

function generateInvoiceNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}


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
      invoiceNumber: { type: String, unique: true },
  },
  { timestamps: true }
);



OrderSchema.pre("save", function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = generateInvoiceNumber();
  }
});

const Order = mongoose.model("PaymentOrder", OrderSchema);

export default Order;
