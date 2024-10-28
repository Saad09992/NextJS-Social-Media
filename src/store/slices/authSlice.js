"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  login,
  logout,
  getUserData,
  verifyToken,
} from "../methods/authMethod";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    uid: localStorage.getItem("uid") || null,
    message: null,
    success: null,
    error: null,
    isAuthenticated: !!localStorage.getItem("token"),
  },
  reducers: {
    reset: (state) => {
      state.message = "";
      state.success = false;
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.uid = action.payload.uid;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.isAuthenticated = action.payload.token != null;
        if (action.payload.token != null) {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("uid", action.payload.uid);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
        localStorage.removeItem("verification-token");
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload.data;
        // state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        // state.message = action.payload.message;
        state.success = action.payload.success;
      });
  },
});
// Action creators are generated for each case reducer function
export const { reset, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
