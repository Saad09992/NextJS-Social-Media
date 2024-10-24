import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const verifyToken = searchParams.get("token");

  // Check if it's a verification path with token
  const isVerificationPath = path === "/verify" && verifyToken;

  const isPublic =
    path === "/login" || path === "/signup" || isVerificationPath; // Allow verify path with token

  const token = request.cookies.get("token")?.value || "";

  // Allow verification path with token parameter regardless of cookie
  if (isVerificationPath) {
    return NextResponse.next();
  }

  // Regular auth flow
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verify", "/profile"],
};
