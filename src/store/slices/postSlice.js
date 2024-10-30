"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  upload,
  getPosts,
  likePost,
  deletePost,
  getSpecificPost,
} from "@/store/methods/postMethod";

const postSlice = createSlice({
  name: "post",
  initialState: {
    data: [],
    message: "",
    error: null,
    success: false,
  },
  reducers: {
    reset: (state) => {
      state.message = "";
      state.success = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upload.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(upload.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.data = action.payload.data;
        // state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = action.payload.sucess;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getSpecificPost.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getSpecificPost.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
