const fs = require('fs');
const path = require('path');

// 1. Vector SVG Favicon with "20"
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B2CC1" />
      <stop offset="100%" stop-color="#0F1B80" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="128" fill="url(#favGrad)" />
  <!-- Photo frame subtle outline accent -->
  <rect x="36" y="36" width="440" height="440" rx="96" fill="none" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="16" />
  <!-- Number 20 -->
  <text x="256" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="300" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="-8">20</text>
</svg>`;

// Write to public/favicon.svg, public/icon.svg, src/app/icon.svg, src/app/favicon.svg
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../src/app/favicon.svg'), svgContent);

console.log('SVG Favicons written successfully');
