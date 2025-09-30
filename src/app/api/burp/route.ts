import { atlasServerClient } from '@/atlas/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Burp API called');
    
    // Get userId from request body (sent from client)
    let body;
    try {
      const text = await request.text();
      console.log('Request body text:', text);
      body = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json({ 
        error: 'Invalid request body', 
        details: parseError instanceof Error ? parseError.message : String(parseError) 
      }, { status: 400 });
    }
    
    const userId = body.userId;
    console.log('Extracted userId:', userId);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - no user ID provided' }, { status: 401 });
    }

    return await processRequest(userId);
  } catch (err) {
    console.error('Error in burp API:', err);
    return NextResponse.json(
      { error: 'Failed to record usage', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

async function processRequest(userId: string) {
  console.log('Processing burp request for userId:', userId);

  // For usage-based features, we just report the event to Atlas
  // Atlas will track the usage and bill accordingly
  console.log('Enqueueing burp event');
  await atlasServerClient.enqueueFeatureEvents({
    featureIds: ['burp-blaster'],
    customerId: userId,
  });

  // Flush events immediately (important for serverless)
  console.log('Flushing events');
  await atlasServerClient.flushEvents();
  console.log('Events flushed successfully');

  return NextResponse.json({ 
    success: true, 
    message: '🎤 Burp blaster activated!' 
  });
}
