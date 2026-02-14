import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String },
    product_category: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
    ],
    gst_in_percentage: { type: Number, default: 0 },
    product_mrp: { type: Number, required: true },
    user_price: { type: Number, required: true },
    description: { type: String, required: true },
    attributes: [
      {
        attribute: { type: mongoose.Schema.Types.ObjectId, ref: "Attribute" },
        values: [{ type: String }]
      }
    ],
    images: [{ type: String }],
     isDeleted: { type: Boolean, default: false } ,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
