import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.NODE_ENV === "production" && request.nextUrl.protocol === "http:") {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };
