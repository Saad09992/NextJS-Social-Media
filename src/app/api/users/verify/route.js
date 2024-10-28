import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { token } = await reqBody;
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid OR expired token" });
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    return NextResponse.json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
