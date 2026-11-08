import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";
import { getStorage } from "../../../services/storage";
import { CART_STORAGE_KEY } from "../../../utils/constants";
import type { CartItem, CartState } from "../types/cart.types";

const initialState: CartState = {
  items: getStorage<CartItem[]>(CART_STORAGE_KEY, []),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existed = state.items.some((item) => item.id === action.payload.id);
      if (!existed) {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) => state.cart.items.length;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price, 0);

export const selectCartOriginalTotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + Math.max(item.originalPrice, item.price),
    0,
  );
