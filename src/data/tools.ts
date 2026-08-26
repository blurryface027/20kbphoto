export interface Tool {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: 'resize' | 'compress' | 'convert' | 'signature' | 'photo' | 'document' | 'utility';
  path: string;
  icon: string; // React-icon name
  priority: 'P0' | 'P1' | 'P2';
  keywords: string[];
}

export interface ExactKBTool {
  kb: number;
  slug: string;
  title: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
  keywords: string[];
}

export interface DimensionTool {
  width: number;
  height: number;
  slug: string;
  title: string;
  description: string;
  type: 'image' | 'signature';
  priority: 'P0' | 'P1' | 'P2';
  keywords: string[];
}

export const tools: Tool[] = [
  { slug: 'image-resizer', name: 'Image Resizer', description: 'Resize your images easily without losing quality.', shortDescription: 'Resize images', category: 'resize', path: '/tools/image-resizer', icon: 'HiOutlinePhoto', priority: 'P0', keywords: ['image resizer', 'resize image online'] },
  { slug: 'image-compressor', name: 'Image Compressor', description: 'Compress images to smaller file sizes.', shortDescription: 'Compress images', category: 'compress', path: '/tools/image-compressor', icon: 'HiOutlineArchiveBox', priority: 'P0', keywords: ['compress image', 'reduce image size'] },
  { slug: 'signature-resizer', name: 'Signature Resizer', description: 'Resize signature images for exams.', shortDescription: 'Resize signature', category: 'signature', path: '/tools/signature-resizer', icon: 'HiOutlinePencilSquare', priority: 'P0', keywords: ['signature resizer', 'resize signature'] },
  { slug: 'photo-resizer', name: 'Photo Resizer', description: 'Resize photos for official documents and exams.', shortDescription: 'Resize photos', category: 'photo', path: '/tools/photo-resizer', icon: 'HiOutlineCamera', priority: 'P0', keywords: ['photo resizer', 'resize photo'] },
  { slug: 'image-to-jpg', name: 'Convert Image to JPG', description: 'Convert any image format to JPG.', shortDescription: 'Convert to JPG', category: 'convert', path: '/tools/image-to-jpg', icon: 'HiOutlineArrowPath', priority: 'P0', keywords: ['image to jpg', 'convert to jpg'] },
  { slug: 'png-to-jpg', name: 'Convert PNG to JPG', description: 'Convert PNG images to JPG format.', shortDescription: 'PNG to JPG', category: 'convert', path: '/tools/png-to-jpg', icon: 'HiOutlineArrowPath', priority: 'P0', keywords: ['png to jpg', 'convert png to jpg'] },
  { slug: 'jpg-to-png', name: 'Convert JPG to PNG', description: 'Convert JPG images to PNG format.', shortDescription: 'JPG to PNG', category: 'convert', path: '/tools/jpg-to-png', icon: 'HiOutlineArrowPath', priority: 'P1', keywords: ['jpg to png', 'convert jpg to png'] },
  { slug: 'webp-to-jpg', name: 'Convert WebP to JPG', description: 'Convert WebP images to JPG format.', shortDescription: 'WebP to JPG', category: 'convert', path: '/tools/webp-to-jpg', icon: 'HiOutlineArrowPath', priority: 'P1', keywords: ['webp to jpg', 'convert webp to jpg'] },
  { slug: 'jpg-to-webp', name: 'Convert JPG to WebP', description: 'Convert JPG images to WebP format.', shortDescription: 'JPG to WebP', category: 'convert', path: '/tools/jpg-to-webp', icon: 'HiOutlineArrowPath', priority: 'P2', keywords: ['jpg to webp', 'convert jpg to webp'] },
  { slug: 'png-to-webp', name: 'Convert PNG to WebP', description: 'Convert PNG images to WebP format.', shortDescription: 'PNG to WebP', category: 'convert', path: '/tools/png-to-webp', icon: 'HiOutlineArrowPath', priority: 'P2', keywords: ['png to webp', 'convert png to webp'] },
  { slug: 'change-image-dpi', name: 'Change Image DPI', description: 'Change the DPI of your image for print or web.', shortDescription: 'Change DPI', category: 'utility', path: '/tools/change-image-dpi', icon: 'HiOutlineRuler', priority: 'P1', keywords: ['change image dpi', 'dpi converter'] },
  { slug: 'crop-image', name: 'Crop Image', description: 'Crop images to required aspect ratios or dimensions.', shortDescription: 'Crop image', category: 'resize', path: '/tools/crop-image', icon: 'HiOutlineScissors', priority: 'P1', keywords: ['crop image', 'image cropper'] },
  { slug: 'rotate-image', name: 'Rotate Image', description: 'Rotate images online easily.', shortDescription: 'Rotate image', category: 'utility', path: '/tools/rotate-image', icon: 'HiOutlineArrowPath', priority: 'P2', keywords: ['rotate image'] },
  { slug: 'flip-image', name: 'Flip Image', description: 'Flip your images horizontally or vertically.', shortDescription: 'Flip image', category: 'utility', path: '/tools/flip-image', icon: 'HiOutlineArrowsRightLeft', priority: 'P2', keywords: ['flip image'] },
  { slug: 'passport-photo-maker', name: 'Passport Photo Maker', description: 'Create passport size photos online.', shortDescription: 'Passport photo', category: 'photo', path: '/tools/passport-photo-maker', icon: 'HiOutlineIdentification', priority: 'P0', keywords: ['passport photo maker', 'create passport photo'] },
  { slug: 'photo-size-reducer', name: 'Photo Size Reducer', description: 'Reduce the file size of your photos.', shortDescription: 'Reduce photo size', category: 'compress', path: '/tools/photo-size-reducer', icon: 'HiOutlineArrowTrendingDown', priority: 'P1', keywords: ['photo size reducer', 'reduce photo file size'] },
  { slug: 'signature-compressor', name: 'Signature Compressor', description: 'Compress signature images to required KB size.', shortDescription: 'Compress signature', category: 'compress', path: '/tools/signature-compressor', icon: 'HiOutlineArchiveBox', priority: 'P0', keywords: ['signature compressor', 'compress signature image'] },
  { slug: 'signature-cropper', name: 'Signature Cropper', description: 'Crop signature images.', shortDescription: 'Crop signature', category: 'signature', path: '/tools/signature-cropper', icon: 'HiOutlineScissors', priority: 'P1', keywords: ['signature cropper', 'crop signature'] },
  { slug: 'signature-to-jpg', name: 'Signature to JPG', description: 'Convert signature images to JPG format.', shortDescription: 'Signature to JPG', category: 'convert', path: '/tools/signature-to-jpg', icon: 'HiOutlineArrowPath', priority: 'P1', keywords: ['signature to jpg', 'convert signature to jpg'] },
  { slug: 'document-image-resizer', name: 'Document Image Resizer', description: 'Resize document images like Aadhar, PAN, etc.', shortDescription: 'Resize document', category: 'document', path: '/tools/document-image-resizer', icon: 'HiOutlineDocumentText', priority: 'P1', keywords: ['document image resizer', 'resize document image'] }
];

export const exactKbs: ExactKBTool[] = [
  { kb: 10, slug: '10kb', title: '10KB Image Compressor', description: 'Compress image to 10KB', priority: 'P1', keywords: ['compress image to 10kb'] },
  { kb: 20, slug: '20kb', title: '20KB Image Compressor', description: 'Compress image to 20KB', priority: 'P0', keywords: ['compress image to 20kb'] },
  { kb: 30, slug: '30kb', title: '30KB Image Compressor', description: 'Compress image to 30KB', priority: 'P0', keywords: ['compress image to 30kb'] },
  { kb: 40, slug: '40kb', title: '40KB Image Compressor', description: 'Compress image to 40KB', priority: 'P1', keywords: ['compress image to 40kb'] },
  { kb: 50, slug: '50kb', title: '50KB Image Compressor', description: 'Compress image to 50KB', priority: 'P0', keywords: ['compress image to 50kb'] },
  { kb: 60, slug: '60kb', title: '60KB Image Compressor', description: 'Compress image to 60KB', priority: 'P2', keywords: ['compress image to 60kb'] },
  { kb: 70, slug: '70kb', title: '70KB Image Compressor', description: 'Compress image to 70KB', priority: 'P2', keywords: ['compress image to 70kb'] },
  { kb: 100, slug: '100kb', title: '100KB Image Compressor', description: 'Compress image to 100KB', priority: 'P0', keywords: ['compress image to 100kb'] },
  { kb: 150, slug: '150kb', title: '150KB Image Compressor', description: 'Compress image to 150KB', priority: 'P1', keywords: ['compress image to 150kb'] },
  { kb: 200, slug: '200kb', title: '200KB Image Compressor', description: 'Compress image to 200KB', priority: 'P0', keywords: ['compress image to 200kb'] },
  { kb: 300, slug: '300kb', title: '300KB Image Compressor', description: 'Compress image to 300KB', priority: 'P1', keywords: ['compress image to 300kb'] },
  { kb: 500, slug: '500kb', title: '500KB Image Compressor', description: 'Compress image to 500KB', priority: 'P2', keywords: ['compress image to 500kb'] }
];
export const exactKBTools = exactKbs;

export const dimensions: DimensionTool[] = [
  { width: 275, height: 354, slug: '275x354', title: '275x354 Image Resizer', description: 'Resize image to 275x354 pixels', type: 'image', priority: 'P0', keywords: ['275x354 image resizer'] },
  { width: 200, height: 230, slug: '200x230', title: '200x230 Image Resizer', description: 'Resize image to 200x230 pixels', type: 'image', priority: 'P0', keywords: ['200x230 image resizer'] },
  { width: 200, height: 240, slug: '200x240', title: '200x240 Image Resizer', description: 'Resize image to 200x240 pixels', type: 'image', priority: 'P0', keywords: ['200x240 image resizer'] },
  { width: 300, height: 300, slug: '300x300', title: '300x300 Image Resizer', description: 'Resize image to 300x300 pixels', type: 'image', priority: 'P1', keywords: ['300x300 image resizer'] },
  { width: 400, height: 400, slug: '400x400', title: '400x400 Image Resizer', description: 'Resize image to 400x400 pixels', type: 'image', priority: 'P1', keywords: ['400x400 image resizer'] },
  { width: 350, height: 450, slug: '350x450', title: '350x450 Image Resizer', description: 'Resize image to 350x450 pixels', type: 'image', priority: 'P0', keywords: ['350x450 image resizer'] },
  { width: 320, height: 400, slug: '320x400', title: '320x400 Image Resizer', description: 'Resize image to 320x400 pixels', type: 'image', priority: 'P1', keywords: ['320x400 image resizer'] },
  { width: 240, height: 240, slug: '240x240', title: '240x240 Image Resizer', description: 'Resize image to 240x240 pixels', type: 'image', priority: 'P2', keywords: ['240x240 image resizer'] },
  { width: 350, height: 350, slug: '350x350', title: '350x350 Image Resizer', description: 'Resize image to 350x350 pixels', type: 'image', priority: 'P1', keywords: ['350x350 image resizer'] },
  { width: 500, height: 500, slug: '500x500', title: '500x500 Image Resizer', description: 'Resize image to 500x500 pixels', type: 'image', priority: 'P2', keywords: ['500x500 image resizer'] },
  { width: 140, height: 60, slug: '140x60', title: '140x60 Signature Resizer', description: 'Resize signature to 140x60 pixels', type: 'signature', priority: 'P0', keywords: ['140x60 signature resizer'] },
  { width: 200, height: 80, slug: '200x80', title: '200x80 Signature Resizer', description: 'Resize signature to 200x80 pixels', type: 'signature', priority: 'P1', keywords: ['200x80 signature resizer'] },
  { width: 240, height: 80, slug: '240x80', title: '240x80 Signature Resizer', description: 'Resize signature to 240x80 pixels', type: 'signature', priority: 'P1', keywords: ['240x80 signature resizer'] },
  { width: 275, height: 118, slug: '275x118', title: '275x118 Signature Resizer', description: 'Resize signature to 275x118 pixels', type: 'signature', priority: 'P0', keywords: ['275x118 signature resizer'] },
  { width: 300, height: 80, slug: '300x80', title: '300x80 Signature Resizer', description: 'Resize signature to 300x80 pixels', type: 'signature', priority: 'P1', keywords: ['300x80 signature resizer'] },
  { width: 350, height: 150, slug: '350x150', title: '350x150 Signature Resizer', description: 'Resize signature to 350x150 pixels', type: 'signature', priority: 'P2', keywords: ['350x150 signature resizer'] }
];
export const dimensionTools = dimensions;

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getExactKBBySlug(slug: string): ExactKBTool | undefined {
  return exactKbs.find((t) => t.slug === slug);
}

export function getDimensionBySlug(slug: string): DimensionTool | undefined {
  return dimensions.find((t) => t.slug === slug);
}
