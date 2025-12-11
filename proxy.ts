import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoutes = createRouteMatcher([
  "/",
  "/sign-up",
  "/sign-in",
  "/recovery",
  "/api/public(.*)",
]);

const isUserRoutes = createRouteMatcher(["/user(.*)"]);
const isAdminRoutes = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async function (auth, req) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const isAuthenticated = userId ? true : false;
  const role = sessionClaims?.metadata?.role;
  if (!isAuthenticated && !isPublicRoutes(req)) {
    // block accessing protected routes for unauthonticated users
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  if (isAuthenticated) {
    if (isPublicRoutes(req)) {
      // block accessing public routes for authenticated users
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        return NextResponse.redirect(new URL("/user", req.url));
      }
    }

    if (isUserRoutes(req) && role === "admin") {
      // block user routes for admins
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (isAdminRoutes(req) && role !== "admin") {
      // block admin routes for users
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
