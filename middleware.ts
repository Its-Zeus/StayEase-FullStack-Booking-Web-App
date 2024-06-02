import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/property/(.*)",
  "/api/(.*)",
  "/sign-in",
  "/sign-up",
])

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req))
    auth().protect({
      unauthenticatedUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/sign-in`,
    })
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
