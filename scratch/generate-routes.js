const fs = require('fs');
const path = require('path');

const kbs = [10, 20, 30, 40, 50, 60, 70, 100, 150, 200, 300, 500];

kbs.forEach(kb => {
  const dir = path.join(__dirname, '..', 'src', 'app', `resize-image-to-${kb}kb`);
  fs.mkdirSync(dir, { recursive: true });
  const content = `import type { Metadata } from "next";
import KBToolClient from "@/components/tools/KBToolClient";

export const metadata: Metadata = {
  title: "Resize Image to ${kb}KB Online Free | 20KB Photo",
  description: "Compress and resize any photo or signature image to exactly ${kb}KB or less for online exam applications and government recruitment forms.",
  alternates: {
    canonical: "https://20kbphoto.in/resize-image-to-${kb}kb",
  },
};

export default function ResizeImageTo${kb}KBPage() {
  return <KBToolClient targetKB={${kb}} />;
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

const sigDims = ['140x60', '200x80', '240x80', '275x118', '300x80', '350x150'];

sigDims.forEach(dims => {
  const [w, h] = dims.split('x');
  const dir = path.join(__dirname, '..', 'src', 'app', `signature-resizer-${dims}`);
  fs.mkdirSync(dir, { recursive: true });
  const content = `import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Signature to ${w}×${h} Pixels Online | 20KB Photo",
  description: "Resize your signature image to exact ${w}x${h} pixels online for exam applications and government recruitment portals.",
  alternates: {
    canonical: "https://20kbphoto.in/signature-resizer-${dims}",
  },
};

export default function SignatureResizer${w}x${h}Page() {
  return <DimensionToolClient targetWidth={${w}} targetHeight={${h}} type="signature" />;
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

const imgDims = [
  '275x354', '200x230', '200x240', '300x300', '400x400',
  '350x450', '320x400', '240x240', '350x350', '500x500'
];

imgDims.forEach(dims => {
  const [w, h] = dims.split('x');
  const dir = path.join(__dirname, '..', 'src', 'app', `image-resizer-${dims}`);
  fs.mkdirSync(dir, { recursive: true });
  const content = `import type { Metadata } from "next";
import DimensionToolClient from "@/components/tools/DimensionToolClient";

export const metadata: Metadata = {
  title: "Resize Image to ${w}×${h} Pixels Online | 20KB Photo",
  description: "Resize your image to exactly ${w}x${h} pixels for exam and form applications online free.",
  alternates: {
    canonical: "https://20kbphoto.in/image-resizer-${dims}",
  },
};

export default function ImageResizer${w}x${h}Page() {
  return <DimensionToolClient targetWidth={${w}} targetHeight={${h}} type="image" />;
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
});

console.log('Successfully generated explicit static routes!');
