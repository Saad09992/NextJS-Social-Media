import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    response.cookies.delete("token");

    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
