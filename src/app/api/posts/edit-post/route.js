import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { put } from "@vercel/blob";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.formData();
    const image = reqBody.get("image");
    const title = reqBody.get("title");
    const postId = reqBody.get("postId");
    const description = reqBody.get("description");

    const byteLength = await image.arrayBuffer();
    const bufferData = Buffer.from(byteLength);

    const date = new Date().getMilliseconds();
    const blobPath = `uploads/${date}-${image.name}`;
    const blobResponse = await put(blobPath, bufferData, {
      access: "public",
      contentType: image.type,
    });

    if (!blobResponse || !blobResponse.url) {
      throw new Error("Failed to upload image to Vercel Blob");
    }

    const updatePost = await Post.findById(postId);
    if (!updatePost) {
      return NextResponse.json(
        { error: "Post not found", success: false },
        { status: 404 }
      );
    }

    updatePost.title = title;
    updatePost.description = description;
    updatePost.image = blobResponse.url;

    const res = await updatePost.save();
    if (res) {
      return NextResponse.json({
        message: "Post Edited successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Post editing failed",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
