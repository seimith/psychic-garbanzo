// Type definitions for Netlify Edge Functions
declare module "netlify:edge" {
  export interface Context {
    request: Request;
    url: URL;
    cookies: {
      get: (name: string) => { value: string } | undefined;
      set: (name: string, value: string, options?: any) => void;
      delete: (name: string) => void;
    };
    ip: string;
    geo: {
      city?: string;
      country?: {
        code?: string;
        name?: string;
      };
      subdivision?: {
        code?: string;
        name?: string;
      };
      timezone?: string;
      latitude?: number;
      longitude?: number;
    };
    next: () => Promise<Response>;
    rewrite: (url: string) => Promise<Response>;
    json: (body: any, init?: ResponseInit) => Response;
    env: Record<string, string>;
  }
}
