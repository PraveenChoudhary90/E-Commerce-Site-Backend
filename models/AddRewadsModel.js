import mongoose from "mongoose";

const specialOfferSchema = new mongoose.Schema({
  purchaseAmount: { type: Number, required: true },
  offer: { type: Number, required: true, min: 1, max: 100 },
  validFrom: { type: Date, required: true },
  validTill: { type: Date, required: true },
  rewardType: { type: String, default: "specialOffer" },
   isDeleted: { type: Boolean, default: false }, 
}, { timestamps: true });

export default mongoose.model("SpecialOffer", specialOfferSchema);
