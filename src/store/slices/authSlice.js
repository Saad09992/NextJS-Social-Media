"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  login,
  verify,
  logout,
  getUserData,
} from "../methods/authMethod";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    message: "",
    success: false,
    error: "",
    isAuthenticated: localStorage.getItem("isauthenticated") || false,
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
        localStorage.setItem("isauthenticated", true);
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
        localStorage.removeItem("isauthenticated");
        localStorage.removeItem("userData");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload.data || {};
        state.message = action.payload.message;
        state.success = action.payload.success;
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      });
  },
});
// Action creators are generated for each case reducer function
export const { reset, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
