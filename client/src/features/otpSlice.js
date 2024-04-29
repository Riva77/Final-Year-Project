import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OTP: "",
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOTP: (state, action) => {
      state.OTP = action.payload;
    
    },
    clearOTP:(state)=>{
      state.OTP= "";
    }
  },
});

export const { setOTP,clearOTP } = otpSlice.actions;
export default otpSlice.reducer;