import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_REDIRECT_LINK,
  apiRoutes,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";

// Initialize NextAuth with the provided configuration
export const { auth } = NextAuth(authConfig);

// Middleware function for handling routing based on authentication and roles
export default auth(async (req, res) => {
  const isLoggedIn = !!req.auth;
  const { pathname, origin } = req.nextUrl;
  const isApiRoute = pathname.startsWith(apiRoutes);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  // Allow API routes without any redirection
  if (isApiRoute) {
    return;
  }

  // If the user is not logged in
  if (!isLoggedIn && (isAuthRoute || isPublicRoute)) {
    return;
  }

  // If the user is logged in and trying to access an auth route, redirect to the default link
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_LINK, origin));
  }

  // If the route is protected and the user is not logged in, redirect to the login page
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", origin));
  }

  // Default behavior for all other cases
  return;
});

// Configuration for route matching
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
