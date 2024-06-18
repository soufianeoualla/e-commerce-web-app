import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_REDIRECT_LINK,
  adminRoute,
  apiRoutes,
  authRoutes,
  profileRoute,
  publicRoutes,
} from "./routes";
export const { auth } = NextAuth(authConfig);
export default auth(async (req, res) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const isApiRoute = nextUrl.pathname.startsWith(apiRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);
  const isProfileRoute = nextUrl.pathname.startsWith(profileRoute);

  if (isApiRoute) {
    return;
  }

  if (!isLoggedIn) {
    if (isAuthRoute || isPublicRoute) {
      return;
    }
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_REDIRECT_LINK, nextUrl));
  }

  // if (isProfileRoute && !isLoggedIn) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }
  // if (isAdminRoute && !isAdmin) {
  //   return Response.redirect(new URL("/", nextUrl));
  // }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
