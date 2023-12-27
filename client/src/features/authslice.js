import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData", //action type providing unique identifier for action. multiple slices ko naam fetch walai vayo vani problem hunxa so naming convention huna parxa.
  async (id) => {
    const response = await axios.get(
      //get function le chai id anudar user ko data linxa
      `http://localhost:8000/api/getUser/${id}`
    );
    return response.data; //promise return gareko i.e response ma aako data return gareko
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default authSlice.reducer;
