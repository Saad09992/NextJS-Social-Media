"use client";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk("/api/users/signup", async (data) => {
  try {
    const response = await axios.post("/api/users/signup", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk("/api/users/login", async (data) => {
  try {
    const response = await axios.post("/api/users/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const verifyToken = createAsyncThunk(
  "/api/users/verify",
  async (token) => {
    try {
      const response = await axios.post("/api/users/verify", { token });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk("/api/users/logout", async () => {
  try {
    const response = await axios.get("/api/users/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUserData = createAsyncThunk(
  "/api/users/get-user-data",
  async (uid) => {
    try {
      const response = await axios.post("/api/users/get-user-data", { uid });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
