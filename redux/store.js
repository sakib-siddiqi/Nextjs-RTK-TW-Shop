import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cart_position } from "./middleware/cart.middleware";
import CART_SLICE from "./slices/cart.slice";
const persistConfig = {
  key: "root",
  storage,
};
const root_reducer = combineReducers({
  [CART_SLICE.name]: CART_SLICE.reducer,
});
const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (default_middlware) => default_middlware().concat(cart_position),
});

export default store;
