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
   ```

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
│   │   ├── about/      # About page
│   │   ├── dashboard/  # User dashboard
│   │   ├── login/      # Login page
│   │   ├── pricing/    # Pricing plans page
│   │   ├── profile/    # User profile page
│   │   └── register/   # Registration page
│   ├── components/     # Reusable React components
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

## 🔮 Future Enhancements

- Implement a real news API integration
- Add a dad jokes API
- Create a mobile application
- Implement social sharing features
- Add dark mode support

## 📄 License

This project is licensed under the MIT License.
