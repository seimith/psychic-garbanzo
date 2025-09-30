import { atlasServerClient, setCurrentUserId } from "@/atlas/server";
import { NextRequest, NextResponse } from "next/server";

// Safely extract slug from params
async function getSlug(params: Promise<any>): Promise<string[]> {
  try {
    const resolvedParams = await params;
    if (!resolvedParams?.slug) return [];
    
    const slug = await resolvedParams.slug;
    return Array.isArray(slug) ? slug : [slug];
  } catch (error) {
    console.error('Error extracting slug:', error);
    return [];
  }
}

// GET handler
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  try {
    // Extract userId from Atlas client headers (sent by AtlasProvider)
    const userId = request.headers.get('atlas-user-id') || request.headers.get('x-user-id');
    
    // Store it in context for the limit callback
    if (userId) {
      setCurrentUserId(userId);
    }
    
    const slug = await getSlug(context.params);
    console.log('[ATLAS API] GET request, slug:', slug, 'userId:', userId);
    const response = await atlasServerClient.handleRequest(request, slug);
    
    // Log the response for debugging ONLY for features endpoint
    if (slug.includes('features') && !slug.includes('register')) {
      const clonedResponse = response.clone();
      const responseText = await clonedResponse.text();
      
      // Parse and log just the fart-fury feature
      try {
        const data = JSON.parse(responseText);
        if (data.features) {
          const fartFeature = data.features.find((f: any) => f.id === 'fart-fury');
          console.log('[ATLAS API FEATURES] Fart Fury feature from API:', JSON.stringify(fartFeature, null, 2));
        }
      } catch (e) {
        console.error('[ATLAS API] Parse error:', e);
      }
    }
    
    return response;
  } catch (error) {
    console.error('Atlas API GET error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// POST handler
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  try {
    // Just pass the request and slug to Atlas
    // The headers are already included in the request
    // The middleware handles authentication
    const slug = await getSlug(context.params);
    return atlasServerClient.handleRequest(request, slug);
  } catch (error) {
    console.error('Atlas API POST error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
