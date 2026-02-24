import mongoose from "mongoose";

// Function to generate unique 8-digit invoice number
function generateInvoiceNumber() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const OrderSchema = new mongoose.Schema(
  {
    // ✅ Reference to the authenticated user
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // ✅ Shipping address
    address: { type: String, required: true },

    // ✅ Ordered products
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

    // ✅ Total order amount
    total: { type: Number, required: true },

    // ✅ Razorpay order/payment info
    razorpay_order_id: { type: String, unique: true, index: true },
    razorpay_payment_id: { type: String, default: null },
    razorpay_signature: { type: String, default: null },

    // ✅ Order status
    status: { type: String, enum: ["created", "paid", "failed", "cancelled"], default: "created" },

    // ✅ Unique invoice number
    invoiceNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

// Auto-generate invoice number before saving
OrderSchema.pre("save", function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = generateInvoiceNumber();
  }
  next();
});

// Export the model
const Order = mongoose.model("PaymentOrder", OrderSchema);
export default Order;