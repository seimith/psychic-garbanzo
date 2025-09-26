import { atlasServerClient } from "@/atlas/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return atlasServerClient.handleRequest(request, params.slug);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return atlasServerClient.handleRequest(request, params.slug);
}
