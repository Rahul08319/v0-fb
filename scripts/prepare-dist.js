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
    let htmlContent = fs.readFileSync(indexHtml, 'utf-8');
    
    // Inject multi-host compatibility script for GitHub Pages subpath
    const hostAdapterScript = `<script>
(function(){
  try {
    if (window.location.pathname.indexOf('/FBPostForge') === 0 && !document.querySelector('base')) {
      var b = document.createElement('base');
      b.href = '/FBPostForge/';
      document.head.appendChild(b);
    }
  } catch(e) {}
})();
</script>`;
    
    if (htmlContent.includes('<head>') && !htmlContent.includes('hostAdapterScript')) {
      htmlContent = htmlContent.replace('<head>', '<head>' + hostAdapterScript);
    }

    fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.join(distDir, '404.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.join(root, 'index.html'), htmlContent, 'utf-8');
    fs.writeFileSync(path.join(root, '404.html'), htmlContent, 'utf-8');
    console.log('✓ Copied and patched index.html and 404.html');
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

// 4. Create .nojekyll for GitHub Pages
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log('✓ Created .nojekyll in dist and root');

// 5. Create /FBPostForge sub-path mirror for GitHub Pages direct resolution
const ghSubDir = path.join(distDir, 'FBPostForge');
if (!fs.existsSync(ghSubDir)) {
  fs.mkdirSync(ghSubDir, { recursive: true });
}
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(ghSubDir, 'index.html'));
  fs.copyFileSync(path.join(distDir, '404.html'), path.join(ghSubDir, '404.html'));
}
const ghSubNext = path.join(ghSubDir, '_next');
if (fs.existsSync(path.join(distDir, '_next'))) {
  fs.cpSync(path.join(distDir, '_next'), ghSubNext, { recursive: true });
  console.log('✓ Created /FBPostForge mirror in dist/ for GitHub Pages sub-path');
}

// 6. Patch Webpack public path for multi-host dynamic resolution
const chunksDir = path.join(distDir, '_next', 'static', 'chunks');
if (fs.existsSync(chunksDir)) {
  const files = fs.readdirSync(chunksDir);
  for (const file of files) {
    if (file.startsWith('webpack-') && file.endsWith('.js')) {
      const fullPath = path.join(chunksDir, file);
      let content = fs.readFileSync(fullPath, 'utf-8');
      const targetPattern = 'r.p="/_next/"';
      const replacement = 'r.p=(typeof window!=="undefined"&&window.location.pathname.indexOf("/FBPostForge")===0?"/FBPostForge/_next/":"/_next/")';
      if (content.includes(targetPattern)) {
        content = content.replace(targetPattern, replacement);
        fs.writeFileSync(fullPath, content, 'utf-8');
        // Also patch the ghSub copy
        const ghSubWebpack = path.join(ghSubDir, '_next', 'static', 'chunks', file);
        if (fs.existsSync(ghSubWebpack)) {
          fs.writeFileSync(ghSubWebpack, content, 'utf-8');
        }
        console.log(`✓ Patched webpack runtime public path in ${file}`);
      }
    }
  }
}

console.log('✅ Production dist directory prepared successfully.');
