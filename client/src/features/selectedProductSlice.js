import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSelected: false,
  productType: "",
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
      state.productType='';
    },
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
  },
});
export const {
  setProduct,
  clearProduct,
  setProductType,
} = selectedProductSlice.actions;
export default selectedProductSlice.reducer;
