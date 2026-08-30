"use client";

import { useState } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import { resizeImage, getImageInfo, type ImageInfo, type ProcessingResult } from "@/lib/imageProcessor";
import { trackEvent } from "@/lib/gtag";

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

  const isSig = type === "signature";
  const toolSlug = `${isSig ? "signature" : "image"}-resizer-${targetWidth}x${targetHeight}`;

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      const res = await resizeImage(file, targetWidth, targetHeight);
      setResult(res);

      if (isSig) {
        trackEvent("signature_resize", {
          tool_name: toolSlug,
          target_width: targetWidth,
          target_height: targetHeight,
          output_format: res.format,
        });
      } else {
        trackEvent("image_resize", {
          tool_name: toolSlug,
          target_width: targetWidth,
          target_height: targetHeight,
          output_format: res.format,
        });
      }
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
          label={`Click or drop ${isSig ? "signature" : "image"} to resize to ${targetWidth}×${targetHeight} px`}
          sublabel="JPG, PNG, HEIC, or WEBP up to 15MB"
          toolName={toolSlug}
          toolTitle={`${targetWidth}×${targetHeight} px ${isSig ? "Signature" : "Image"} Resizer`}
          initialDocType={isSig ? "signature" : "photo"}
          customRequirements={{
            width: targetWidth,
            height: targetHeight,
            minKB: 10,
            maxKB: 100,
            format: "JPG",
          }}
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
                    dpi: result.dpi,
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
                isValid={result.width === targetWidth && result.height === targetHeight}
                toolName={toolSlug}
                outputFormat={result.format}
                targetWidth={targetWidth}
                targetHeight={targetHeight}
              />
            </>
          )}
        </div>
      )}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {isSig ? "Signature" : "Photo"} Resizer for {targetWidth}×{targetHeight} Pixels
        </h2>

        <div className="space-y-4 text-gray-700 leading-7">
          <p>
            Resize your {isSig ? "signature" : "photo"} to exactly {targetWidth}×{targetHeight} pixels
            using this free browser-based image tool. The output dimensions are fixed to the
            selected width and height for forms and online applications.
          </p>

          <h3 className="text-xl font-semibold text-gray-900">
            When do you need {targetWidth}×{targetHeight}px?
          </h3>

          <p>
            Exact pixel dimensions are often required when an application portal specifies a
            fixed image size. Always check the official application instructions for the
            required file format, maximum file size, background, and other requirements.
          </p>

          <h3 className="text-xl font-semibold text-gray-900">
            How to resize to {targetWidth}×{targetHeight}px
          </h3>

          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your {isSig ? "signature" : "photo"}.</li>
            <li>The tool reads the original image dimensions in your browser.</li>
            <li>The image is cropped and resized to {targetWidth}×{targetHeight}px.</li>
            <li>Review the generated image and its dimensions.</li>
            <li>Download the resized file.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900">
            Is the uploaded image stored?
          </h3>

          <p>
            No. Image processing is performed locally in your browser. Your original image
            does not need to be sent to our server for resizing.
          </p>
        </div>
      </section>

    </ToolShell>
  );
}
