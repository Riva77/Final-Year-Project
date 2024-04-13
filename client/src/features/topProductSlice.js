import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchTopProductData = createAsyncThunk(
  "product/fetchTopProductData", //action type providing unique identifier for action. multiple slices ko naam fetch walai vayo vani problem hunxa so naming convention huna parxa.
  async () => {
    const response = await axios.get(
      //get function le chai id anudar user ko data linxa
      `http://localhost:8000/api/getTopProducts`
    );
    return response.data; //promise return gareko i.e response ma aako data return gareko
  }
);

const topProductSlice = createSlice({
  name: "topProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopProductData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopProductData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    });
    builder.addCase(fetchTopProductData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default topProductSlice.reducer;
