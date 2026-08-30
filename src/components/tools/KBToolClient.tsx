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
import { trackEvent } from "@/lib/gtag";
import { getShortDownloadFilename } from "@/lib/filenameUtils";

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

  useEffect(() => {
    setCurrentTargetKB(initialTargetKB);
  }, [initialTargetKB]);

  const handleTargetKBChange = (kb: number) => {
    const validKB = Math.max(1, kb);
    setCurrentTargetKB(validKB);
    setEnableTargetKB(true);
    if (originalFile) {
      process(
        originalFile,
        validKB,
        format,
        scalePercent,
        resizeMode,
        targetWidth,
        targetHeight,
        true
      );
    }
  };

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

      trackEvent("image_compress", {
        tool_name: `resize-image-to-${currentTargetKB}kb`,
        target_kb: kb,
        output_format: res.format,
      });
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
    return getShortDownloadFilename(originalFile, `${currentTargetKB}kb`, format);
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

  const sizeGuidance =
  currentTargetKB <= 30
    ? {
        title: `How to get good quality at ${currentTargetKB}KB`,
        text: `A ${currentTargetKB}KB limit is a strict image-size constraint. If your original photo is large, reducing unnecessary pixel dimensions before compression can help preserve more detail. For application uploads, keep the required dimensions unchanged when the official instructions specify exact pixel sizes.`,
        tips: [
          `Use the exact pixel dimensions required by the application.`,
          `Prefer JPEG for photographs when the application accepts it.`,
          `Avoid repeatedly re-saving an already compressed image.`,
          `Check the final file size before uploading.`,
        ],
      }
    : currentTargetKB <= 70
      ? {
          title: `Preparing a photo for a ${currentTargetKB}KB upload limit`,
          text: `${currentTargetKB}KB is a common type of file-size constraint for online forms. The best result usually comes from keeping the required dimensions while adjusting image encoding quality until the file fits the permitted size.`,
          tips: [
            `Start with the original image rather than a previously compressed copy.`,
            `Keep the required width and height when an application specifies them.`,
            `Use JPEG for ordinary photographs when permitted.`,
            `Verify both file size and image dimensions before submission.`,
          ],
        }
      : currentTargetKB <= 200
        ? {
            title: `How to prepare a higher-quality ${currentTargetKB}KB image`,
            text: `A ${currentTargetKB}KB limit gives an image more room for visual detail than very small upload limits. This can be useful when an application permits a larger photograph or document image while still imposing a maximum file size.`,
            tips: [
              `Keep the original resolution when the application allows it.`,
              `Resize only when the required dimensions are different.`,
              `Choose an appropriate output format for the type of image.`,
              `Confirm that the final file stays within the application's maximum size.`,
            ],
          }
        : {
            title: `When to use a ${currentTargetKB}KB image`,
            text: `A ${currentTargetKB}KB limit is suitable for upload systems that allow relatively larger image files. A larger file-size allowance can help retain image detail, but the official application requirements should always determine the final dimensions and format.`,
            tips: [
              `Follow the application's specified pixel dimensions.`,
              `Use the largest permitted file size only when it is useful for image quality.`,
              `Avoid unnecessarily increasing dimensions just to reach the file-size limit.`,
              `Check the final format and file size before submission.`,
            ],
          };

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
          label={`Click or drop image to resize to ${currentTargetKB}KB`}
          sublabel="JPG, PNG, HEIC, or WEBP up to 15MB"
          toolName={`resize-image-to-${currentTargetKB}kb`}
          toolTitle={`Resize Image to ${currentTargetKB}KB`}
          initialDocType="photo"
          customRequirements={{
            width: 300,
            height: 300,
            minKB: Math.max(1, Math.floor(currentTargetKB * 0.5)),
            maxKB: currentTargetKB,
            format: "JPG",
          }}
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          <CompressionControls
            targetKB={currentTargetKB}
            onTargetKBChange={handleTargetKBChange}
            enableTargetKB={enableTargetKB}
            onEnableTargetKBChange={(enabled) => {
              setEnableTargetKB(enabled);
              if (originalFile) {
                process(
                  originalFile,
                  currentTargetKB,
                  format,
                  scalePercent,
                  resizeMode,
                  targetWidth,
                  targetHeight,
                  enabled
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
            showDimensions={true}
            showFormat={true}
            showCompression={true}
            presetKBs={[10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500]}
            toolName={`resize-image-to-${currentTargetKB}kb`}
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
                isValid={isSizeValid}
                toolName={`resize-image-to-${currentTargetKB}kb`}
                outputFormat={result.format}
                targetKB={currentTargetKB}
                targetWidth={result.width}
                targetHeight={result.height}
              />
            </>
          )}
        </div>
      )}

      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resize an Image to {currentTargetKB}KB Online
        </h2>
        
        <h3 className="text-xl font-semibold text-gray-900 pt-2">
          {sizeGuidance.title}
        </h3>

        <p>
          {sizeGuidance.text}
        </p>

        <ul className="list-disc list-inside space-y-2">
          {sizeGuidance.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>

        <div className="space-y-4 text-gray-700 leading-7">
          <p>
            Need an image with a maximum size of {currentTargetKB}KB? This free
            {currentTargetKB}KB image compressor is designed for photos,
            signatures, scanned documents, and other files that need to meet a
            specific upload-size limit.
          </p>

          <p>
            Smaller targets such as {currentTargetKB}KB are useful when an
            application has a strict upload limit. Larger targets such as
            {currentTargetKB}KB can preserve more image detail while still
            keeping the file within a required size limit. The correct target
            should always match the instructions of the website or application
            where you are uploading the file.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 pt-2">
            What can you use a {currentTargetKB}KB image for?
          </h3>

          <p>
            A {currentTargetKB}KB image may be suitable for recruitment forms,
            examination applications, scholarship forms, government portals,
            identity-document submissions, profile photographs, and signature
            uploads when those services specify a {currentTargetKB}KB limit.
            File-size requirements vary between applications, so verify the
            official instructions before submitting an image.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 pt-2">
            How to reduce an image to {currentTargetKB}KB
          </h3>

          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your original JPG, PNG, or WEBP image.</li>
            <li>Set the target file size to {currentTargetKB}KB.</li>
            <li>Choose suitable image dimensions and output format.</li>
            <li>Let the browser compress the image toward the selected target.</li>
            <li>Check the final file size and download the result.</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 pt-2">
            {currentTargetKB}KB photo compression tips
          </h3>

          <p>
            If the original image is much larger than {currentTargetKB}KB,
            reducing unnecessary dimensions before compression can help retain
            better visual quality. JPEG is often useful for photographs, while
            PNG can be preferable for graphics or images requiring transparency.
            Do not change the format or dimensions if an application requires a
            specific format or pixel size.
          </p>

          <p>
            Your image is processed locally in your browser. The image does not
            need to be uploaded to our server for compression.
          </p>
        </div>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Other Exact Size Compressors</h3>
        <div className="flex flex-wrap gap-2">
          {relatedSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleTargetKBChange(size)}
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
