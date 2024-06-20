import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_REDIRECT_LINK,
  adminRoute,
  apiRoutes,
  authRoutes,
  protectedRoutes,
  publicRoutes,
} from "./routes";
export const { auth } = NextAuth(authConfig);
export default auth(async (req, res) => {
  const isLoggedIn = !!req.auth;
  const { pathname, origin } = req.nextUrl;
  const isAdmin = req.auth?.user?.role === "admin";
  const isApiRoute = pathname.startsWith(apiRoutes);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith(adminRoute);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isApiRoute) {
    return;
  }

  if (!isLoggedIn) {
    if (isAuthRoute || isPublicRoute) {
      return;
    }
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_LINK, origin));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", origin));
  }
  // if (isAdminRoute && !isAdmin) {
  //   return Response.redirect(new URL("/", origin));
  // }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
