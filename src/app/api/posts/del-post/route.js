import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

export async function POST(request) {
  try {
    await connectDB();

    const reqBody = await request.json();
    const { uid, postId } = reqBody;

    if (!uid || !postId) {
      return NextResponse.json(
        { error: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    const [user, post] = await Promise.all([
      User.findById(uid),
      Post.findById(postId),
    ]);

    if (!user) {
      return NextResponse.json(
        { error: "User not found", success: false },
        { status: 404 }
      );
    }

    if (!post) {
      return NextResponse.json(
        { error: "Post not found", success: false },
        { status: 404 }
      );
    }

    post.isDel = true;

    await post.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
