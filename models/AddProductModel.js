import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  avatar: { type: String }, // optional user image URL
  createdAt: { type: Date, default: Date.now }
});


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

    isBestSeller: { 
  type: Boolean, 
  default: false 
},

     isDeleted: { type: Boolean, default: false } ,
     reviews: [reviewSchema],
     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
