"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  login,
  logout,
  getUserData,
  verifyToken,
} from "../methods/authMethod";

// Helper function to safely access localStorage
const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null; // Return null if not in the client environment
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: {},
    uid: getLocalStorageItem("uid"),
    message: null,
    success: null,
    error: null,
    isAuthenticated: !!getLocalStorageItem("token"),
  },
  reducers: {
    reset: (state) => {
      state.message = "";
      state.success = null;
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
        state.isAuthenticated = action.payload.token != null;

        if (typeof window !== "undefined" && action.payload.token != null) {
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
        if (typeof window !== "undefined") {
          localStorage.removeItem("verification-token");
        }
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
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        console.log(action.payload.data);
        state.success = action.payload.success;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = action.payload.success;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
