import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../reducers/itemslice";
import wishlistReducer from "../reducers/wishlistslice";

export const itemStore = configureStore({
  reducer: {
    item: itemReducer,
    wishlist: wishlistReducer,
  },
});
