import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_REDIRECT_LINK,
  adminRoute,
  apiAuthRoutes,
  authRoutes,
  profileRoute,
  publicRoutes,
} from "./routes";
export const { auth } = NextAuth(authConfig);
export default auth(async (req, res) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoute);
  const isProfileRoute = nextUrl.pathname.startsWith(profileRoute);

  // if (isApiRoute) {
  //   return;
  // }

  // if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }

  // if (isAuthRoute && isLoggedIn) {
  //   return Response.redirect(new URL(DEFAULT_REDIRECT_LINK, nextUrl));
  // }

  // // if (isAdminRoute && !isAdmin) {
  // //   return Response.redirect(new URL("/", nextUrl));
  // // }

  // if (isProfileRoute && !isLoggedIn) {
  //   return Response.redirect(new URL("/auth/login", nextUrl));
  // }

  // return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
