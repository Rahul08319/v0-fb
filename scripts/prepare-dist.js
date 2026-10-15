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

// 1. Handle index.html and 404.html
// Check if Next.js static export already generated dist/index.html
const distIndexHtml = path.join(distDir, 'index.html');
const appServerDir = path.join(nextDir, 'server', 'app');
const serverIndexHtml = path.join(appServerDir, 'index.html');

let htmlContent = '';
if (fs.existsSync(distIndexHtml)) {
  htmlContent = fs.readFileSync(distIndexHtml, 'utf-8');
  console.log('✓ Found exported dist/index.html');
} else if (fs.existsSync(serverIndexHtml)) {
  htmlContent = fs.readFileSync(serverIndexHtml, 'utf-8');
  fs.writeFileSync(distIndexHtml, htmlContent, 'utf-8');
  console.log('✓ Copied prerendered index.html to dist/index.html');
}

if (htmlContent) {
  // Ensure 404.html is identical to index.html for SPA fallback routing
  fs.writeFileSync(path.join(distDir, '404.html'), htmlContent, 'utf-8');
  fs.writeFileSync(path.join(root, 'index.html'), htmlContent, 'utf-8');
  fs.writeFileSync(path.join(root, '404.html'), htmlContent, 'utf-8');
  console.log('✓ Synchronized root and dist index.html and 404.html');
}

// 2. Copy static assets (_next/static) if needed
const nextStatic = path.join(nextDir, 'static');
const distNextStatic = path.join(distDir, '_next', 'static');
if (fs.existsSync(nextStatic) && !fs.existsSync(distNextStatic)) {
  fs.mkdirSync(distNextStatic, { recursive: true });
  fs.cpSync(nextStatic, distNextStatic, { recursive: true });
  console.log('✓ Copied .next/static to dist/_next/static');
}

// 3. Copy public files
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log('✓ Copied public assets to dist/');
}

// 4. Create .nojekyll for GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log('✓ Created .nojekyll in dist and root');

// 5. Create /FBPostForge sub-path mirror in dist/ for GitHub Pages direct resolution
const ghSubDir = path.join(distDir, 'FBPostForge');
if (!fs.existsSync(ghSubDir)) {
  fs.mkdirSync(ghSubDir, { recursive: true });
}
if (htmlContent) {
  fs.writeFileSync(path.join(ghSubDir, 'index.html'), htmlContent, 'utf-8');
  fs.writeFileSync(path.join(ghSubDir, '404.html'), htmlContent, 'utf-8');
}
const ghSubNext = path.join(ghSubDir, '_next');
if (fs.existsSync(path.join(distDir, '_next'))) {
  fs.cpSync(path.join(distDir, '_next'), ghSubNext, { recursive: true });
  console.log('✓ Created /FBPostForge mirror in dist/ for GitHub Pages sub-path');
}

console.log('✅ Production dist directory prepared successfully.');
