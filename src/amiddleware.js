import { NextResponse } from "next/server";
import { useSelector } from "react-redux";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  const isPublicProfile = /^\/profile\/[^/]+$/.test(path);

  const isVerificationPath = path === "/verify" && verifyToken;

  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    isVerificationPath ||
    path === "/" ||
    isPublicProfile;

  if (isVerificationPath) {
    return NextResponse.next();
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (path === "/profile" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verify", "/profile", "/profile/:path*"],
};
