import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { put } from "@vercel/blob";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.formData();
    const userId = reqBody.get("userId");
    const image = reqBody.get("image");
    const title = reqBody.get("title");
    const id = reqBody.get("id");
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

    const newPost = new Post({
      title: title,
      description: description,
      image: blobResponse.url,
      user: userId,
    });

    const res = await newPost.save();
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
