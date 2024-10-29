"use client";
import { createSlice } from "@reduxjs/toolkit";
import { updateAvatar, updateUserData } from "../methods/profileMethod";

const profile = createSlice({
  name: "profile",
  initialState: {
    data: [],
    message: null,
    success: null,
    error: null,
    uid: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.data = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.error = action.payload.error;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.error = action.payload.error;
      });
  },
});

export const {} = profile.actions;

export default profile.reducer;
