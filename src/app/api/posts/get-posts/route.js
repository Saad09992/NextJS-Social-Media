import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(request) {
  try {
    // Use populate to get full user details in likes array
    const posts = await Post.find({ isDel: false }).populate("user");
    return NextResponse.json({ data: posts, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
