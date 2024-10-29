import { connectDB } from "@/dbConfig/dbConfig";
import path from "path";
import { writeFile } from "fs/promises";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.formData();
    const userId = reqBody.get("userId");
    const image = reqBody.get("avatar");
    const byteLength = await image.arrayBuffer();
    const bufferData = await Buffer.from(byteLength);
    const date = new Date().getMilliseconds();
    const pathofIMG = `./public/profile_pics/${date}${path.extname(
      image.name
    )}`;
    writeFile(pathofIMG, bufferData);

    const getUser = await User.findById(userId);

    if (!getUser) {
      return NextResponse.json({
        error: "User not found",
        success: false,
      });
    }

    getUser.avatar = pathofIMG;

    await getUser.save();

    return NextResponse.json({
      message: "Avatar updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
