import { model, models, Schema } from "mongoose";

const productsSchema = new Schema({
  title: String,
  desc:{
    type:String,
    minLength:10
  },
  price: {
    type: Number,
    require: true,
    default: 1,
  },
  stock: {
    type: Number,
    require: true,
    default: 10,
  },
  discount: {
    type: Number,
    require: true,
    default: 0,
  },
  images: [{
    type: String,
    default: [],
  }],
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
