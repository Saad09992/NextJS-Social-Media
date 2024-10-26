import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const upload = createAsyncThunk("/api/posts/upload", async (data) => {
  try {
    const response = await axios.post("/api/posts/upload", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("/api/posts/get-posts", async () => {
  try {
    const response = await axios.get("/api/posts/get-posts");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getSpecificUserPosts = createAsyncThunk(
  "/api/posts/upload",
  async () => {
    try {
      const response = await axios.get(`/api/posts/upload`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
