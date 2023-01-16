import mongoose, { model, models, Schema } from "mongoose";

const cartSchema = new Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "products",
    required: true,
  },
  count: {
    type: Number,
    default: 1,
    min: [1,'{VALUE} should be greater then 1.'],
  },
  user: {
    type: String,
    required: true,
    default: "root",
  },
});

const Cart = models.carts || model("carts", cartSchema);
export default Cart;
