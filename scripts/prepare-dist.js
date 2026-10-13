const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const nextDir = path.join(root, '.next');
const publicDir = path.join(root, 'public');

console.log('🚀 Preparing production dist directory fallback...');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Copy prerendered HTML files
const appServerDir = path.join(nextDir, 'server', 'app');
if (fs.existsSync(appServerDir)) {
  const indexHtml = path.join(appServerDir, 'index.html');
  if (fs.existsSync(indexHtml)) {
    fs.copyFileSync(indexHtml, path.join(distDir, 'index.html'));
    console.log('✓ Copied prerendered index.html to dist/index.html');
  }
}

// 2. Copy static assets (_next/static)
const nextStatic = path.join(nextDir, 'static');
const distNextStatic = path.join(distDir, '_next', 'static');
if (fs.existsSync(nextStatic)) {
  fs.mkdirSync(distNextStatic, { recursive: true });
  fs.cpSync(nextStatic, distNextStatic, { recursive: true });
  console.log('✓ Copied .next/static to dist/_next/static');
}

// 3. Copy public files
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log('✓ Copied public assets to dist/');
}

// 4. Synchronize root index.html for static/Vite pre-flight checks
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(root, 'index.html'));
  console.log('✓ Synchronized root index.html for hosting pre-flight checks');
}

console.log('✅ Production dist directory prepared successfully.');
