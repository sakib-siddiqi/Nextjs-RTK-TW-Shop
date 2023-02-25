import { REQ_METHOD } from "../../../../src/utils/const";
import Cart from "../../../../model/cart.model";
import { getCart } from "../../../../services/cart.services";

export default async function cart_handler(req, res) {
  try {
    const { method: METHOD, body: data, query } = req;
    switch (METHOD) {
      case REQ_METHOD.GET: {
        const result = await getCart({ query });
        return res.status(200).json(result);
      }
      case REQ_METHOD.POST: {
        const result = await Cart.create(data);
        return res.status(200).json(result);
      }
      case REQ_METHOD.PATCH: {
        const result = await Cart.create(data);
        return res.status(200).json(null);
      }

      default: {
        res.setHeader("Allow", Object.values(REQ_METHOD));
        return res.status(405).end(`Method '${METHOD}' Not Allowed.`);
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: error.code || 500,
    });
  }
}
