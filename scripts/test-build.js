#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Clean previous builds
console.log('Cleaning previous builds...');
try { fs.rmSync('./.next', { recursive: true, force: true }); } catch (e) {}

// Run the build
console.log('Running build...');
try {
  execSync('npm run build:netlify', { stdio: 'inherit' });
  console.log('\n✅ Build successful! Safe to push.');
} catch (error) {
  console.error('\n❌ Build failed! Fix errors before pushing.');
  process.exit(1);
}
