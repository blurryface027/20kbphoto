const fs = require('fs');
const path = require('path');

// Circular Vector SVG Favicon with "20" in Plus Jakarta Sans
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&amp;display=swap');
      text {
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 900;
      }
    </style>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B2CC1" />
      <stop offset="100%" stop-color="#0F1B80" />
    </linearGradient>
  </defs>
  <!-- Circular Background -->
  <circle cx="256" cy="256" r="256" fill="url(#favGrad)" />
  <!-- Subtle inner ring accent -->
  <circle cx="256" cy="256" r="232" fill="none" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="16" />
  <!-- Number 20 -->
  <text x="256" y="340" font-family="'Plus Jakarta Sans', sans-serif" font-size="300" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="-8">20</text>
</svg>`;

// Write to public/favicon.svg, public/icon.svg, src/app/icon.svg, src/app/favicon.svg
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svgContent);
fs.writeFileSync(path.join(__dirname, '../src/app/favicon.svg'), svgContent);

console.log('Circular SVG Favicons written successfully with Plus Jakarta Sans');
