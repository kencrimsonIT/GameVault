import {configureStore} from "@reduxjs/toolkit";
import {gameApi} from "../features/games/api/gameApi.ts";
import wishlistReducer from "../features/wishlist/slices/wishlistSlice.ts";

export const store = configureStore({
    reducer: {
        [gameApi.reducerPath]: gameApi.reducer,
        wishlist: wishlistReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

