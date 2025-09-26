import { NextRequest, NextResponse } from 'next/server';
import { atlasServerClient } from '@/atlas/server';

export async function GET(request: NextRequest) {
  try {
    // Collect debugging information
    const debugInfo = {
      env: {
        hasAtlasApiKey: !!process.env.ATLAS_API_KEY,
        apiKeyFirstChars: process.env.ATLAS_API_KEY ? 
          `${process.env.ATLAS_API_KEY.substring(0, 4)}...${process.env.ATLAS_API_KEY.slice(-4)}` : 
          'not set',
        nodeEnv: process.env.NODE_ENV,
      },
      request: {
        url: request.url,
        headers: Object.fromEntries(request.headers),
      }
    };

    // Try to make an Atlas API call
    try {
      // Using a test user ID for verification
      const testResult = await atlasServerClient.areFeaturesAllowed('test-user-debug', ['test-feature']);
      return NextResponse.json({
        status: 'ok',
        message: 'Atlas API connection test successful',
        debugInfo,
        testResult,
      });
    } catch (atlasError) {
      console.error('Atlas API test failed:', atlasError);
      return NextResponse.json({
        status: 'error',
        message: 'Atlas API test failed',
        error: String(atlasError),
        errorObject: JSON.stringify(atlasError, Object.getOwnPropertyNames(atlasError)),
        debugInfo,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Debug endpoint error',
      error: String(error),
    }, { status: 500 });
  }
}
