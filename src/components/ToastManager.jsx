"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ToastManager() {
  const { message, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  return null;
}
