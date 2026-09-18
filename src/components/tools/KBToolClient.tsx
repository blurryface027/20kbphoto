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
import { HiOutlineCheckCircle, HiOutlineLockClosed } from "react-icons/hi2";

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

      {/* HIGH DENSITY CONTENT & SEO SECTION FOR ADSENSE COMPLIANCE */}
      <section className="mt-14 pt-10 border-t border-gray-200/90 space-y-10">
        {/* Main Title & Overview */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Comprehensive Guide: How to Compress Image to {currentTargetKB}KB
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {sizeGuidance.text} This tool uses a binary-search quality quantization engine to guarantee that your image file size stays strictly under {currentTargetKB}KB while maintaining optimal visual clarity.
          </p>
        </div>

        {/* TECHNICAL SPECIFICATIONS MATRIX TABLE */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base">
              {currentTargetKB}KB Image Compressor Technical Specifications
            </h3>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              Binary Search Quality Optimizer
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40 w-1/3">Target File Size Limit</td>
                  <td className="py-3 px-4 text-indigo-600 font-bold">Strictly ≤ {currentTargetKB} KB ({currentTargetKB * 1024} bytes)</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Supported Input Formats</td>
                  <td className="py-3 px-4 text-gray-700 font-mono">JPG, JPEG, PNG, WEBP, HEIC, HEIF, BMP</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Output Formats Available</td>
                  <td className="py-3 px-4 text-gray-800 font-mono font-semibold">JPG (Recommended), PNG, WEBP</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Resolution & DPI Handling</td>
                  <td className="py-3 px-4 text-gray-700">300 DPI metadata injection for official portal submission</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Browser Privacy</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">100% Client-Side HTML5 Canvas Execution • Zero Data Sent to Servers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TIPS FOR QUALITY AT THIS KB LIMIT */}
        <div className="bg-gray-50/70 border border-gray-200/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
            {sizeGuidance.title}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700">
            {sizeGuidance.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-gray-200/70 shadow-2xs font-medium">
                <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* STEP BY STEP COMPRESSION GUIDELINES */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 text-center">
            How to Compress Any Photo or Signature Image to {currentTargetKB}KB
          </h3>
          <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-3xl mx-auto bg-white p-6 rounded-3xl border border-gray-200">
            <li>Upload your original photograph, signature scan, or document image above.</li>
            <li>Verify the target file size is set to <strong className="text-indigo-600 font-bold">{currentTargetKB}KB</strong>.</li>
            <li>Optionally select custom target dimensions (e.g. 200×230 px for photos or 140×60 px for signatures).</li>
            <li>Our browser engine runs canvas quality quantization to reduce the file size below {currentTargetKB}KB.</li>
            <li>Inspect the live preview and validation badge before downloading your final ready-to-upload image.</li>
          </ol>
        </div>

        {/* APPLICATION PORTAL USAGE LIST */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 text-center">
            Common Forms Requiring a {currentTargetKB}KB Image Limit
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-medium text-gray-700">
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">SSC Exams</span>
              <span>CGL, CHSL, MTS, GD Photos & Signatures</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">Banking Forms</span>
              <span>IBPS PO, Clerk, SBI PO Signature Uploads</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">UPSC & NTA</span>
              <span>IAS, NDA, NEET, JEE Candidate Photos</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">State Govt Jobs</span>
              <span>UPPSC, BPSC, MPPSC Online Forms</span>
            </div>
          </div>
        </div>

        {/* PRIVACY GUARANTEE */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 max-w-4xl mx-auto text-xs sm:text-sm text-indigo-950 leading-relaxed">
          <h4 className="font-bold text-base mb-1.5 text-indigo-900 flex items-center gap-1.5">
            <HiOutlineLockClosed className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>100% Secure Browser Compression</span>
          </h4>
          <p>
            When compressing images to {currentTargetKB}KB on 20KBPhoto.in, all image encoding algorithms execute locally on your device. Your sensitive documents, photographs, and signatures remain 100% private and are never uploaded to any remote server or third-party cloud service.
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
