import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
        success: false,
      });
    }
    if (!user.isVerified) {
      return NextResponse.json({
        error: "User is not verified",
        success: false,
      });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ error: "Invalid email or password" });
    }
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.SECRET, {
      expiresIn: "1d",
    });
    await User.updateOne({ _id: user._id }, { token: token });
    console.log(token);

    const response = NextResponse.json({
      message: "Logged in successfully",
      uid: user._id,
      token: token,
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
