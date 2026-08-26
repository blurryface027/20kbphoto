"use client";

import { useState } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import { resizeImage, getImageInfo, type ImageInfo, type ProcessingResult } from "@/lib/imageProcessor";

interface DimensionToolClientProps {
  targetWidth: number;
  targetHeight: number;
  type?: "image" | "signature";
}

export default function DimensionToolClient({
  targetWidth,
  targetHeight,
  type = "image",
}: DimensionToolClientProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      const res = await resizeImage(file, targetWidth, targetHeight);
      setResult(res);
    } catch (err) {
      console.error("Resizing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
  };

  const isSig = type === "signature";
  const title = `Resize ${isSig ? "Signature" : "Image"} to ${targetWidth}×${targetHeight} Pixels`;
  const subtitle = `Crop and resize your ${isSig ? "signature" : "photo"} to exactly ${targetWidth}×${targetHeight} px online. Perfect for official exam forms.`;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: `${targetWidth}×${targetHeight} px` },
  ];

  const faqs = [
    {
      question: `How do I resize a ${isSig ? "signature" : "photo"} to ${targetWidth}×${targetHeight} pixels?`,
      answer: `Upload your file (JPG, PNG, WEBP). Our online resizer will automatically crop and scale your image to exact ${targetWidth}×${targetHeight} px dimensions while preserving crisp legibility.`,
    },
    {
      question: "Is my uploaded image saved on any server?",
      answer: "No. All rendering and resizing processes occur 100% locally inside your browser using HTMLCanvas API. No data is sent to external servers.",
    },
  ];

  return (
    <ToolShell title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} faqs={faqs}>
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label={`Upload ${isSig ? "signature" : "image"} to resize to ${targetWidth}×${targetHeight} px`}
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
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
                  dimensions: result.width === targetWidth && result.height === targetHeight,
                  fileSize: true,
                  format: true,
                }}
                details={{
                  width: result.width,
                  height: result.height,
                  size: result.size,
                  format: result.format,
                }}
                requirements={{
                  width: targetWidth,
                  height: targetHeight,
                  minKB: 0,
                  maxKB: 500,
                  format: "JPG/PNG",
                }}
              />
              <DownloadPanel
                blob={result.blob}
                filename={`${isSig ? "signature" : "photo"}-${targetWidth}x${targetHeight}.jpg`}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}
    </ToolShell>
  );
}
