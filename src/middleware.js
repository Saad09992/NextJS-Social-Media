import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  const verifyToken = searchParams.get("token");

  const isPublicProfile = /^\/profile\/[^/]+$/.test(path);

  const isVerificationPath = path === "/verify" && verifyToken;

  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    isVerificationPath ||
    path === "/" ||
    isPublicProfile;

  const token = request.cookies.get("token")?.value || "";

  if (isVerificationPath) {
    return NextResponse.next();
  }

  // if (isPublic && token) {
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }

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
