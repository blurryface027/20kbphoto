"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import CompressionControls from "@/components/tools/CompressionControls";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import {
  processImage,
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
    category: "resize",
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
    category: "resize",
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
    category: "resize",
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
  "document-image-resizer": {
    title: "Document Image Resizer",
    subtitle: "Resize Aadhar, PAN, certificates and document scans for online forms.",
    category: "resize",
    showDimensions: true,
    showFormat: true,
    showCompression: true,
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

  const [resizeMode, setResizeMode] = useState<"percentage" | "dimensions">(
    config.defaultWidth || config.defaultHeight ? "dimensions" : "percentage"
  );
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [targetWidth, setTargetWidth] = useState<number>(config.defaultWidth || 0);
  const [targetHeight, setTargetHeight] = useState<number>(config.defaultHeight || 0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  const [enableTargetKB, setEnableTargetKB] = useState<boolean>(config.category === "compress");
  const [targetKB, setTargetKB] = useState<number>(50);
  const [format, setFormat] = useState<string>(config.outputFormat || config.defaultFormat || "image/jpeg");

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

      let initialW = config.defaultWidth || info.width;
      let initialH = config.defaultHeight || info.height;

      setTargetWidth(initialW);
      setTargetHeight(initialH);
      setScalePercent(100);

      await process(file, initialW, initialH, scalePercent, resizeMode, enableTargetKB, targetKB, format);
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
    pct: number = scalePercent,
    mode: "percentage" | "dimensions" = resizeMode,
    useKB: boolean = enableTargetKB,
    kb: number = targetKB,
    fmt: string = format
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const result = await processImage(file, {
        width: mode === "dimensions" ? w : undefined,
        height: mode === "dimensions" ? h : undefined,
        scalePercent: mode === "percentage" ? pct : undefined,
        format: fmt,
        targetKB: useKB ? kb : undefined,
      });

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
        width: result.width,
        height: result.height,
        minKB: 0,
        maxKB: useKB ? kb : 5000,
        format: fmt === "image/jpeg" ? "JPG" : fmt === "image/png" ? "PNG" : "WEBP",
      });
      setValidation(val);
    } catch (err) {
      console.error("Error processing image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleScalePercentChange = (pct: number) => {
    setScalePercent(pct);
    if (originalInfo) {
      const w = Math.max(1, Math.round(originalInfo.width * (pct / 100)));
      const h = Math.max(1, Math.round(originalInfo.height * (pct / 100)));
      setTargetWidth(w);
      setTargetHeight(h);
    }
  };

  const handleTargetWidthChange = (w: number) => {
    setTargetWidth(w);
    if (keepAspectRatio && originalInfo && originalInfo.width > 0) {
      const h = Math.max(1, Math.round(w / (originalInfo.width / originalInfo.height)));
      setTargetHeight(h);
      setScalePercent(Math.round((w / originalInfo.width) * 100));
    }
  };

  const handleTargetHeightChange = (h: number) => {
    setTargetHeight(h);
    if (keepAspectRatio && originalInfo && originalInfo.height > 0) {
      const w = Math.max(1, Math.round(h * (originalInfo.width / originalInfo.height)));
      setTargetWidth(w);
      setScalePercent(Math.round((h / originalInfo.height) * 100));
    }
  };

  const handleResizeModeChange = (mode: "percentage" | "dimensions") => {
    setResizeMode(mode);
    if (mode === "percentage" && originalInfo) {
      const w = Math.max(1, Math.round(originalInfo.width * (scalePercent / 100)));
      const h = Math.max(1, Math.round(originalInfo.height * (scalePercent / 100)));
      setTargetWidth(w);
      setTargetHeight(h);
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
      process(originalFile, targetWidth, targetHeight, scalePercent, resizeMode, enableTargetKB, targetKB, format);
    }
  }, [targetWidth, targetHeight, scalePercent, resizeMode, enableTargetKB, targetKB, format, keepAspectRatio]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: config.title },
  ];

  const getDownloadFilename = () => {
    if (!originalFile) return "converted-photo.jpg";
    const name = originalFile.name;
    const lastDot = name.lastIndexOf(".");
    const baseName = lastDot > 0 ? name.substring(0, lastDot) : name;
    const ext = format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : "webp";
    return `${baseName}-converted.${ext}`;
  };

  return (
    <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label={`Upload image to use ${config.title}`}
          sublabel="Supports JPG, PNG, WEBP, GIF files up to 10MB"
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {(config.showDimensions || config.showCompression || config.showFormat) && (
            <CompressionControls
              targetKB={targetKB}
              onTargetKBChange={setTargetKB}
              enableTargetKB={enableTargetKB}
              onEnableTargetKBChange={setEnableTargetKB}
              targetWidth={targetWidth}
              onTargetWidthChange={handleTargetWidthChange}
              targetHeight={targetHeight}
              onTargetHeightChange={handleTargetHeightChange}
              scalePercent={scalePercent}
              onScalePercentChange={handleScalePercentChange}
              resizeMode={resizeMode}
              onResizeModeChange={handleResizeModeChange}
              keepAspectRatio={keepAspectRatio}
              onKeepAspectRatioChange={setKeepAspectRatio}
              format={format}
              onFormatChange={setFormat}
              originalInfo={originalInfo}
              showDimensions={config.showDimensions}
              showFormat={config.showFormat}
              showCompression={config.showCompression}
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
                    width: processedInfo.width,
                    height: processedInfo.height,
                    minKB: 0,
                    maxKB: enableTargetKB ? targetKB : Math.ceil(processedInfo.size / 1024),
                    format: format === "image/jpeg" ? "JPG" : format === "image/png" ? "PNG" : "WEBP",
                  }}
                />
              )}

              <DownloadPanel
                blob={processedBlob}
                filename={getDownloadFilename()}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}
    </ToolShell>
  );
}
