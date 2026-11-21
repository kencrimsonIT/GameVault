import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/slices/cartSlice";
import profileReducer from "../features/profile/slices/profileSlice";
import {setStorage} from "../services/storage";
import {CART_STORAGE_KEY, PROFILE_STORAGE_KEY} from "../utils/constants";

export const store = configureStore({
    reducer: {
        // auth: ,
        cart: cartReducer,
        profile: profileReducer,
        // wishlist:
import {gameApi} from "../features/games/api/gameApi.ts";
import wishlistReducer from "../features/wishlist/slices/wishlistSlice.ts";
import authReducer from "../features/auth/slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [gameApi.reducerPath]: gameApi.reducer,
        wishlist: wishlistReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
});

// Sync to storage
store.subscribe(() => {
    const state = store.getState();
    setStorage(CART_STORAGE_KEY, state.cart.items);
    setStorage(PROFILE_STORAGE_KEY, state.profile.profile);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
