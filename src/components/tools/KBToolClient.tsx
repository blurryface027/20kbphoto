"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import CompressionControls from "@/components/tools/CompressionControls";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import { processImage, getImageInfo, getMimeType, type ImageInfo, type ProcessingResult } from "@/lib/imageProcessor";

interface KBToolClientProps {
  targetKB: number;
}

export default function KBToolClient({ targetKB: initialTargetKB }: KBToolClientProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [currentTargetKB, setCurrentTargetKB] = useState<number>(initialTargetKB);
  const [enableTargetKB, setEnableTargetKB] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("image/jpeg");
  const [resizeMode, setResizeMode] = useState<"percentage" | "dimensions">("percentage");
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      setTargetWidth(info.width);
      setTargetHeight(info.height);
      setScalePercent(100);

      await process(file, currentTargetKB, format, 100, "percentage", info.width, info.height, enableTargetKB);
    } catch (err) {
      console.error("Processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const process = async (
    file: File = originalFile!,
    kb: number = currentTargetKB,
    fmt: string = format,
    pct: number = scalePercent,
    mode: "percentage" | "dimensions" = resizeMode,
    w: number = targetWidth,
    h: number = targetHeight,
    useKB: boolean = enableTargetKB
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const res = await processImage(file, {
        targetKB: useKB ? kb : undefined,
        format: fmt,
        scalePercent: mode === "percentage" ? pct : undefined,
        width: mode === "dimensions" ? w : undefined,
        height: mode === "dimensions" ? h : undefined,
      });
      setResult(res);
    } catch (err) {
      console.error("Compression processing error:", err);
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

  useEffect(() => {
    if (originalFile) {
      process(originalFile, currentTargetKB, format, scalePercent, resizeMode, targetWidth, targetHeight, enableTargetKB);
    }
  }, [currentTargetKB, format, scalePercent, resizeMode, targetWidth, targetHeight, enableTargetKB, keepAspectRatio]);

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
  };

  const getDownloadFilename = () => {
    if (!originalFile) return `image-${currentTargetKB}kb.jpg`;
    const name = originalFile.name;
    const lastDot = name.lastIndexOf(".");
    const baseName = lastDot > 0 ? name.substring(0, lastDot) : name;
    const ext = format === "image/jpeg" ? "jpg" : format === "image/png" ? "png" : "webp";
    return `${baseName}-${currentTargetKB}kb.${ext}`;
  };

  const relatedSizes = [10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500].filter(
    (s) => s !== currentTargetKB
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: `Resize to ${currentTargetKB}KB` },
  ];

  const faqs = [
    {
      question: `How do I compress an image to under ${currentTargetKB}KB?`,
      answer: `Upload your image file (JPG, PNG, WEBP). Our browser binary-search compressor automatically optimizes image encoding quality until the output file size is strictly under ${currentTargetKB}KB.`,
    },
    {
      question: "Is my photo uploaded to any server during compression?",
      answer: "No. 100% of image compression happens locally inside your browser's memory using HTML5 Canvas API technology. Your photo never leaves your device.",
    },
    {
      question: `Which government exam forms require ${currentTargetKB}KB photo size?`,
      answer: `Many central and state government recruitment portals (including SSC CGL, IBPS PO, RRB NTPC, UPSC, and State PSCs) strictly require photograph or signature uploads between 10KB and ${currentTargetKB}KB.`,
    },
  ];

  const isSizeValid = result ? (result.size / 1024) <= currentTargetKB : false;

  return (
    <ToolShell
      title={`Resize Image to ${currentTargetKB}KB Online`}
      subtitle={`Compress and reduce any photo or signature image file size to strictly ${currentTargetKB}KB or less for online forms and application portals.`}
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label={`Upload image to resize to ${currentTargetKB}KB`}
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          <CompressionControls
            targetKB={currentTargetKB}
            onTargetKBChange={setCurrentTargetKB}
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
            showDimensions={true}
            showFormat={true}
            showCompression={true}
            presetKBs={[10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500]}
          />

          <PreviewPanel
            originalFile={originalFile}
            originalInfo={originalInfo}
            processedDataUrl={result?.dataUrl}
            processedInfo={
              result
                ? {
                    width: result.width,
                    height: result.height,
                    size: result.size,
                    format: result.format,
                    quality: result.quality,
                  }
                : undefined
            }
            isProcessing={isProcessing}
          />

          {result && (
            <>
              <ValidationBadges
                checks={{
                  dimensions: true,
                  fileSize: isSizeValid,
                  format: result ? getMimeType(result.format) === getMimeType(format) : true,
                }}
                details={{
                  width: result.width,
                  height: result.height,
                  size: result.size,
                  format: result.format,
                }}
                requirements={{
                  width: result.width,
                  height: result.height,
                  minKB: 0,
                  maxKB: currentTargetKB,
                  format: format === "image/jpeg" ? "JPG" : format === "image/png" ? "PNG" : "WEBP",
                }}
              />
              <DownloadPanel
                blob={result.blob}
                filename={getDownloadFilename()}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Other Exact Size Compressors</h3>
        <div className="flex flex-wrap gap-2">
          {relatedSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setCurrentTargetKB(size)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                currentTargetKB === size
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 border-gray-200 hover:border-indigo-300"
              }`}
            >
              Resize to {size}KB
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
