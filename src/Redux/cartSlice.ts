import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartItem, ICartState } from "../types/type";

const initialState: ICartState = {
  items: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingProduct = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      console.log("REMOVE", action.payload);
      state.items = state.items.filter(
        (product) => product._id !== action.payload,
      );
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload,
      );

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice;



