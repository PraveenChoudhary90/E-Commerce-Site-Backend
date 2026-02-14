import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  schemeName: { type: String, required: true },
  couponCode: { type: String, required: true, unique: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },
  maxUsagePerUser: { type: Number, default: 1 },
   isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
