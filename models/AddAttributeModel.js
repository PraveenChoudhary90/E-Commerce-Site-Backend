import mongoose from "mongoose";

const { Schema, model } = mongoose;

const attributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parentAttribute: {
      type: Schema.Types.ObjectId,
      ref: "Attribute",
      default: null,
    },
  },
  { timestamps: true }
);

export default model("Attribute", attributeSchema);
