import { REQ_METHOD } from "../../../../const";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../../../services/products.services";
import connectDB from "../../../../utils/connectDB";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function handler(req, res) {
  const METHOD = req.method;
  const ID = req?.query?.id;
  const BODY = req?.body;
  try {
    await connectDB();
    switch (METHOD) {
      case REQ_METHOD.GET: {
        const result = await getProducts({_id:ID});
        return res.status(200).send(result);
      }

      case REQ_METHOD.PATCH: {
        const result = await updateProduct(ID, BODY);
        return res.status(200).send(result);
      }

      case REQ_METHOD.DELETE: {
        const result = await deleteProduct(ID);
        return res.status(200).send(result);
      }

      default:
        throw new Error("Invalid Method.");
        break;
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      code: error.code || 500,
      message: error.message || "Server error",
    });
  }
}
