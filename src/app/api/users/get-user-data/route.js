import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/TokenExtract";
import User from "@/models/userModel";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { uid } = reqBody;
    const userData = await User.findOne({ _id: uid }).select("-password");
    const userPosts = await Post.find({ user: uid, isDel: false })
      .select("likes")
      .select("image")
      .select("title");

    const data = {
      username: userData?.username,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      location: userData?.location,
      bio: userData?.bio,
      avatar: userData?.avatar,
      isVerified: userData?.isVerified,
      dateJoined: userData?.dateJoined,
      _id: userData?._id,
      userPosts: userPosts,
    };

    if (!userData) {
      return NextResponse.json({
        error: "Error fetching user data",
        success: false,
      });
    }
    return NextResponse.json({
      data: data,
      // message: "User data fetched sucessfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
