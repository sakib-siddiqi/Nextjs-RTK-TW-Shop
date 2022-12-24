import { configureStore } from "@reduxjs/toolkit";
import { cart_position } from "./middleware/cart.middleware";
import CART_SLICE from "./slices/cart.slice";

const store = configureStore({
  reducer: {
    [CART_SLICE.name]: CART_SLICE.reducer,
  },
  middleware: (default_middlware) => default_middlware().concat(cart_position),
});

export default store;
