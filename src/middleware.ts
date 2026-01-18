import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/portal(.*)',
  '/admin(.*)',
]);

// Explicitly public Clerk routes (required for sign-in/up to work)
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
  // Await auth() first
  const { protect } = await auth();

  // Only protect specific routes
  if (isProtectedRoute(req)) {
    protect({
      redirectUrl: `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
    });
  }
  // All other routes (including public Clerk ones) are allowed without auth
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    '/(api|trpc)(.*)',
  ],
};