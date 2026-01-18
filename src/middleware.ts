import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/portal(.*)',
  '/admin(.*)',
]);

// Explicitly public routes — Clerk auth + static + API
const isPublicRoute = createRouteMatcher([
  '/',                        // Home page
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/sso-callback(.*)',
  '/forgot-password(.*)',     // Optional: if you use password reset
  '/reset-password(.*)',      // Optional: if you use password reset
  '/api(.*)',                 // All API routes (contact, tickets, service-request, etc.)
  '/_next(.*)',               // Next.js internals
  '/static(.*)',              // Static assets
]);

export default clerkMiddleware((auth, req) => {
  // Only protect specific routes
  if (isProtectedRoute(req)) {
    // Optional: redirect unauthenticated users to sign-in with original URL preserved
    auth().protect({
      redirectUrl: `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
    });
  }
  // All other routes (including public Clerk ones) are allowed without auth
});

export const config = {
  matcher: [
    // Run middleware on almost everything
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    '/(api|trpc)(.*)',
  ],
};