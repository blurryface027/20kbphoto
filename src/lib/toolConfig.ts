import { tools, exactKbs, dimensions } from "@/data/tools";

export interface ToolConfig {
  title: string;
  subtitle: string;
  category: "resize" | "compress" | "convert" | "dpi" | "crop" | "rotate" | "flip" | "photo" | "document" | "signature" | "utility";
  showDimensions?: boolean;
  showFormat?: boolean;
  showCompression?: boolean;
  defaultFormat?: string;
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
  presetKBs?: number[];
  defaultWidth?: number;
  defaultHeight?: number;
  accept?: string;
  uploadLabel?: string;
  uploadSublabel?: string;
}

const masterConfigs: Record<string, ToolConfig> = {
  "image-resizer": {
    title: "Image Resizer",
    subtitle: "Resize any image to exact pixel dimensions or percentage scale. Free, fast, browser-based.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultFormat: "image/jpeg",
  },
  "image-compressor": {
    title: "Image Compressor",
    subtitle: "Compress any image to a specific file size in KB. Perfect for form uploads.",
    category: "compress",
    showCompression: true,
    showDimensions: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [20, 30, 50, 100, 200],
  },
  "signature-resizer": {
    title: "Signature Resizer",
    subtitle: "Resize signatures to exact dimensions (e.g. 140x60) for government form portals.",
    category: "signature",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 140,
    defaultHeight: 60,
    defaultFormat: "image/jpeg",
  },
  "photo-resizer": {
    title: "Photo Resizer",
    subtitle: "Prepare passport & exam photos to exact specifications.",
    category: "photo",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 275,
    defaultHeight: 354,
    defaultFormat: "image/jpeg",
  },
  "image-to-jpg": {
    title: "Convert Image to JPG",
    subtitle: "Convert PNG, WebP, GIF images into standard JPG format instantly with resize & size options.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/jpeg",
    defaultFormat: "image/jpeg",
    accept: "image/png,image/webp,image/gif,image/bmp",
    uploadLabel: "Upload image (PNG, WebP, GIF) to convert to JPG",
    uploadSublabel: "Select a PNG, WebP, GIF, or BMP image file",
  },
  "png-to-jpg": {
    title: "Convert PNG to JPG",
    subtitle: "Convert PNG images to JPG format for government forms with custom dimensions & file size.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/jpeg",
    defaultFormat: "image/jpeg",
    accept: "image/png",
    uploadLabel: "Upload PNG image to convert to JPG",
    uploadSublabel: "Please select a PNG file (.png) only",
  },
  "webp-to-jpg": {
    title: "Convert WebP to JPG",
    subtitle: "Convert WebP images to standard JPG format with resize & size controls.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/jpeg",
    defaultFormat: "image/jpeg",
    accept: "image/webp",
    uploadLabel: "Upload WebP image to convert to JPG",
    uploadSublabel: "Please select a WebP file (.webp) only",
  },
  "jpg-to-png": {
    title: "Convert JPG to PNG",
    subtitle: "Convert JPG images to high-quality PNG format with custom resize options.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/png",
    defaultFormat: "image/png",
    accept: "image/jpeg,image/jpg",
    uploadLabel: "Upload JPG image to convert to PNG",
    uploadSublabel: "Please select a JPG or JPEG file (.jpg, .jpeg) only",
  },
  "jpg-to-webp": {
    title: "Convert JPG to WebP",
    subtitle: "Convert JPG images to lightweight WebP format for fast web pages.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/webp",
    defaultFormat: "image/webp",
    accept: "image/jpeg,image/jpg",
    uploadLabel: "Upload JPG image to convert to WebP",
    uploadSublabel: "Please select a JPG or JPEG file (.jpg, .jpeg) only",
  },
  "png-to-webp": {
    title: "Convert PNG to WebP",
    subtitle: "Convert PNG images to modern WebP format with small file size.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/webp",
    defaultFormat: "image/webp",
    accept: "image/png",
    uploadLabel: "Upload PNG image to convert to WebP",
    uploadSublabel: "Please select a PNG file (.png) only",
  },
  "change-image-dpi": {
    title: "Change Image DPI",
    subtitle: "Adjust DPI settings (200 DPI, 300 DPI) for official print & exam uploads.",
    category: "dpi",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
  },
  "crop-image": {
    title: "Crop Image Online",
    subtitle: "Crop photo or document to custom aspect ratio or passport dimensions.",
    category: "crop",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
  },
  "rotate-image": {
    title: "Rotate Image Online",
    subtitle: "Rotate image 90, 180, or 270 degrees clockwise or counterclockwise.",
    category: "rotate",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
  },
  "flip-image": {
    title: "Flip Image Online",
    subtitle: "Flip image horizontally or vertically instantly in browser.",
    category: "flip",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
  },
  "passport-photo-maker": {
    title: "Passport Photo Maker",
    subtitle: "Resize and format photos to standard passport size (3.5x4.5 cm / 413x531 px).",
    category: "photo",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 413,
    defaultHeight: 531,
    defaultFormat: "image/jpeg",
  },
  "photo-size-reducer": {
    title: "Photo Size Reducer",
    subtitle: "Reduce photo file size in KB for job applications and online portals.",
    category: "compress",
    showCompression: true,
    showDimensions: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [20, 50, 100, 200],
  },
  "signature-compressor": {
    title: "Signature Compressor",
    subtitle: "Compress signature image file size to under 20KB or 50KB.",
    category: "compress",
    showCompression: true,
    showDimensions: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [10, 20, 30, 50],
  },
  "signature-cropper": {
    title: "Signature Cropper",
    subtitle: "Crop white margins around handwritten signatures accurately.",
    category: "crop",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
  },
  "signature-to-jpg": {
    title: "Signature to JPG Converter",
    subtitle: "Convert signature images to standard JPG format with dimension & KB compression controls.",
    category: "convert",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    outputFormat: "image/jpeg",
    defaultFormat: "image/jpeg",
  },
  "document-image-resizer": {
    title: "Document Image Resizer",
    subtitle: "Resize Aadhar, PAN, certificates and document scans for online forms.",
    category: "document",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 600,
    defaultHeight: 800,
    defaultFormat: "image/jpeg",
  },
  "background-remover": {
    title: "Background Remover Online",
    subtitle: "Remove image background instantly with transparent PNG export. 100% private in browser.",
    category: "utility",
  },
  "image-cropper": {
    title: "Image Cropper Online",
    subtitle: "Crop images with preset aspect ratios (1:1, 4:5, 16:9, 9:16) or custom dimensions.",
    category: "crop",
  },
  "blur-image": {
    title: "Blur Image Online",
    subtitle: "Blur entire photo or select specific areas to hide sensitive text, faces, and details.",
    category: "utility",
  },
  "image-stitcher": {
    title: "Image Stitcher Online",
    subtitle: "Combine multiple images vertically or horizontally into a single combined photo.",
    category: "utility",
  },
  "jpg-to-pdf": {
    title: "JPG to PDF Converter",
    subtitle: "Convert one or multiple JPG images into a formatted PDF document with page order options.",
    category: "document",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter",
    subtitle: "Convert PDF pages into high quality JPG or PNG images with individual page or ZIP download.",
    category: "document",
  },
  "image-to-pdf": {
    title: "Image to PDF Converter",
    subtitle: "Convert JPG, PNG, WebP images to a single organized PDF file with page orientation controls.",
    category: "document",
  },
  "pdf-to-image": {
    title: "PDF to Image Converter",
    subtitle: "Extract all pages from PDF file into JPG or PNG images with custom DPI quality.",
    category: "document",
  },
  "document-scanner": {
    title: "Online Document Scanner",
    subtitle: "Scan document photos with B&W/grayscale enhancement filters and export to PDF.",
    category: "document",
  },
  "photos-to-pdf": {
    title: "Photos to PDF Converter",
    subtitle: "Combine multiple photos into one clean PDF document for online applications and forms.",
    category: "document",
  },
  "bulk-image-compressor": {
    title: "Bulk Image Compressor",
    subtitle: "Compress multiple images in batch to specific KB sizes with single ZIP download.",
    category: "compress",
  },
  "bulk-image-resizer": {
    title: "Bulk Image Resizer",
    subtitle: "Resize multiple images simultaneously by width, height, or percentage with ZIP download.",
    category: "resize",
  },
  "image-format-converter": {
    title: "Image Format Converter",
    subtitle: "Convert between JPG, PNG, WebP formats seamlessly while preserving high quality.",
    category: "convert",
  },
  "image-upscaler": {
    title: "Image Upscaler Online",
    subtitle: "Upscale image resolution by 2x or 4x with bicubic interpolation and edge sharpening.",
    category: "utility",
  },
  "image-metadata": {
    title: "Image Metadata EXIF Viewer",
    subtitle: "View image dimensions, camera info, EXIF metadata, and strip sensitive location tags.",
    category: "utility",
  },
  "pan-card-photo-resizer": {
    title: "PAN Card Photo Resizer",
    subtitle: "Resize photograph to 213x213 pixels and compress to under 50KB for NSDL & UTIITSL PAN card portal.",
    category: "photo",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 213,
    defaultHeight: 213,
    presetKBs: [50],
    defaultFormat: "image/jpeg",
  },
  "add-name-and-date-to-photo": {
    title: "Add Name & Date to Photo",
    subtitle: "Overlay candidate name and date of photo on passport photos for SSC & UPSC recruitment exams.",
    category: "photo",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultWidth: 350,
    defaultHeight: 450,
    defaultFormat: "image/jpeg",
  },
};

export function getToolConfig(slug: string): ToolConfig {
  if (masterConfigs[slug]) {
    return masterConfigs[slug];
  }

  // Check Exact KB pattern: 20kb, 50kb, resize-image-to-20kb
  const kbMatch = slug.match(/^(?:resize-image-to-)?(\d+)kb$/i);
  if (kbMatch) {
    const kb = parseInt(kbMatch[1], 10);
    return {
      title: `${kb}KB Image Compressor`,
      subtitle: `Compress and resize any image or signature file size to under ${kb}KB online for application forms.`,
      category: "compress",
      showDimensions: true,
      showFormat: true,
      showCompression: true,
      presetKBs: [kb],
      defaultFormat: "image/jpeg",
    };
  }

  // Check Dimension pattern: 275x354, image-resizer-275x354, 140x60, signature-resizer-140x60
  const dimMatch = slug.match(/^(?:(?:image|signature)-resizer-)?(\d+)x(\d+)$/i);
  if (dimMatch) {
    const w = parseInt(dimMatch[1], 10);
    const h = parseInt(dimMatch[2], 10);
    const isSignature = slug.includes("signature") || (w <= 400 && h <= 160);
    return {
      title: `${w}x${h} ${isSignature ? "Signature" : "Image"} Resizer`,
      subtitle: `Resize ${isSignature ? "signature photo" : "image"} to exact ${w}x${h} pixels for recruitment and admission portals.`,
      category: "resize",
      showDimensions: true,
      showFormat: true,
      showCompression: true,
      defaultWidth: w,
      defaultHeight: h,
      defaultFormat: "image/jpeg",
    };
  }

  // General slug fallback
  const cleanTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: cleanTitle,
    subtitle: `Online browser tool for ${cleanTitle.toLowerCase()}. Fast, free, and 100% private.`,
    category: "resize",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
    defaultFormat: "image/jpeg",
  };
}

export function getAllToolSlugs(): string[] {
  const masterSlugs = Object.keys(masterConfigs);
  const dataSlugs = tools.map((t) => t.slug);
  const kbSlugs = exactKbs.map((k) => k.slug);
  const dimSlugs = dimensions.map((d) => d.slug);
  const set = new Set([...masterSlugs, ...dataSlugs, ...kbSlugs, ...dimSlugs]);
  return Array.from(set);
}
