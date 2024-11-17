import { auth } from "firebase-admin";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // Return to /login if no session exists
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate session
  try {
    const decodedToken = await auth().verifySessionCookie(session.value);
    const { role } = decodedToken;

    // Check role-based access
    if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/nav/:path*",
    "/admin/:path*",
    "/settings/:path*",
    // Add other protected routes
  ],
};
