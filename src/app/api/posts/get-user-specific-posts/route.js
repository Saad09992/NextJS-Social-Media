import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request) {
  try {
    const userId = getDataFromToken(request);
    const post = await Post.findOne({ user: userId });
    if (post) {
      return NextResponse.json({
        message: "Post found successfully",
        success: true,
        data: post,
      });
    } else {
      return NextResponse.json({
        message: "Post not found",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
