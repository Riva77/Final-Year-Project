import { createSlice } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../utils/toast";

const localCart = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  products: localCart ? localCart : [],
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const product = action.payload;
      const productIndex = state.products.findIndex(
        (products) => products._id === product._id
      );

      if (productIndex >= 0) {
        toastError("Product already in cart!");
      } else {
        state.products = [...state.products, product];
        localStorage.setItem("cartItems", JSON.stringify(state.products));
        toastSuccess("Product added to cart!");
      }
    },

    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    updateProductQuantity: (state, action) => {
      console.log(action.payload);
      const { productId, quantity } = action.payload;

      const productIndex = state.products.findIndex(
        (product) => product._id === productId
      );

      if (productIndex >= 0) {
        state.products[productIndex].quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },

    clearCart: (state) => {
      state.products = []; // Clear the products array
      localStorage.removeItem("cartItems"); // Remove cart items from localStorage
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
