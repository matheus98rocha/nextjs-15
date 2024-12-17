import type { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authenticatedRoutes } from "./routes/authenticated";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Check for session token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Private Routes
  const isAuthenticatedRoute = authenticatedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (token === null && isAuthenticatedRoute) {
    return Response.redirect(new URL("/login", request.url));
  }

  // Verify if the reqeust rout is login and user is authenticated
  if (token !== null && request.nextUrl.pathname === "/login") {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
