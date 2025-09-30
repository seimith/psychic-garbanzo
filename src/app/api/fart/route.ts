import { atlasServerClient, incrementFartUsage } from '@/atlas/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Fart API called');
    
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
    console.error('Error in fart API:', err);
    return NextResponse.json(
      { error: 'Failed to record usage', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

async function processRequest(userId: string) {
  console.log('Processing fart request for userId:', userId);

  // Increment the usage count in our store
  incrementFartUsage(userId);

  // Report the usage event to Atlas
  console.log('Enqueueing feature event');
  await atlasServerClient.enqueueFeatureEvents({
    featureIds: ['fart-fury'],
    customerId: userId,
  });

  // Flush events immediately (important for serverless)
  console.log('Flushing events');
  await atlasServerClient.flushEvents();
  console.log('Events flushed successfully');

  return NextResponse.json({ 
    success: true, 
    message: '💨 Fart fury activated!' 
  });
}
