import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./reducers/searchSlice";
import productsReducer from "./reducers/productsSlice";
import projectDataSlice from "./reducers/projectDataSlice";

export const setupStore = configureStore({
  reducer: {
    searchReducer,
    productsReducer,
    projectDataSlice,
  },
})

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;