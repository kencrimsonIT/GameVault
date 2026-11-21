import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

type WishlistState = {
    ids: number[];
}
 const initialState: WishlistState = {
    ids:[],
 }
  const wishlistSlice = createSlice({
      name: 'wishlist',
     initialState,
     reducers:{
          toggleWishlist(state, action: PayloadAction<number>){
              const id = action.payload;
              if (state.ids.includes(id)){
                  state.ids = state.ids.filter(saveId =>saveId !== id)
              }
              else {
                  state.ids.push(id);
              }
          }
     }
  })
export const {toggleWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;