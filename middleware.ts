import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is accessing admin routes
  if (pathname.startsWith("/admin")) {
    // Check for the auth session cookie (this is set by Auth.js)
    const sessionCookie =
      request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token");

    if (!sessionCookie && pathname !== "/admin/login") {
      // Redirect to login if no session and not already on login page
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (sessionCookie && pathname === "/admin/login") {
      // Redirect to admin dashboard if authenticated and trying to access login
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
