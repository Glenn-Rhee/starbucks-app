import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./utils/cookies";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const token = getCookie("token");
  if (!url.includes("/auth")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } else {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/api/coffe", "/auth/login", "/auth/signup", "/"],
};
