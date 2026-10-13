#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('⚡ FBPostForge: Vite compatibility bridge triggered by Vercel preset.');
try {
  execSync('npx next build && node scripts/prepare-dist.js', { stdio: 'inherit' });
  console.log('✅ Next.js build & dist packaging completed via compatibility bridge.');
} catch (error) {
  console.error('❌ Build bridge failed:', error);
  process.exit(1);
}
