import mongoose from "mongoose";

const { Schema, model } = mongoose;

const attributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentAttribute: {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index: block duplicates only under same parent
attributeSchema.index(
  { name: 1, parentAttribute: 1 },
  { unique: true }
);

export default model("Attribute", attributeSchema);