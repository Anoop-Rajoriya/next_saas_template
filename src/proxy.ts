import {
  createRouteMatcher,
  clerkClient,
  clerkMiddleware,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = createRouteMatcher([
  "/",
  "sign-up",
  "sign-in",
  "api/webhook/register",
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId } = await auth();

  // prevent access protected routes for unauthenticated users
  if (!userId && !publicRoutes(request)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (userId) {
    try {
      //
      const user = (await clerkClient()).users.getUser(userId);
      const role = (await user).publicMetadata.role as string | undefined;

      // prevent access public routes for authenticated users
      if (publicRoutes(request)) {
        return NextResponse.redirect(
          new URL(
            role === "admin" ? "/admin/dashboard" : "/dashboard",
            request.url
          )
        );
      }

      // prevent access user routes for admin
      if (role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // prevent access admin routes for users
      if (role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
