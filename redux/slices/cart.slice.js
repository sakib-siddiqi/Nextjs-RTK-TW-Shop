import { createSlice } from "@reduxjs/toolkit";

const CART_SLICE = createSlice({
  name: "cart",
  initialState: {
    next_position: 1,
    cart: [],
  },
  reducers: {
    add_to_cart(state, { payload }) {
      const from_prev_cart = state?.cart?.find(
        (ele) => ele?.product_id === payload?._id
      );
      const product = {
        product_id: payload._id,
        count: !!from_prev_cart ? from_prev_cart?.count + 1 : 1,
        position: payload.position,
      };

      let others = state.cart.filter((ele) => ele.product_id !== payload?._id);
      state.cart = [...others, product].sort((a, b) => a.position - b.position);
    },
    remove_from_cart(state, { payload }) {
      state?.cart?.filter((ele) => ele.product_id !== payload);
    },
    update_cart_next_position(state) {
      state.next_position += 1;
    },
  },
});
export const { add_to_cart, remove_from_cart, update_cart_next_position } =
  CART_SLICE.actions;
export default CART_SLICE;
