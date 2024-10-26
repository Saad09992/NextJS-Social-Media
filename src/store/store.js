import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      post: postReducer,
    },
  });
};
