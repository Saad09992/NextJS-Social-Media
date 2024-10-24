import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  login,
  verify,
  logout,
  getUserData,
} from "../methods/authMethod";
import { act } from "react";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    message: "",
    success: false,
    error: "",
    isAuthenticated: false,
  },
  reducers: {
    reset: (state) => {
      state.data = [];
      state.message = "";
      state.success = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(verify.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      });
  },
});
// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
