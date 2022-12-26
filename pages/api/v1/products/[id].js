import Products from "../../../../model/products.model";
import db_connector from "../../pages/_db_connect";

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function handler(req, res) {
  try {
    await db_connector();
    const result = await Products.findById(req?.query?.id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({
      code: error.code || 500,
      message: error.message || "Server error",
    });
  }
}
