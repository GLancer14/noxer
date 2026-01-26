import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Product from "../../types/Product";

const initialState: Product[] = [];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<string>) => {
      state.push();
    },
  }
});

export const { updateProducts } = productsSlice.actions;
export default productsSlice.reducer;