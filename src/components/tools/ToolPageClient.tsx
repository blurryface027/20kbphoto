"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import CompressionControls from "@/components/tools/CompressionControls";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import {
  resizeImage,
  compressToSize,
  convertFormat,
  getImageInfo,
  validateOutput,
  type ImageInfo,
  type ValidationResult,
} from "@/lib/imageProcessor";

interface ToolConfig {
  title: string;
  subtitle: string;
  category: "resize" | "compress" | "convert" | "dpi" | "crop" | "rotate" | "flip";
  showDimensions?: boolean;
  showFormat?: boolean;
  showCompression?: boolean;
  defaultFormat?: string;
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
  presetKBs?: number[];
  defaultWidth?: number;
  defaultHeight?: number;
}

const toolConfigs: Record<string, ToolConfig> = {
  "image-resizer": {
    title: "Image Resizer",
    subtitle: "Resize any image to exact pixel dimensions. Free, fast, browser-based.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
  },
  "image-compressor": {
    title: "Image Compressor",
    subtitle: "Compress any image to a specific file size in KB. Perfect for form uploads.",
    category: "compress",
    showCompression: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [20, 30, 50, 100, 200],
  },
  "signature-resizer": {
    title: "Signature Resizer",
    subtitle: "Resize signatures to exact dimensions (e.g. 140x60) for government form portals.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    defaultWidth: 140,
    defaultHeight: 60,
    defaultFormat: "image/jpeg",
  },
  "photo-resizer": {
    title: "Photo Resizer",
    subtitle: "Prepare passport & exam photos to exact specifications.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    defaultWidth: 275,
    defaultHeight: 354,
    defaultFormat: "image/jpeg",
  },
  "image-to-jpg": {
    title: "Convert Image to JPG",
    subtitle: "Convert PNG, WebP, GIF images into standard JPG format instantly.",
    category: "convert",
    outputFormat: "image/jpeg",
  },
  "png-to-jpg": {
    title: "Convert PNG to JPG",
    subtitle: "Convert PNG images to JPG format for government forms.",
    category: "convert",
    outputFormat: "image/jpeg",
  },
  "webp-to-jpg": {
    title: "Convert WebP to JPG",
    subtitle: "Convert WebP images to standard JPG format.",
    category: "convert",
    outputFormat: "image/jpeg",
  },
  "jpg-to-png": {
    title: "Convert JPG to PNG",
    subtitle: "Convert JPG images to high-quality PNG format.",
    category: "convert",
    outputFormat: "image/png",
  },
  "jpg-to-webp": {
    title: "Convert JPG to WebP",
    subtitle: "Convert JPG images to lightweight WebP format for fast web pages.",
    category: "convert",
    outputFormat: "image/webp",
  },
  "png-to-webp": {
    title: "Convert PNG to WebP",
    subtitle: "Convert PNG images to modern WebP format with small file size.",
    category: "convert",
    outputFormat: "image/webp",
  },
  "change-image-dpi": {
    title: "Change Image DPI",
    subtitle: "Adjust DPI settings (200 DPI, 300 DPI) for official print & exam uploads.",
    category: "dpi",
    showDimensions: true,
    showFormat: true,
  },
  "crop-image": {
    title: "Crop Image Online",
    subtitle: "Crop photo or document to custom aspect ratio or passport dimensions.",
    category: "crop",
    showDimensions: true,
  },
  "rotate-image": {
    title: "Rotate Image Online",
    subtitle: "Rotate image 90, 180, or 270 degrees clockwise or counterclockwise.",
    category: "rotate",
  },
  "flip-image": {
    title: "Flip Image Online",
    subtitle: "Flip image horizontally or vertically instantly in browser.",
    category: "flip",
  },
  "passport-photo-maker": {
    title: "Passport Photo Maker",
    subtitle: "Resize and format photos to standard passport size (3.5x4.5 cm / 413x531 px).",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    defaultWidth: 413,
    defaultHeight: 531,
    defaultFormat: "image/jpeg",
  },
  "photo-size-reducer": {
    title: "Photo Size Reducer",
    subtitle: "Reduce photo file size in KB for job applications and online portals.",
    category: "compress",
    showCompression: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [20, 50, 100, 200],
  },
  "signature-compressor": {
    title: "Signature Compressor",
    subtitle: "Compress signature image file size to under 20KB or 50KB.",
    category: "compress",
    showCompression: true,
    showFormat: true,
    defaultFormat: "image/jpeg",
    presetKBs: [10, 20, 30, 50],
  },
  "signature-cropper": {
    title: "Signature Cropper",
    subtitle: "Crop white margins around handwritten signatures accurately.",
    category: "crop",
    showDimensions: true,
  },
  "signature-to-jpg": {
    title: "Signature to JPG Converter",
    subtitle: "Convert signature images to standard JPG format.",
    category: "convert",
    outputFormat: "image/jpeg",
  },
  "document-image-resizer": {
    title: "Document Image Resizer",
    subtitle: "Resize Aadhar, PAN, certificates and document scans for online forms.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    defaultWidth: 600,
    defaultHeight: 800,
    defaultFormat: "image/jpeg",
  },
};

interface Props {
  slug: string;
}

export default function ToolPageClient({ slug }: Props) {
  const config = toolConfigs[slug] || toolConfigs["image-resizer"];

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [targetWidth, setTargetWidth] = useState<number>(config.defaultWidth || 275);
  const [targetHeight, setTargetHeight] = useState<number>(config.defaultHeight || 354);
  const [targetKB, setTargetKB] = useState<number>(50);
  const [format, setFormat] = useState<string>(config.defaultFormat || "image/jpeg");

  const [processedDataUrl, setProcessedDataUrl] = useState<string | undefined>(undefined);
  const [processedInfo, setProcessedInfo] = useState<ImageInfo | undefined>(undefined);
  const [processedBlob, setProcessedBlob] = useState<Blob | undefined>(undefined);

  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | undefined>(undefined);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);

    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);

      if (!config.defaultWidth && info.width) setTargetWidth(info.width);
      if (!config.defaultHeight && info.height) setTargetHeight(info.height);

      await process(file, targetWidth || info.width, targetHeight || info.height, targetKB, format);
    } catch (err) {
      console.error("Error loading image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const process = async (
    file: File = originalFile!,
    w: number = targetWidth,
    h: number = targetHeight,
    kb: number = targetKB,
    fmt: string = format
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      let result;

      if (config.category === "convert" && config.outputFormat) {
        result = await convertFormat(file, config.outputFormat);
      } else if (config.category === "compress") {
        result = await compressToSize(file, kb, fmt);
      } else {
        result = await resizeImage(file, w, h, fmt);
      }

      setProcessedDataUrl(result.dataUrl);
      setProcessedBlob(result.blob);
      setProcessedInfo({
        width: result.width,
        height: result.height,
        size: result.size,
        format: result.format,
        name: file.name,
      });

      const val = await validateOutput(result.blob, {
        width: w,
        height: h,
        minKB: 0,
        maxKB: kb,
        format: fmt === "image/jpeg" ? "JPG" : fmt === "image/png" ? "PNG" : "WEBP",
      });
      setValidation(val);
    } catch (err) {
      console.error("Error processing image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setProcessedDataUrl(undefined);
    setProcessedInfo(undefined);
    setProcessedBlob(undefined);
    setValidation(undefined);
  };

  useEffect(() => {
    if (originalFile) {
      process(originalFile, targetWidth, targetHeight, targetKB, format);
    }
  }, [targetWidth, targetHeight, targetKB, format]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: config.title },
  ];

  return (
    <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label={`Upload photo to use ${config.title}`}
          sublabel="Supports JPG, PNG, WEBP files up to 10MB"
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {(config.showDimensions || config.showCompression || config.showFormat) && (
            <CompressionControls
              targetKB={targetKB}
              onTargetKBChange={setTargetKB}
              targetWidth={targetWidth}
              onTargetWidthChange={setTargetWidth}
              targetHeight={targetHeight}
              onTargetHeightChange={setTargetHeight}
              format={format}
              onFormatChange={setFormat}
              showDimensions={config.showDimensions}
              showFormat={config.showFormat}
              presetKBs={config.presetKBs}
            />
          )}

          <PreviewPanel
            originalFile={originalFile}
            originalInfo={originalInfo}
            processedDataUrl={processedDataUrl}
            processedInfo={processedInfo}
            isProcessing={isProcessing}
          />

          {processedInfo && (
            <>
              {validation && (
                <ValidationBadges
                  checks={validation.checks}
                  details={validation.details}
                  requirements={{
                    width: targetWidth,
                    height: targetHeight,
                    minKB: 0,
                    maxKB: targetKB,
                    format: format === "image/jpeg" ? "JPG" : format === "image/png" ? "PNG" : "WEBP",
                  }}
                />
              )}

              <DownloadPanel
                blob={processedBlob}
                filename={`processed-${originalFile.name}`}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}
    </ToolShell>
  );
}
