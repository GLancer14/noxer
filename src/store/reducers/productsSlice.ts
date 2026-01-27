import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Product from "../../types/Product";
import type { ProductsDTO } from "../../types/Product";

const initialState: ProductsDTO = {
  filters: {
    category_ids: null,
    color_ids: null,
    in_stock:  null,
    mark_ids: null,
    price: null,
    search: null,
    sort_by: "popularity",
    sort_desc: false,
    specifications: null,
  },
  pagination: {
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 20,
    total_pages: 1,
    total_products: 0,
  },
  products: [],
  status: "ok",
  total: 1918,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.products.push(...action.payload);
    },
    resetProducts: (state) => {
      state.products = [];
    },
    updateProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  }
});

export const { addProducts, resetProducts, updateProducts } = productsSlice.actions;
export default productsSlice.reducer;