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
    if (success && message != "") {
      toast.success(message);
    } else if (!success && message != "") {
      toast.error(message);
    }
    if (postSuccess && postMessage != "") {
      toast.success(postMessage);
    } else if (!postSuccess && postMessage != "") {
      toast.error(postMessage);
    }
    if (profileSuccess && profileMessage != "") {
      toast.success(profileMessage);
    } else if (!profileSuccess && profileMessage != "") {
      toast.error(profileMessage);
    }
  }, [success, postSuccess, profileSuccess]);

  return null;
}
