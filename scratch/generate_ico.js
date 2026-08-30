const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgBuffer = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
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
  <circle cx="256" cy="256" r="232" fill="none" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="16" />
  <!-- Number 20 -->
  <text x="256" y="345" font-family="'Plus Jakarta Sans', sans-serif" font-size="310" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="-10">20</text>
</svg>`);

async function generateFavicons() {
  // 1. Render PNG buffers at various sizes
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();

  // Create simple ICO file header + directory entry wrapping png32
  // ICO Header: 0 0 (2 bytes) | Type 1 (2 bytes) | Count 1 (2 bytes)
  const header = Buffer.from([0, 0, 1, 0, 1, 0]);
  
  // ICO Directory Entry (16 bytes):
  // Width (1B), Height (1B), Colors (1B), Reserved (1B), Planes (2B), BPP (2B), Size (4B), Offset (4B)
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0); // Width
  dirEntry.writeUInt8(32, 1); // Height
  dirEntry.writeUInt8(0, 2);  // Colors
  dirEntry.writeUInt8(0, 3);  // Reserved
  dirEntry.writeUInt16LE(1, 4); // Planes
  dirEntry.writeUInt16LE(32, 6); // BPP
  dirEntry.writeUInt32LE(png32.length, 8); // Size
  dirEntry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

  const icoBuffer = Buffer.concat([header, dirEntry, png32]);

  // Write files to src/app/ and public/
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../src/app/icon.png'), png192);
  fs.writeFileSync(path.join(__dirname, '../public/icon.png'), png192);
  fs.writeFileSync(path.join(__dirname, '../public/apple-icon.png'), png192);
  fs.writeFileSync(path.join(__dirname, '../src/app/apple-icon.png'), png192);

  // Remove any legacy vercel icons in public
  const vercelSvg = path.join(__dirname, '../public/vercel.svg');
  if (fs.existsSync(vercelSvg)) {
    fs.unlinkSync(vercelSvg);
  }

  console.log('Circular ICO and PNG Favicons generated successfully!');
}

generateFavicons().catch(console.error);
