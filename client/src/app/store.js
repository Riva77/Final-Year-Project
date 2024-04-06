import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import modalReducer from "../features/modalSlice";
import cartReducer from "../features/cartSlice";
import topProductReducer from "../features/topProductSlice";
import selectedProductReducer from "../features/selectedProductSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    product: productReducer,
    modal: modalReducer,
    cart: cartReducer,
    topProduct: topProductReducer,
    selectedProduct: selectedProductReducer,
  },
});
