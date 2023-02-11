import { Schema } from "mongoose";

const offerSchema = new Schema({
  title: {
    type: String,
    require: true,
    minLength: 3,
  },
  desc: {
    type: String,
    require: true,
    minLength: 10,
  },
  images: [
    {
      type: String,
    },
  ],
  route: {
    type: String,
    require: true,
    minLength: 1,
  },
});

const Offers = models.offers || model("offers", offerSchema);
export default Offers;
