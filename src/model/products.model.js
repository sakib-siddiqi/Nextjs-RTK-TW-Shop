import mongoose, { models } from "mongoose";

const productsSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Types.ObjectId,
    ref: "brand",
    required: [true, "Product `brand` property is required."],
  },
  model: {
    type: String,
    required: [true, "Product `model` property is required."],
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    min: [1, "Price should be greater then $0."],
  },
  features: [
    {
      type: String,
      required: [true, "Product `features` property is required."],
    },
  ],
  description: {
    type: String,
    required: [true, "Product `description` property is required."],
  },
  colors: [
    {
      type: String,
      required: [true, "Product `colors` property is required."],
    },
  ],
  images: [
    {
      type: String,
      required: [true, "Product `images` property is required."],
    },
  ],
  stock: {
    type: Number,
    required: [true, "Product `stock` property is required."],
    default: 0,
  },
  rating: {
    value: { type: Number, min: 0 },
    count: { type: Number, min: 0 },
  },
});

module.exports = models.products || mongoose.model("products", productsSchema);
