import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/TokenExtract";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { uid } = reqBody;
    const userData = await User.findOne({ _id: uid }).select("-password");

    if (!userData) {
      return NextResponse.json({
        error: "Error fetching user data",
        success: false,
      });
    }
    return NextResponse.json({
      data: userData,
      // message: "User data fetched sucessfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
