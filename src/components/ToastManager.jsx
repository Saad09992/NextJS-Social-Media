"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ToastManager() {
  const { message, error } = useSelector((state) => state.auth);
  const { message: postMessage, error: postError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    if (postMessage) {
      toast.success(postMessage);
    }
    if (postError) {
      toast.error(postError);
    }
  }, [message, error, postMessage, postError]);

  return null;
}
