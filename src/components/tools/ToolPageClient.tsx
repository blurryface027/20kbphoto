"use client";

import { useState, useEffect } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import CompressionControls from "@/components/tools/CompressionControls";
import ImageCropper from "@/components/tools/ImageCropper";
import RotateFlipControls from "@/components/tools/RotateFlipControls";
import DpiControls from "@/components/tools/DpiControls";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import {
  processImage,
  getImageInfo,
  validateOutput,
  type ImageInfo,
  type ValidationResult,
  type CropRect,
} from "@/lib/imageProcessor";
import { trackEvent } from "@/lib/gtag";
import { getShortDownloadFilename } from "@/lib/filenameUtils";
import {
  HiOutlineScissors,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsVertical,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";
import JspdfConverterClient from "./JspdfConverterClient";
import PdfToJpgClient from "./PdfToJpgClient";
import BackgroundRemoverClient from "./BackgroundRemoverClient";
import BlurToolClient from "./BlurToolClient";
import ImageStitcherClient from "./ImageStitcherClient";
import DocumentScannerClient from "./DocumentScannerClient";
import BulkCompressorClient from "./BulkCompressorClient";
import BulkResizerClient from "./BulkResizerClient";
import PassportMakerClient from "./PassportMakerClient";
import ImageUpscalerClient from "./ImageUpscalerClient";
import ExifViewerClient from "./ExifViewerClient";
import ImageFormatConverterClient from "./ImageFormatConverterClient";
import ToolSEOContent from "@/components/tools/ToolSEOContent";
import { getToolConfig, type ToolConfig } from "@/lib/toolConfig";


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
  const config = getToolConfig(slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: config.title },
  ];

  if (slug === "jpg-to-pdf" || slug === "image-to-pdf" || slug === "photos-to-pdf") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <JspdfConverterClient toolSlug={slug as any} />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "pdf-to-jpg" || slug === "pdf-to-image") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <PdfToJpgClient toolSlug={slug as any} />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "background-remover") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <BackgroundRemoverClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "blur-image") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <BlurToolClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "image-stitcher") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <ImageStitcherClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "document-scanner") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <DocumentScannerClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "bulk-image-compressor") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <BulkCompressorClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "bulk-image-resizer") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <BulkResizerClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "passport-photo-maker") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <PassportMakerClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "image-upscaler") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <ImageUpscalerClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "image-metadata") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <ExifViewerClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  if (slug === "image-format-converter") {
    return (
      <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
        <ImageFormatConverterClient />
        <ToolSEOContent slug={slug} />
      </ToolShell>
    );
  }

  return <StandardToolPageClient slug={slug} config={config} breadcrumbs={breadcrumbs} />;
}

interface StandardProps {
  slug: string;
  config: ToolConfig;
  breadcrumbs: { label: string; href?: string }[];
}

function StandardToolPageClient({ slug, config, breadcrumbs }: StandardProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);

  // Active Tool Tab
  const [activeTab, setActiveTab] = useState<"crop" | "rotate" | "dpi" | "resize">(
    config.category === "crop"
      ? "crop"
      : config.category === "rotate" || config.category === "flip"
      ? "rotate"
      : config.category === "dpi"
      ? "dpi"
      : "resize"
  );

  // Crop State
  const [cropRect, setCropRect] = useState<CropRect | null>(null);

  // Rotate & Flip State
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);

  // DPI State
  const [dpi, setDpi] = useState<number>(300);

  // Resize & Format State
  const [resizeMode, setResizeMode] = useState<"percentage" | "dimensions">(
    config.defaultWidth || config.defaultHeight ? "dimensions" : "percentage"
  );
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [targetWidth, setTargetWidth] = useState<number>(config.defaultWidth || 0);
  const [targetHeight, setTargetHeight] = useState<number>(config.defaultHeight || 0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  // Compression State
  const [enableTargetKB, setEnableTargetKB] = useState<boolean>(config.category === "compress");
  const [targetKB, setTargetKB] = useState<number>(50);
  const [format, setFormat] = useState<string>(config.outputFormat || config.defaultFormat || "image/jpeg");

  const handleTargetKBChange = (kb: number) => {
    const validKB = Math.max(1, kb);
    setTargetKB(validKB);
    setEnableTargetKB(true);
    if (originalFile) {
      process(
        originalFile,
        targetWidth,
        targetHeight,
        scalePercent,
        resizeMode,
        true,
        validKB,
        format,
        cropRect,
        rotation,
        flipHorizontal,
        flipVertical,
        dpi
      );
    }
  };

  // Output Results State
  const [processedDataUrl, setProcessedDataUrl] = useState<string | undefined>(undefined);
  const [processedInfo, setProcessedInfo] = useState<ImageInfo | undefined>(undefined);
  const [processedBlob, setProcessedBlob] = useState<Blob | undefined>(undefined);

  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | undefined>(undefined);

  const handleFileSelect = async (
    file: File,
    options?: { docType?: "photo" | "signature"; requirement?: { width: number; height: number; minKB: number; maxKB: number; format: string } }
  ) => {
    setOriginalFile(file);
    setIsProcessing(true);

    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);

      const initialW = options?.requirement?.width || config.defaultWidth || info.width;
      const initialH = options?.requirement?.height || config.defaultHeight || info.height;
      const targetSizeKB = options?.requirement?.maxKB || (config.presetKBs ? config.presetKBs[0] : 50);

      setTargetWidth(initialW);
      setTargetHeight(initialH);
      setScalePercent(100);
      if (options?.requirement?.maxKB) {
        setTargetKB(targetSizeKB);
        setEnableTargetKB(true);
      }

      await process(
        file,
        initialW,
        initialH,
        100,
        options?.requirement ? "dimensions" : resizeMode,
        options?.requirement?.maxKB ? true : enableTargetKB,
        targetSizeKB,
        format,
        null,
        0,
        false,
        false,
        dpi
      );
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
    fmt: string = format,
    crop: CropRect | null = cropRect,
    rot: number = rotation,
    flipH: boolean = flipHorizontal,
    flipV: boolean = flipVertical,
    targetDpi: number = dpi
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const result = await processImage(file, {
        crop: crop || undefined,
        rotation: rot,
        flipHorizontal: flipH,
        flipVertical: flipV,
        dpi: targetDpi,
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
        dpi: result.dpi,
      });

      // Track successful processing events
      if (slug.includes("signature")) {
        trackEvent("signature_resize", {
          tool_name: slug,
          target_width: result.width,
          target_height: result.height,
          output_format: result.format,
        });
      } else if (config.category === "resize" || mode === "dimensions" || pct !== 100) {
        trackEvent("image_resize", {
          tool_name: slug,
          target_width: result.width,
          target_height: result.height,
          output_format: result.format,
        });
      }

      if (useKB || config.category === "compress") {
        trackEvent("image_compress", {
          tool_name: slug,
          target_kb: kb,
          output_format: result.format,
        });
      }

      const val = await validateOutput(result.blob, {
        width: result.width,
        height: result.height,
        minKB: 0,
        maxKB: useKB ? kb : 5000,
        format: fmt === "image/jpeg" ? "JPG" : fmt === "image/png" ? "PNG" : "WEBP",
        dpi: targetDpi,
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
    setCropRect(null);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setDpi(300);
  };

  useEffect(() => {
    if (originalFile) {
      process(
        originalFile,
        targetWidth,
        targetHeight,
        scalePercent,
        resizeMode,
        enableTargetKB,
        targetKB,
        format,
        cropRect,
        rotation,
        flipHorizontal,
        flipVertical,
        dpi
      );
    }
  }, [
    targetWidth,
    targetHeight,
    scalePercent,
    resizeMode,
    enableTargetKB,
    targetKB,
    format,
    keepAspectRatio,
    cropRect,
    rotation,
    flipHorizontal,
    flipVertical,
    dpi,
  ]);

  const getDownloadFilename = () => {
    return getShortDownloadFilename(originalFile, "edit", format);
  };

  return (
    <ToolShell title={config.title} subtitle={config.subtitle} breadcrumbs={breadcrumbs}>
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          accept={config.accept || "image/jpeg,image/png,image/webp"}
          label={config.uploadLabel || `Upload image to use ${config.title}`}
          sublabel={config.uploadSublabel || "Supports JPG, PNG, WEBP, GIF files up to 10MB"}
          toolName={slug}
          toolTitle={config.title}
          showExamSelector={slug === "image-resizer"}
          showDocTypeSelector={slug === "image-resizer"}
          initialDocType={slug.includes("signature") ? "signature" : "photo"}
          customRequirements={{
            width: config.defaultWidth || targetWidth || 300,
            height: config.defaultHeight || targetHeight || 300,
            minKB: 10,
            maxKB: enableTargetKB ? targetKB : (config.presetKBs ? config.presetKBs[0] : 50),
            format: format === "image/png" ? "PNG" : format === "image/webp" ? "WEBP" : "JPG",
          }}
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Tool Navigation Bar */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1.5 border border-slate-200/80 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("crop")}
              className={`flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "crop"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <HiOutlineScissors className="w-4 h-4" />
              Crop Image
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rotate")}
              className={`flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "rotate"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <HiOutlineArrowPath className="w-4 h-4" />
              Rotate & Flip
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dpi")}
              className={`flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "dpi"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <HiOutlineAdjustmentsVertical className="w-4 h-4" />
              Change DPI
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("resize")}
              className={`flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "resize"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4" />
              Resize & Compress
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeTab === "crop" && (
            <ImageCropper
              file={originalFile}
              originalInfo={originalInfo}
              cropRect={cropRect}
              onCropChange={setCropRect}
              onResetCrop={() => setCropRect(null)}
              isSignatureTool={slug === "signature-cropper"}
              toolName={slug}
            />
          )}

          {activeTab === "rotate" && (
            <RotateFlipControls
              rotation={rotation}
              onRotationChange={setRotation}
              flipHorizontal={flipHorizontal}
              onFlipHorizontalChange={setFlipHorizontal}
              flipVertical={flipVertical}
              onFlipVerticalChange={setFlipVertical}
              onReset={() => {
                setRotation(0);
                setFlipHorizontal(false);
                setFlipVertical(false);
              }}
              toolName={slug}
            />
          )}

          {activeTab === "dpi" && (
            <DpiControls dpi={dpi} onDpiChange={setDpi} toolName={slug} />
          )}

          {activeTab === "resize" && (
            <CompressionControls
              targetKB={targetKB}
              onTargetKBChange={handleTargetKBChange}
              enableTargetKB={enableTargetKB}
              onEnableTargetKBChange={(enabled) => {
                setEnableTargetKB(enabled);
                if (originalFile) {
                  process(
                    originalFile,
                    targetWidth,
                    targetHeight,
                    scalePercent,
                    resizeMode,
                    enabled,
                    targetKB,
                    format,
                    cropRect,
                    rotation,
                    flipHorizontal,
                    flipVertical,
                    dpi
                  );
                }
              }}
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
              presetKBs={config.presetKBs || [10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500]}
              toolName={slug}
            />
          )}

          {/* Interactive Live Preview Panel */}
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
                    dpi: dpi,
                  }}
                />
              )}

              <DownloadPanel
                blob={processedBlob}
                filename={getDownloadFilename()}
                onReset={handleReset}
                isValid={validation?.valid}
                toolName={slug}
                outputFormat={processedInfo.format}
                targetKB={enableTargetKB ? targetKB : undefined}
                targetWidth={processedInfo.width}
                targetHeight={processedInfo.height}
              />
            </>
          )}
        </div>
      )}

      {/* HIGH DENSITY CONTENT & SEO SECTION FOR ADSENSE COMPLIANCE */}
      <ToolSEOContent slug={slug} />
    </ToolShell>
  );
}
