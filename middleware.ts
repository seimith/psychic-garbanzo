import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/about",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/atlas-api(.*)",
    "/api/atlas-debug(.*)",
    "/api/atlas-health(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\.[^/]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
