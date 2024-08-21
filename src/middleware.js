import { NextResponse } from "next/server";

/**
 * Middleware in Next.js will run before any page is routed to or if any api route is called
 * This makes it a good location to place authentication or any pre-checks, url modification, etc.
 * @param {*} request Next js request object
 * @returns Next response
 */
export function middleware(request) {
  const token = request.cookies.get("authToken");

  if (token) {
    console.log("TOKEN found");
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

/**
 * Middleware will only run for the paths defined in the matcher
 */
export const config = {
  matcher: "/todo-list/:path*",
};
