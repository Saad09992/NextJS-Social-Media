"use client";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, likePost } from "../store/methods/postMethod";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { reset } from "@/store/slices/postSlice";
import { reset as postReset } from "@/store/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state.post);
  const { uid, success } = useSelector((state) => state.auth);
  const [localPosts, setLocalPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setLocalPosts(data);
    }
  }, [data]);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(reset());
  }, [dispatch]);

  const handleLike = async (postId) => {
    if (!uid) {
      router.push("/login");
      return;
    }

    try {
      // Optimistic update
      setLocalPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const hasLiked = post.likes.includes(uid);
            return {
              ...post,
              likes: hasLiked
                ? post.likes.filter((id) => id !== uid)
                : [...post.likes, uid],
            };
          }
          return post;
        })
      );

      // Dispatch like action
      await dispatch(likePost({ postId, uid })).unwrap();

      // Refresh posts data
      dispatch(getPosts());
    } catch (error) {
      console.error("Error handling like:", error);
      // Revert optimistic update on error
      setLocalPosts(data);
    }
  };

  const getPostsUsername = (post) => {
    if (!post.user) return "Anonymous User";
    return post.user.username;
  };

  const getPostsId = (post) => {
    return post.user?._id;
  };

  const hasUserLikedPost = (post) => {
    if (!uid || !post.likes) return false;
    return post.likes.includes(uid);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-4 sm:p-8 pt-20 gap-6">
        {localPosts?.length > 0 ? (
          <div className="w-full max-w-xl space-y-6">
            {localPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-full transition-transform hover:shadow-xl"
              >
                <div className="flex items-center p-4 border-b">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {post.user?.avatar ? (
                      <img
                        src={post.user?.avatar}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <svg
                          className="h-6 w-6 text-gray-400"
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
                  <div className="ml-3 flex-grow">
                    <a
                      href={`/public-profile/${getPostsId(post)}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {getPostsUsername(post)}
                    </a>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`h-6 w-6 ${
                        hasUserLikedPost(post)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                    <span className="text-sm">
                      {hasUserLikedPost(post) ? "Liked" : "Like"}
                    </span>
                    <span className="text-sm ml-1">
                      ({post.likes?.length || 0})
                    </span>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-700">{post.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-xl space-y-6">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                No Posts Found
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
