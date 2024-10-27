"use client";
import { createSlice } from "@reduxjs/toolkit";
import {
  upload,
  getPosts,
  getSpecificUserPosts,
  likePost,
} from "@/store/methods/postMethod";

const post = createSlice({
  name: "post",
  initialState: {
    data: [],
    message: "",
    error: null,
    success: false,
  },
  reducers: {},
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
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload.error;
        state.success = action.payload.sucess;
      })
      .addCase(getSpecificUserPosts.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(getSpecificUserPosts.rejected, (state, action) => {
        state.error = action.payload.error;
        state.message = action.payload.message;
        state.success = action.payload.success;
      });
  },
});

export default post.reducer;
