import { isValidObjectId } from "mongoose";
import Products from "../model/products.model";

export async function getProducts(_id) {
  const result = _id ? await Products.findById(_id) : await Products.find({});
  return result;
}

export async function createProduct(productData) {
  const result = await Products.create(productData);
  return result;
}

export async function updateProduct(id, data) {
  const result = await Products.updateOne({ _id: id }, data);
  return result;
}

export async function deleteProduct(_id) {
  if (!isValidObjectId(_id)) throw new Error("Invalid `_id`.");
  const result = await Products.deleteMany({ _id });
  return result;
}
