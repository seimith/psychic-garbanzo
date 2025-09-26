// Edge function for Next.js on Netlify
import type { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  // Get the URL from the request
  const url = new URL(request.url);
  
  // Skip static assets and API routes (they're handled by regular functions)
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/)
  ) {
    return;
  }
  
  // Forward authenticated session cookies
  const headers = new Headers();
  const cookies = request.headers.get("cookie");
  if (cookies) {
    headers.set("cookie", cookies);
  }
  
  // Add any additional headers
  headers.set("x-netlify-edge", "true");
  
  // Let Next.js handle the request
  return;
};

// Configure Edge Function
export const config = {
  // Paths this Edge Function will be invoked on
  path: "/*",
  // Exclude paths (static assets, etc)
  excludedPath: [
    "/_next/*",
    "/api/*",
    "/*.{jpg,png,gif,svg,ico}",
    "/favicon.ico"
  ]
};
