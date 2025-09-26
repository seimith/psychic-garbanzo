import { atlasServerClient } from "@/atlas/server";
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
    // Just pass the request and slug to Atlas
    // The headers are already included in the request
    // The middleware handles authentication
    const slug = await getSlug(context.params);
    return atlasServerClient.handleRequest(request, slug);
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
