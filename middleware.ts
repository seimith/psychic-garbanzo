import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public routes that don't require authentication
  const isPublicRoute = (
    path === '/' || 
    path === '/pricing' || 
    path === '/about' || 
    path.startsWith('/sign-in') || 
    path.startsWith('/sign-up') || 
    path.startsWith('/api/atlas-api')
  );

  // Get Clerk user token from cookie or header
  const clerkToken = request.cookies.get('__session')?.value;
  
  // If it's not a public route and the user is not authenticated
  if (!isPublicRoute && !clerkToken) {
    // Redirect to sign-in page
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
