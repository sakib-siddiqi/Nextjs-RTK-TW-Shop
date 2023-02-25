import { REQ_METHOD } from "../../../../src/utils/const";
import { createProduct, getProducts } from "../../../../src/services/products.services";
import connectDB from "../../../../src/utils/connectDB";
export default async function handler(req, res) {
  const {method:METHOD,body:data,query}=req;
  try {
    await connectDB();
    switch (METHOD) {
      /** GET */
      case REQ_METHOD.GET: {
        const result = await getProducts({query});
        return res.status(200).json(result);
      }
      
      /** POST */
      case REQ_METHOD.POST: {
        const result = await createProduct(data);
        return res.status(200).json(result);
      }

      default:
        throw new Error("Request Method is invalid");
    }
  } catch (error) {
    console.log("------>" + error.message);
    return res.status(500).json({
      code: error.code || 500,
      message: error.message || "Server error",
      stack: error.stack,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", 
    },
  },
};
