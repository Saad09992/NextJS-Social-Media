"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/store/methods/authMethod";
import { updateAvatar, updateUserData } from "@/store/methods/profileMethod";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, uid } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    userId: uid,
    username: "",
    phone: "",
    location: "",
    bio: "",
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const avatar = data?.avatar || null;
      setFormData({
        userId: uid,
        username: data.username || "",
        phone: data.phoneNumber || "",
        location: data.location || "",
        bio: data.bio || "",
        avatar: avatar || null,
      });
    }
  }, [data]);

  useEffect(() => {
    dispatch(getUserData(uid)).then((action) => {
      if (action.payload) {
        router.push(`/profile`);
      }
    });
  }, [uid, dispatch, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarClick = () => {
    const avatarInput = document.getElementById("avatarInput");
    if (avatarInput) {
      avatarInput.click();
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setUploadingAvatar(true);
        const formData = new FormData();
        formData.append("avatar", file);
        formData.append("userId", uid);

        await dispatch(updateAvatar(formData));
        dispatch(getUserData(uid)).then((action) => {
          if (action.payload) {
            router.push(`/profile`);
          }
        });
      } catch (error) {
        console.error("Error uploading avatar:", error);
      } finally {
        setUploadingAvatar(false);
      }
    }
  };

  const handleEditClick = () => {
    setFormData({
      userId: uid,
      username: data?.username || "",
      phone: data?.phoneNumber || "",
      location: data?.location || "",
      bio: data?.bio || "",
      avatar: data?.avatar || null,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateUserData(formData)).then((action) => {
        if (action.payload) {
          dispatch(getUserData(uid)).then((action) => {
            if (action.payload) {
              router.push(`/profile`);
            }
          });
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                <button
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow"
                  onClick={handleAvatarClick}
                  disabled={uploadingAvatar}
                >
                  <PencilIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-2xl font-bold mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">
                    {data?.username || "User Name"}
                  </h1>
                )}
                <p className="text-gray-600">{data?.email}</p>
              </div>
            </div>
            <div>
              {isEditing ? (
                <div className="space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <PencilIcon className="w-5 h-5 inline-block mr-2" />
                  Edit Profile
                </button>
              )}
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
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {data?.phoneNumber || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter location"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {data?.location || "Not provided"}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">
                    {data?.dateJoined || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">UID</p>
                  <p className="text-gray-900">{uid || "Not available"}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                About Me
              </h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] resize-y"
                />
              ) : (
                <p className="text-gray-600">
                  {data?.bio || "No bio information provided."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />
    </div>
  );
}

export default Profile;
