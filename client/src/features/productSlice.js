import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData", //action type providing unique identifier for action. multiple slices ko naam fetch walai vayo vani problem hunxa so naming convention huna parxa.
  async () => {
    const response = await axios.get(
      //get function le chai id anudar user ko data linxa
      `http://localhost:8000/api/getProduct`
    );
    return response.data; //promise return gareko i.e response ma aako data return gareko
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(fetchProductData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default productSlice.reducer;
