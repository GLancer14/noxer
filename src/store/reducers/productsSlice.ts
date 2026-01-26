import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Product from "../../types/Product";

const initialState: Product[] = [];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.push(...action.payload);
    },
    resetProducts: () => {
      return [];
    },
    updateProducts: (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    },
  }
});

export const { addProducts, resetProducts, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;