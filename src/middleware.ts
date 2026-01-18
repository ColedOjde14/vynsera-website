// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/portal(.*)',
  '/admin(.*)',
]);

// Explicitly public Clerk routes (prevents 404 on sign-in/up/sso)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/forgot-password(.*)',
  '/reset-password(.*)',
  '/api(.*)',
  '/_next(.*)',
  '/static(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Await the auth object
  const authObject = await auth();

  // Only protect specific routes
  if (isProtectedRoute(req)) {
    // Use the protect method on the resolved auth object
    authObject.protect({
      redirectUrl: `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
    });
  }

  // Public routes (including Clerk auth) are allowed without protection
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    '/(api|trpc)(.*)',
  ],
};