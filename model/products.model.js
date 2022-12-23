import { model, models, Schema } from "mongoose";

const productsSchema = new Schema({
  title: String,
  price: {
    type: Number,
    require: true,
    default: 1,
  },
  strock: {
    type: Number,
    require: true,
    default: 10,
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
  image: {
    type: String,
    default: null,
  },
  rating: {
    count: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
    },
  },
});


const Products = models.products || model("products",productsSchema);
export default Products;
