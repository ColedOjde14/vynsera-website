// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/portal(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // Protect only the routes we actually want
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Everything except static files, images, favicon, etc.
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    '/(api|trpc)(.*)',
  ],
};