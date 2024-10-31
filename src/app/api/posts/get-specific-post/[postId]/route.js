import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request, { params }) {
  try {
    const postId = params.postId;
    console.log(postId);

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ data: post, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
