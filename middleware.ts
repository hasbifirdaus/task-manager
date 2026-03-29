import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isPublicApi =
    (pathname === "/api/users" && req.method === "POST") ||
    pathname === "/api/users/login" || // Login
    (pathname.startsWith("/api/tasks") && req.method === "GET");

  const isPublicPage = pathname === "/login" || pathname === "/register";

  if (isPublicApi || isPublicPage) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/api/:path*"],
};
