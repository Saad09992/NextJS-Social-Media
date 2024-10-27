"use client";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, likePost } from "../store/methods/postMethod";
import { useEffect } from "react";
import { Heart } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.post);
  // const { data: userData } = useSelector((state) => state.auth);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLike = (postId) => {
    try {
      dispatch(likePost({ postId }));
      dispatch(getPosts());
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };
  const getPostsUsername = (post) => {
    if (!post.user) return "Anonymous User";
    return post.user.username;
  };
  // Updated helper function to check likes array containing user objects
  const hasUserLikedPost = (post) => {
    if (!userData || !userData._id || !post.likes) return false;
    return post.likes.some((likeUser) => likeUser === userData._id);
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-4 sm:p-8 pt-20 gap-6">
        <div className="w-full max-w-xl space-y-6">
          {data.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden w-full transition-transform hover:shadow-xl"
            >
              {/* User Info Header */}
              <div className="flex items-center p-4 border-b">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-grow">
                  <a
                    href={`/profile/${getPostsUsername(post)}`}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {getPostsUsername(post) || "Anonymous User"}
                  </a>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative aspect-video">
                <img
                  src={`/${post.image.replace(/^\.\/public\//, "")}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Interaction Bar */}
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

              {/* Post Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.description}</p>
              </div>

              {/* Comments Preview */}
              <div className="px-4 pb-4">
                <div className="text-sm text-gray-500 hover:text-blue-600 cursor-pointer">
                  View all comments
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
