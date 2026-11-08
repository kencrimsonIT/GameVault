import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/slices/cartSlice";
import {setStorage} from "../services/storage";
import {CART_STORAGE_KEY} from "../utils/constants";

export const store = configureStore({
    reducer: {
        // auth: ,
        cart: cartReducer,
        // wishlist:
    },
});

// Sync cart to storage
store.subscribe(() => {
    setStorage(CART_STORAGE_KEY, store.getState().cart.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
