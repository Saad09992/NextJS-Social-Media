import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const username = reqBody.username;
    const phone = reqBody.phone;
    const location = reqBody.location;
    const bio = reqBody.bio;
    const userId = reqBody.userId;

    const getUser = await User.findById(userId);

    if (!getUser) {
      return NextResponse.json({
        error: "User not found",
        success: false,
      });
    }

    getUser.username = username;
    getUser.phoneNumber = phone;
    getUser.location = location;
    getUser.bio = bio;

    await getUser.save();

    return NextResponse.json({
      message: "User data updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
