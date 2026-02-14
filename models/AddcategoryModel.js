import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // yaha file name ya path store hoga
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false, // soft delete ke liye
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
