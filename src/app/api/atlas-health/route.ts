import { NextResponse } from "next/server";
import { isAtlasConfigured, atlasServerClient } from "@/atlas/server";

export async function GET() {
  try {
    // Check if Atlas API key is configured
    if (!process.env.ATLAS_API_KEY) {
      return NextResponse.json({
        status: "error",
        configured: false,
        message: "ATLAS_API_KEY is not set in environment variables",
        suggestions: [
          "Add ATLAS_API_KEY to your .env.local file",
          "Make sure the API key is valid and has correct permissions",
          "Check if the environment variables are loaded properly"
        ]
      }, { status: 500 });
    }

    // Test Atlas API connection
    const isConfigured = await isAtlasConfigured();
    
    if (!isConfigured) {
      return NextResponse.json({
        status: "error",
        configured: false,
        message: "Atlas API connection test failed",
        suggestions: [
          "Verify your Atlas API key",
          "Check if the Atlas service is available",
          "Ensure your network connection is working"
        ]
      }, { status: 500 });
    }

    // Return success response
    return NextResponse.json({
      status: "ok",
      configured: true,
      message: "Atlas integration is properly configured",
    });
  } catch (error) {
    console.error("Error in Atlas health check:", error);
    return NextResponse.json({
      status: "error",
      configured: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
      error: String(error)
    }, { status: 500 });
  }
}
