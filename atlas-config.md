# Atlas Configuration

To use Atlas in your Dadlines project, you need to set the following environment variables:

```bash
# Add to your .env.local file
ATLAS_API_KEY="your_atlas_api_key_here"
```

## Getting Your Atlas API Key

1. Create an account on [RunOnAtlas](https://app.runonatlas.com/)
2. Go to Settings > API Keys
3. Create a new API key with appropriate permissions
4. Add the API key to your `.env.local` file

## Environment Variables for Different Environments

### Development
```bash
# .env.local
ATLAS_API_KEY="your_development_key"
```

### Production (Netlify)
Add the following environment variable in your Netlify project settings:
- Name: `ATLAS_API_KEY`
- Value: Your production Atlas API key
