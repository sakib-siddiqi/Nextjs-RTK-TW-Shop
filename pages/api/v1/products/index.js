import connectDB from "../../../../middleware/connectDB";
import Products from "../../../../model/products.model";

export default async function handler(req, res) {
  try {
    await connectDB();
    const result = await Products.find({});
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({
      code: error.code || 500,
      message: error.message || "Server error",
    });
  }
}
