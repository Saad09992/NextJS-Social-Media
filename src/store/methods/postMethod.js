import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const upload = createAsyncThunk("/api/posts/upload", async (data) => {
  try {
    const response = await axios.post("/api/posts/upload", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("/api/posts/get-posts", async () => {
  try {
    const response = await axios.get("/api/posts/get-posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const likePost = createAsyncThunk("/api/posts/like", async (data) => {
  try {
    const response = await axios.post("/api/posts/like", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk(
  "/api/posts/del-post",
  async (data) => {
    try {
      const response = await axios.post("/api/posts/del-post", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSpecificPost = createAsyncThunk(
  "/api/posts/get-specific",
  async (data) => {
    try {
      console.log(data);
      const response = await axios.get(`/api/posts/get-specific-post/${data}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editPost = createAsyncThunk(
  "/api/posts/edit-post",
  async (data) => {
    try {
      const response = await axios.post("/api/posts/edit-post", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
