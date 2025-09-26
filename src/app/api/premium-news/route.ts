import { NextRequest, NextResponse } from 'next/server';
import { atlasServerClient } from '@/atlas/server';
import { getServerSession } from 'next-auth';

// Sample premium news data
const premiumNewsData = [
  {
    id: 'p1',
    title: 'Exclusive: Technology Breakthrough in Renewable Energy',
    summary: 'Scientists have developed a new solar panel technology that increases efficiency by 40%',
    category: 'Technology',
    date: '2023-07-01',
    joke: 'I told my wife she should embrace her mistakes. She gave me a hug.',
    premium: true
  },
  {
    id: 'p2',
    title: 'Market Analysis: The Future of Cryptocurrency',
    summary: 'Expert analysts predict major shifts in the cryptocurrency landscape over the next five years',
    category: 'Finance',
    date: '2023-06-28',
    joke: "Why don't scientists trust atoms? Because they make up everything, just like crypto experts!",
    premium: true
  },
  {
    id: 'p3',
    title: 'Health Study: New Diet Revolution',
    summary: 'Comprehensive 10-year study reveals surprising results about Mediterranean diet benefits',
    category: 'Health',
    date: '2023-06-25',
    joke: "I'm on a seafood diet. Every time I see food, I eat it!",
    premium: true
  },
];

export async function GET(request: NextRequest) {
  try {
    // Get the current user from the session
    const session = await getServerSession();
    const userId = session?.user?.email;

    // If user is not authenticated, return unauthorized
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    // Check if user has access to the 'premium-content' feature using Atlas
    const { ok } = await atlasServerClient.areFeaturesAllowed(userId, [
      'premium-content',
    ]);

    // If user doesn't have access to premium content, return forbidden
    if (!ok) {
      return NextResponse.json(
        { 
          error: 'Premium subscription required',
          upgradeUrl: '/subscription/pricing'
        }, 
        { status: 403 }
      );
    }

    // Record feature usage with Atlas
    try {
      await atlasServerClient.enqueueFeatureEvents({
        featureIds: ['premium-content'],
        customerId: userId,
      });
      // Make sure events are sent immediately
      await atlasServerClient.flushEvents();
    } catch (err) {
      console.error('Failed to record feature usage:', err);
      // Continue serving the content even if tracking fails
    }

    // Return premium news data
    return NextResponse.json({
      success: true,
      data: premiumNewsData
    });
    
  } catch (error) {
    console.error('Error in premium news API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
