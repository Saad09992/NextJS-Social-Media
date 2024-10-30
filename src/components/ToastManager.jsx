"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ToastManager() {
  const { message, success } = useSelector((state) => state.auth);
  const { message: postMessage, success: postSuccess } = useSelector(
    (state) => state.post
  );
  const { message: profileMessage, success: profileSuccess } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    if (postSuccess) {
      toast.success(postMessage);
    } else {
      toast.error(postMessage);
    }
    if (profileSuccess) {
      toast.success(profileMessage);
    } else {
      toast.error(profileMessage);
    }
  }, [message, error, postMessage, postError]);

  return null;
}
