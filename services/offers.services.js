import { isValidObjectId } from "mongoose";
import Offers from "../model/offer.model";

export async function getOffers({ _id, query = {} }) {
    const result = isValidObjectId(_id) ? await Offers.findById(_id) : await Offers.find(query);
    return result;
}

export async function createOffers(offerData) {
    const result = await Offers.create(offerData);
    return result;
}

export async function updateOffer(id, data) {
    const result = await Offers.updateOne({ _id: id }, data);
    return result;
}

export async function deleteOffer(_id) {
    if (!isValidObjectId(_id)) throw new Error("Invalid `_id`.");
    const result = await Offers.deleteMany({ _id });
    return result;
}
