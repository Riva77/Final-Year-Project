import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{},
  isSelected: false,
};

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
      state.isSelected = true;
    },

    clearProduct: (state) => {
      state.data = {};
      state.isSelected = false;
    },
  },
});
export const { setProduct, clearProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
