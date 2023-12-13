import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    resetState: (state, action) => {
      state.value = [];
      console.log("resets here");
    },
  },
});

export default itemReducer = itemSlice.reducer;

export const { addItem, resetState } = itemSlice.actions;
