import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/TokenExtract";

connectDB();

export async function POST(request) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.json();
    const { postId } = reqBody;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 400 }
      );
    }

    const getPost = await Post.findById(postId);
    if (!getPost) {
      return NextResponse.json(
        { error: "Post not found", success: false },
        { status: 400 }
      );
    }

    const checkIfLiked = getPost.likes.find(
      (like) => like.toString() === userId.toString()
    );

    let message = "";

    if (checkIfLiked) {
      getPost.likes = getPost.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
      message = "Unliked successfully";
    } else {
      getPost.likes.push(userId);
      message = "Liked successfully";
    }

    const updatedPost = await getPost.save();
    if (!updatedPost) {
      return NextResponse.json(
        { error: "Failed to update post", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
}
