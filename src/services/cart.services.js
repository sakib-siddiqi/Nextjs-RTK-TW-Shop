import { isValidObjectId } from "mongoose";
import Cart from "../model/cart.model";

export async function getCart({ _id, query = {} }) {
    const result = isValidObjectId(_id) ? await Cart.findById(_id) : await Cart.find(query);
    return result;
}

export async function createCart(offerData) {
    const result = await Cart.create(offerData);
    return result;
}

export async function updateCart(id, data) {
    if (!isValidObjectId(_id)) throw new Error("Invalid `_id`.");
    const result = await Cart.updateOne({ _id: id }, data);
    return result;
}

export async function deleteCart(_id) {
    if (!isValidObjectId(_id)) throw new Error("Invalid `_id`.");
    const result = await Cart.deleteMany({ _id });
    return result;
}
