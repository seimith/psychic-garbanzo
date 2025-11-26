# Dadlines - News with a Dad Joke Twist

Dadlines is a Next.js application that presents news in a fun and entertaining way - with dad jokes! Stay informed and amused at the same time.

## 🌐 Live Demo

Visit [https://dadlines.netlify.app](https://dadlines.netlify.app) to see the application in action.

## 📋 Features

- **Marketing Landing Page**: Engaging hero section showcasing the app's value proposition
- **Pricing Plans**: Three subscription tiers (Free, Pro, and Enterprise)
- **User Authentication**: Secure login and registration system
- **Dashboard**: Personalized news feed with dad jokes
- **User Profile**: Customizable user settings and preferences
- **Responsive Design**: Optimized for all devices from mobile to desktop

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.x with TypeScript and Tailwind CSS
- **Authentication**: NextAuth.js for secure user authentication
- **Subscription Management**: Atlas for pricing, billing, and feature access control
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Netlify for hosting and continuous deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seimith/psychic-garbanzo.git
   cd psychic-garbanzo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-secret-key
   ATLAS_API_KEY=your-atlas-api-key
   
   # For local Atlas development (optional)
   ATLAS_BASE_URL=http://localhost:8080
   NEXT_PUBLIC_ATLAS_BASE_URL=http://localhost:8080
   ```
   
   **Production:** Obtain an Atlas API key by signing up at [RunOnAtlas](https://app.runonatlas.com/).
   
   **Local Development:** If you're running a local Atlas instance, set the `ATLAS_BASE_URL` environment variables to point to your local API (typically `http://localhost:8080`).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## 🏗️ Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js pages and API routes
│   │   ├── api/        # API endpoints including NextAuth configuration
│   │   │   ├── auth/   # NextAuth authentication endpoints
│   │   │   ├── atlas-api/ # Atlas API routes
│   │   │   └── premium-news/ # Protected API with Atlas feature checks
│   │   ├── about/      # About page
│   │   ├── dashboard/  # User dashboard with premium features
│   │   ├── login/      # Login page
│   │   ├── pricing/    # Basic pricing plans page
│   │   ├── profile/    # User profile page
│   │   ├── register/   # Registration page
│   │   └── subscription/ # Atlas subscription pages
│   │       ├── pricing/ # Atlas pricing component
│   │       └── customer-portal/ # Atlas customer portal
│   ├── atlas/          # Atlas configuration
│   │   ├── client.tsx  # Atlas client provider
│   │   ├── server.ts   # Atlas server client
│   │   └── proxy-setup.ts # Fetch proxy for local Atlas development
│   ├── components/     # Reusable React components
│   │   ├── atlas/      # Atlas-related components
│   │   ├── layout/     # Layout components (Header, Layout)
│   │   ├── ui/         # UI components
│   │   └── auth/       # Authentication-related components
│   └── lib/            # Utility functions and helpers
└── next.config.ts      # Next.js configuration
```

## 📝 Development

### Local Development

Run the development server:

```bash
npm run dev
```

### Local Atlas Development

This project supports connecting to a local Atlas instance for development and testing:

1. **Setup**: The project uses internal Atlas SDK packages (`@runonatlas/next@internal` and `@runonatlas/react@internal`) that support local development.

2. **Fetch Proxy**: The `src/atlas/proxy-setup.ts` file intercepts all Atlas API calls and redirects them from the production URL (`https://platform.runonatlas.com`) to your local instance.

3. **Configuration**: Set the following environment variables in `.env.local`:
   ```bash
   ATLAS_BASE_URL=http://localhost:8080
   NEXT_PUBLIC_ATLAS_BASE_URL=http://localhost:8080
   ```

4. **Port Configuration**: 
   - Port `8000`: Atlas frontend UI
   - Port `8080`: Atlas backend API (this is what the SDK connects to)

5. **How it works**: When the app starts, the fetch proxy automatically redirects all Atlas API requests to your local instance, allowing you to test subscription features, pricing models, and feature gates locally.

### Building for Production

```bash
npm run build
```

## 🚢 Deployment

The project is set up for continuous deployment with Netlify. Any changes pushed to the `main` branch of the repository will automatically trigger a new build and deployment.

### Manual Deployment

```bash
npm run build
npm install -g netlify-cli
npm netlify deploy --prod
```

## 💰 Subscription System

Dadlines uses Atlas to manage subscriptions and protect premium features:

### Client-side Feature Protection

Protect premium UI features using the `FeatureProtection` component:

```tsx
<FeatureProtection features={["name-of-feature-id-slug"]}>
  <PremiumFeatureComponent />
</FeatureProtection>
```

### Server-side Feature Protection

Protect API endpoints and backend resources:

```typescript
const { ok } = await atlasServerClient.areFeaturesAllowed(userId, ["premium-content"]);
if (!ok) {
  return NextResponse.json({ error: "Premium subscription required" }, { status: 403 });
}
```

### Subscription Management

Users can manage their subscriptions through:

- `/subscription/pricing` - View and purchase subscription plans
- `/subscription/customer-portal` - Manage existing subscriptions

## 🔮 Future Enhancements

- Implement a real news API integration
- Add a dad jokes API
- Create a mobile application
- Implement social sharing features
- Add dark mode support

## 📄 License

This project is licensed under the MIT License.
