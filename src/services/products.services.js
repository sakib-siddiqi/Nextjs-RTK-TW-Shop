import { isValidObjectId } from "mongoose";
import Products from "../model/products.model";

export async function getProducts({ _id, query = {} } = {}) {
  const { sort, fields, price = "", search = "", ...rest_query } = query;
  const [gt_price, lt_price] = price.split("-").map(e => +e);
  if (!!_id && isValidObjectId(_id)) {
    return await Products.findById(_id);
  } else {
    const result = await Products
      .find(rest_query)
      .where("price").gte(gt_price | 0).lte(lt_price ? lt_price : Infinity)
      .sort(sort)
      .or({
        title: {
          $regex: search
        },
      })
      .select(fields);
    return {
      query: Object.assign(query, { price: price.split("-").map(e => +e) }),
      data: result,
    };
  }
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
