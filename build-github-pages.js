#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building for GitHub Pages...');

try {
  // Build using GitHub Pages specific config
  console.log('📦 Building client application...');
  execSync('npx vite build --config vite.config.github.ts', { stdio: 'inherit' });
  
  // Create a 404.html file for client-side routing support
  console.log('🔧 Creating 404.html for client-side routing...');
  const docsPath = path.resolve('docs');
  const indexPath = path.join(docsPath, 'index.html');
  const notFoundPath = path.join(docsPath, '404.html');
  
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✅ 404.html created for client-side routing');
  }
  
  // Create .nojekyll file to prevent Jekyll processing
  const nojekyllPath = path.join(docsPath, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ .nojekyll file created');
  
  console.log('🎉 GitHub Pages build completed successfully!');
  console.log('📁 Static files are in the docs/ directory');
  console.log('🌐 Ready for GitHub Pages deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}