import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/post", "/user"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    const url = new URL("/Account/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/post", "/user", "/community/:path*"],
};
