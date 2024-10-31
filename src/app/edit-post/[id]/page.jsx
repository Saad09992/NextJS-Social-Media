"use client";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/store/slices/postSlice";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSpecificPost, editPost } from "@/store/methods/postMethod";

export default function EditPost({ params }) {
  const postId = use(params)?.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const { loading, success, data } = useSelector((state) => state.post);
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // Populate form with existing post data
  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setDescription(data.description || "");

      // If there's an existing image URL, we need to handle it differently
      if (data.image && typeof data.image === "string") {
        // Create a placeholder file object for display purposes
        const fileName = data.image.split("/").pop();
        fetch(data.image)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], fileName, { type: blob.type });
            setImage(file);
          })
          .catch((err) => console.error("Error loading image:", err));
      }
    }
  }, [data]);

  // Redirect after successful edit
  useEffect(() => {
    if (success) {
      router.push("/");
      dispatch(reset());
    }
  }, [success, router, dispatch]);

  // Fetch post data on component mount
  useEffect(() => {
    if (postId) {
      dispatch(getSpecificPost(postId)).then((action) => {
        if (action.payload) {
          router.push(`/edit-post/${postId}`);

          dispatch(reset());
        }
      });
    }
  }, [postId, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      formData.append("postId", postId);

      // Dispatch edit post action
      dispatch(editPost(formData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation(); // Prevent triggering the parent div's click handler
    setImage(null);
  };

  const handleClick = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div
          className="border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer flex flex-col items-center justify-center"
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          {image ? (
            <div className="relative w-full h-48 mb-2 overflow-hidden">
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="Preview"
                className="object-contain w-full h-full transition-transform duration-200 ease-in-out"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Drag & drop an image here, or click to select
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageInput"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
