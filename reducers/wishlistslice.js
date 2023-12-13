import { createSlice } from "@reduxjs/toolkit";

const wishlistslice = createSlice({
  name: "item",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistslice.actions;

const wishlistReducer = wishlistslice.reducer;

export default wishlistReducer;
