import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    banner_name: {
      type: String,
      required: true,
      trim: true,
    },
    banner_page: {
      type: String,
      required: true,
      trim: true,
    },
    banner_type: {
      type: String,
      enum: ["hero", "carousel", "sidebar", "footer", "popup", "custom"],
      default: "hero",
    },
    custom_banner_type: {
      type: String,
      default: "",
    },
    images: {
      type: [String], // Will store ImageKit URLs
      default: [],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false }
);

// Middleware to update updated_at
bannerSchema.pre("save", function (next) {
  this.updated_at = Date.now();
});

export default mongoose.model("Banner", bannerSchema);
