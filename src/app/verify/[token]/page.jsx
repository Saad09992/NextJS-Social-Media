"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "@/store/methods/authMethod";
import { useRouter } from "next/navigation";

function VerifyToken({ params }) {
  const { token } = React.use(params);
  const { success } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleVerification = async () => {
    try {
      dispatch(verifyToken(token));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (success) {
      router.push(`/login`);
    }
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Verify
        </h1>

        <button
          onClick={handleVerification}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Click me
        </button>

        <h2 className="text-lg font-medium text-gray-700 text-center break-all">
          {token ? token : "No token found"}
        </h2>
      </div>
    </div>
  );
}

export default VerifyToken;
