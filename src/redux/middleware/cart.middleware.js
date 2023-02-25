import CART_SLICE, {
  add_to_cart,
  update_cart_next_position
} from "../slices/cart.slice";

export const cart_position = (store) => (next) => (action) => {
  if (action.type === add_to_cart.type) {
    const current_position=store.getState()?.[CART_SLICE.name].next_position;
    const previous_cart = store.getState()?.[CART_SLICE.name]?.cart;
    const from_prev_cart = previous_cart.find(
      (item) => item.product_id === action?.payload?._id
    );
    const data = {
      ...action.payload,
      position: from_prev_cart?.position || current_position,
    };
    if (!from_prev_cart) {
      store.dispatch(update_cart_next_position());
    }

    action.payload = data;
    return next(action);
  }
  return next(action);
};
