"use client";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/methods/postMethod";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.post); // Assuming posts are stored in state.posts.data

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 pt-32 gap-6">
      <div className="w-full max-w-2xl space-y-6">
        {data.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden w-full transition-transform transform hover:scale-105"
          >
            <img
              src={`/${post.image.replace(/^\.\/public\//, "")}`} // Trim "public" prefix if present
              alt={post.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 text-lg">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
