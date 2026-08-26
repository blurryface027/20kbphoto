import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolPageClient from "@/components/tools/ToolPageClient";

interface ToolConfig {
  title: string;
  subtitle: string;
}

const toolConfigs: Record<string, ToolConfig> = {
  "image-resizer": {
    title: "Image Resizer",
    subtitle: "Resize any image to exact pixel dimensions. Free, fast, browser-based.",
  },
  "image-compressor": {
    title: "Image Compressor",
    subtitle: "Compress any image to a specific file size in KB. Perfect for form uploads.",
  },
  "signature-resizer": {
    title: "Signature Resizer",
    subtitle: "Resize signatures to exact dimensions (e.g. 140x60) for government form portals.",
  },
  "photo-resizer": {
    title: "Photo Resizer",
    subtitle: "Prepare passport & exam photos to exact specifications.",
  },
  "image-to-jpg": {
    title: "Convert Image to JPG",
    subtitle: "Convert PNG, WebP, GIF images into standard JPG format instantly.",
  },
  "png-to-jpg": {
    title: "Convert PNG to JPG",
    subtitle: "Convert PNG images to JPG format for government forms.",
  },
  "webp-to-jpg": {
    title: "Convert WebP to JPG",
    subtitle: "Convert WebP images to standard JPG format.",
  },
  "jpg-to-png": {
    title: "Convert JPG to PNG",
    subtitle: "Convert JPG images to high-quality PNG format.",
  },
  "jpg-to-webp": {
    title: "Convert JPG to WebP",
    subtitle: "Convert JPG images to lightweight WebP format for fast web pages.",
  },
  "png-to-webp": {
    title: "Convert PNG to WebP",
    subtitle: "Convert PNG images to modern WebP format with small file size.",
  },
  "change-image-dpi": {
    title: "Change Image DPI",
    subtitle: "Adjust DPI settings (200 DPI, 300 DPI) for official print & exam uploads.",
  },
  "crop-image": {
    title: "Crop Image Online",
    subtitle: "Crop photo or document to custom aspect ratio or passport dimensions.",
  },
  "rotate-image": {
    title: "Rotate Image Online",
    subtitle: "Rotate image 90, 180, or 270 degrees clockwise or counterclockwise.",
  },
  "flip-image": {
    title: "Flip Image Online",
    subtitle: "Flip image horizontally or vertically instantly in browser.",
  },
  "passport-photo-maker": {
    title: "Passport Photo Maker",
    subtitle: "Resize and format photos to standard passport size (3.5x4.5 cm / 413x531 px).",
  },
  "photo-size-reducer": {
    title: "Photo Size Reducer",
    subtitle: "Reduce photo file size in KB for job applications and online portals.",
  },
  "signature-compressor": {
    title: "Signature Compressor",
    subtitle: "Compress signature image file size to under 20KB or 50KB.",
  },
  "signature-cropper": {
    title: "Signature Cropper",
    subtitle: "Crop white margins around handwritten signatures accurately.",
  },
  "signature-to-jpg": {
    title: "Signature to JPG Converter",
    subtitle: "Convert signature images to standard JPG format.",
  },
  "document-image-resizer": {
    title: "Document Image Resizer",
    subtitle: "Resize Aadhar, PAN, certificates and document scans for online forms.",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(toolConfigs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const config = toolConfigs[resolvedParams?.slug];
  if (!config) {
    return { title: "Tool Not Found" };
  }
  return {
    title: `${config.title} Online | 20KB Photo`,
    description: config.subtitle,
    alternates: {
      canonical: `https://20kbphoto.in/tools/${resolvedParams.slug}`,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const config = toolConfigs[resolvedParams?.slug];

  if (!config) {
    notFound();
  }

  return <ToolPageClient slug={resolvedParams.slug} />;
}
