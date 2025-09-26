// Simple script to check environment variables
require('dotenv').config({ path: '.env.local' });

console.log('Checking Atlas API key:');
if (process.env.ATLAS_API_KEY) {
  const apiKey = process.env.ATLAS_API_KEY;
  console.log(`✓ Atlas API key is set (${apiKey.substring(0, 3)}...${apiKey.slice(-3)})`);
} else {
  console.log('✗ ATLAS_API_KEY is not set in .env.local file');
}

console.log('\nAll environment variables:');
Object.keys(process.env)
  .filter(key => !key.startsWith('npm_') && key !== 'ATLAS_API_KEY')
  .forEach(key => {
    console.log(`- ${key}: ${process.env[key]}`);
  });
