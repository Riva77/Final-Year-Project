import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import productReducer from "../features/productSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
    modal: modalReducer,
  },
});
