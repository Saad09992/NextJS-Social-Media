import { connectDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helper/TokenExtract";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  const userId = getDataFromToken(request);
  const userData = await User.findOne({ _id: userId }).select("-password");
  if (!userData) {
    return NextResponse.json({
      error: "Error fetching user data",
    });
  }
  return NextResponse.json({
    message: "User data fetched sucessfully",
    data: userData,
  });
}
