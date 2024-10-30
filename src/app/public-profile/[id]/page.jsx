"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/store/methods/authMethod";
import Image from "next/image";
import { reset } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

function PublicProfile({ params }) {
  const router = useRouter();
  const { id } = React.use(params);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    location: "",
    bio: "",
    avatar: null,
  });

  useEffect(() => {
    if (data) {
      const avatar = data.avatar?.replace(/^\.\/public(?=\/)/, "") || null;

      setFormData({
        username: data.username || "",
        phone: data.phoneNumber || "",
        location: data.location || "",
        bio: data.bio || "",
        avatar: avatar || null,
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(getUserData(id)).then((action) => {
      if (action.payload) {
        router.push(`/public-profile/${id}`);
        dispatch(reset());
      }
    });
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data?.username || "User Name"}
                </h1>
                <p className="text-gray-600">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">
                    {data?.phoneNumber || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">
                    {data?.location || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {data?.dateJoined || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="text-gray-900">
                    {data?._id || "Not available"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                About Me
              </h2>
              <p className="text-gray-600">
                {data?.bio || "No bio information provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
