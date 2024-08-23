import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRECT_KEY = process.env.SECRECT_KEY;

/**
 * Middleware in Next.js will run before any page is routed to or if any api route is called
 * This makes it a good location to place authentication or any pre-checks, url modification, etc.
 * @param {*} request Next js request object
 * @returns Next response
 */
export function middleware(request) {
  const token = request.cookies.get("authToken");

  /**
   * JWT verify callback is async function, we need to wait for it to finish
   * therefore default fallback is placed in the else condition
   * If placed outside of if, it will be run before jwt verify callback gets a chance to finish
   */
  if (token) {
    jwt.verify(token, SECRECT_KEY, (err, _) => {
      if (err) return NextResponse.redirect(new URL("/signin", request.url));
      return NextResponse.next();
    });
  } else {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

/**
 * Middleware will only run for the paths defined in the matcher
 */
export const config = {
  matcher: "/todo-list/:path*",
};
