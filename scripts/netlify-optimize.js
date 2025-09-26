#!/usr/bin/env node

/**
 * This script optimizes the Next.js build for Netlify deployment
 * It runs after the build process to reduce function size
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const nextDir = path.join(process.cwd(), '.next');
const serverDir = path.join(nextDir, 'server');
const functionsDir = path.join(process.cwd(), '.netlify', 'functions-internal');

console.log('🔍 Running Netlify build optimization script...');

// Function to remove unnecessary files from the .next directory
function cleanNextDirectory() {
  console.log('🧹 Cleaning .next directory...');
  
  // Remove unnecessary files/directories
  const dirsToRemove = [
    path.join(nextDir, 'cache'),
    path.join(nextDir, 'trace')
  ];
  
  dirsToRemove.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`   Removing ${path.relative(process.cwd(), dir)}`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
  
  // Remove sourcemaps and other large files
  const filesToRemove = [
    ...findFiles(nextDir, file => file.endsWith('.map')),
    ...findFiles(nextDir, file => file.endsWith('.d.ts'))
  ];
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  });
}

// Helper function to find files matching a condition
function findFiles(startPath, condition) {
  let results = [];
  
  if (!fs.existsSync(startPath)) {
    return results;
  }
  
  const files = fs.readdirSync(startPath);
  for (const file of files) {
    const filename = path.join(startPath, file);
    const stat = fs.lstatSync(filename);
    
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filename, condition));
    } else if (condition(file)) {
      results.push(filename);
    }
  }
  
  return results;
}

// Create a slimmer version of node_modules for Netlify functions
function optimizeNodeModules() {
  console.log('📦 Optimizing node_modules...');
  
  // Check if functions directory exists
  if (!fs.existsSync(functionsDir)) {
    console.log('   Netlify functions directory not found, skipping optimization');
    return;
  }
  
  // Find server function directory
  const serverFunctionDir = fs.readdirSync(functionsDir)
    .find(dir => dir.startsWith('___netlify-server-handler'));
    
  if (!serverFunctionDir) {
    console.log('   Server function not found, skipping optimization');
    return;
  }
  
  const functionPath = path.join(functionsDir, serverFunctionDir);
  const nodeModulesPath = path.join(functionPath, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('   No node_modules found in function, skipping');
    return;
  }
  
  // List of large dependencies that can be safely pruned
  const modulesToPrune = [
    'typescript',
    '@types',
    'eslint',
    'prettier',
    'caniuse-lite/data',
    'esbuild/install.js',
    'core-js/web',
    'core-js/proposals',
    'core-js/modules',
    'core-js/internals',
    '.bin'
  ];
  
  modulesToPrune.forEach(module => {
    const modulePath = path.join(nodeModulesPath, module);
    if (fs.existsSync(modulePath)) {
      console.log(`   Removing ${module} from function node_modules`);
      fs.rmSync(modulePath, { recursive: true, force: true });
    }
  });
  
  // Remove unnecessary files from node_modules
  console.log('   Removing unnecessary files from node_modules');
  const unnecessaryFilePatterns = [
    '.git',
    '.github',
    'test',
    'tests',
    'docs',
    'doc',
    'example',
    'examples',
    '*.md',
    '*.markdown',
    '*.map',
    '*.ts',
    '*.d.ts',
    'LICENSE',
    'license',
    'CHANGELOG',
    'changelog',
    'AUTHORS',
    'contributors',
    '.npmignore',
    '.travis.yml',
    '.eslintrc',
    'tsconfig.json'
  ];
  
  findFiles(nodeModulesPath, file => {
    return unnecessaryFilePatterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(file);
      }
      return file === pattern;
    });
  }).forEach(file => {
    if (fs.existsSync(file) && !fs.lstatSync(file).isDirectory()) {
      fs.unlinkSync(file);
    }
  });
}

// Run optimizations
try {
  cleanNextDirectory();
  optimizeNodeModules();
  console.log('✅ Netlify build optimization complete!');
} catch (error) {
  console.error('❌ Error during optimization:', error);
  process.exit(1);
}
