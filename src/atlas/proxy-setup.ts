// Monkey-patch fetch to redirect Atlas API calls to local instance
// This is a workaround for local development when using the public Atlas SDK

const ATLAS_PRODUCTION_HOST = 'https://platform.runonatlas.com';
const ATLAS_LOCAL_HOST = process.env.ATLAS_BASE_URL || 'http://localhost:8080';

if (typeof globalThis.fetch !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalFetch = globalThis.fetch;
  
  globalThis.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    // Convert input to string URL
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    
    // If this is an Atlas API call, redirect to local instance
    if (url.startsWith(ATLAS_PRODUCTION_HOST)) {
      const newUrl = url.replace(ATLAS_PRODUCTION_HOST, ATLAS_LOCAL_HOST);
      console.log(`[ATLAS PROXY] Redirecting: ${url} -> ${newUrl}`);
      
      // Create new Request with modified URL
      if (typeof input === 'string') {
        return originalFetch(newUrl, init);
      } else if (input instanceof URL) {
        return originalFetch(new URL(newUrl), init);
      } else {
        const newRequest = new Request(newUrl, input);
        return originalFetch(newRequest, init);
      }
    }
    
    // Pass through all other requests
    return originalFetch(input, init);
  } as typeof fetch;
  
  console.log(`[ATLAS PROXY] Fetch interceptor installed. Redirecting ${ATLAS_PRODUCTION_HOST} -> ${ATLAS_LOCAL_HOST}`);
}
