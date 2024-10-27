import Post from "@/models/postModel";
import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/TokenExtract";

connectDB();

export async function POST(request) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.formData();
    const image = reqBody.get("image");
    const title = reqBody.get("title");
    const description = reqBody.get("description");
    const byteLength = await image.arrayBuffer();
    const bufferData = await Buffer.from(byteLength);
    const date = new Date().getMilliseconds();
    const pathofIMG = `./public/uploads/${date}${path.extname(image.name)}`;
    writeFile(pathofIMG, bufferData);

    const newPost = new Post({
      title: title,
      description: description,
      image: pathofIMG,
      user: userId,
    });

    const res = await newPost.save();
    if (res) {
      return NextResponse.json({
        message: "Post created successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Post creation failed",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
