import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
  },
});
