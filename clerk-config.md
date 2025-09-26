# Clerk Authentication Configuration

To use Clerk authentication in your Dadlines project, you need to set the following environment variables:

```bash
# Add to your .env.local file

# Get these from your Clerk Dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Your frontend URL for Clerk auth (in development)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Getting Your Clerk API Keys

1. Create an account on [Clerk](https://clerk.dev/)
2. Create a new application in the Clerk Dashboard
3. Navigate to API Keys in your application settings
4. Copy the Publishable Key and Secret Key
5. Add these keys to your `.env.local` file

## Environment Variables for Different Environments

### Development
```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_development_publishable_key
CLERK_SECRET_KEY=your_development_secret_key
```

### Production (Netlify)
Add the following environment variables in your Netlify project settings:
- Name: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Value: Your production Clerk publishable key
- Name: `CLERK_SECRET_KEY`
- Value: Your production Clerk secret key

## Authentication Flow with Atlas

Dadlines integrates both Clerk for authentication and Atlas for subscription management:

1. Users sign in through Clerk's authentication system
2. Once authenticated, the user's Clerk ID is passed to Atlas to manage their subscription status
3. Atlas determines which features the user has access to based on their subscription plan
4. Protected routes and features check the user's authentication status with Clerk and their subscription status with Atlas

## Testing Your Authentication

You can test the authentication by:

1. Running your development server
2. Navigating to `/sign-up` to create a new account
3. After signing up, you'll be redirected to the dashboard
4. Access protected features to ensure the Atlas integration is working correctly
