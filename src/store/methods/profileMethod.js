import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateAvatar = createAsyncThunk(
  "/api/users/update-avatar",
  async (data) => {
    try {
      const response = await axios.post("/api/users/update-avatar", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "/api/users/update-user-data",
  async (data) => {
    try {
      const response = await axios.post("/api/users/update-user-data", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
