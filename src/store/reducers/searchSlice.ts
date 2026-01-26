import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  isFocused: boolean;
  value: string;
}

const initialState: SearchState = {
  isFocused: false,
  value: ""
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    updateFocusedState: (state, action: PayloadAction<boolean>) => {
      state.isFocused = action.payload;
    },
  }
});

export const { updateSearchValue, updateFocusedState } = searchSlice.actions;
export default searchSlice.reducer;
