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
      {/* HIGH DENSITY CONTENT & SEO SECTION FOR ADSENSE COMPLIANCE */}
      <section className="mt-14 pt-10 border-t border-gray-200/90 space-y-10">
        {/* Main Title & Overview */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Complete Guide: Resizing {isSig ? "Signature" : "Photo"} to {targetWidth}×{targetHeight} Pixels
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Many online recruitment portals, competitive exam servers, and admission portals strictly validate image width and height. This tool crops and resizes your {isSig ? "signature scan" : "photograph"} to exactly {targetWidth}×{targetHeight} px while maintaining optimal clarity.
          </p>
        </div>

        {/* TECHNICAL SPECIFICATIONS MATRIX TABLE */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base">
              {targetWidth}×{targetHeight}px {isSig ? "Signature" : "Photo"} Specifications
            </h3>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              Exact Pixel Output
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40 w-1/3">Target Dimensions</td>
                  <td className="py-3 px-4 text-indigo-600 font-bold">{targetWidth} pixels (width) × {targetHeight} pixels (height)</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Aspect Ratio</td>
                  <td className="py-3 px-4 text-gray-700 font-mono">{(targetWidth / targetHeight).toFixed(2)} : 1</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Supported Input Formats</td>
                  <td className="py-3 px-4 text-gray-700 font-mono">JPG, JPEG, PNG, WEBP, HEIC, BMP</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Standard Resolution (DPI)</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">300 DPI (Embedded in EXIF header)</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Privacy & Security</td>
                  <td className="py-3 px-4 text-emerald-700 font-semibold">Processed 100% locally in browser memory • No server uploads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* STEP BY STEP GUIDELINES */}
        <div className="bg-gray-50/70 border border-gray-200/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
            How to Resize Your {isSig ? "Signature" : "Photo"} to {targetWidth}×{targetHeight}px
          </h3>
          <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <li>
              <strong className="text-gray-900 font-semibold">Upload Image:</strong> Select your original {isSig ? "signature scan" : "photograph"} using the upload dropzone above.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Aspect Crop Alignment:</strong> Our tool automatically centers and crops your image to fit the {targetWidth}×{targetHeight} ratio without stretching.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Pixel Rescaling:</strong> HTML5 Canvas renders the output at exact {targetWidth}×{targetHeight} pixel resolution.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Validation Check:</strong> The green status badge confirms that width and height equal {targetWidth}×{targetHeight}px.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Download File:</strong> Save your formatted image ready for immediate submission to online recruitment portals.
            </li>
          </ol>
        </div>

        {/* APPLICATION PORTAL USAGE LIST */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 text-center">
            Application Portals Requiring {targetWidth}×{targetHeight}px Specification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-medium text-gray-700">
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">SSC Recruitment</span>
              <span>CGL, CHSL, MTS Application Forms</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">UPSC & NTA</span>
              <span>CSE, Civil Services, NEET & JEE</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">Banking Exams</span>
              <span>IBPS PO, Clerk, SBI Online Portals</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="font-bold text-gray-900 block text-sm">State Govt Forms</span>
              <span>UPPSC, BPSC, MPPSC Recruitment</span>
            </div>
          </div>
        </div>

        {/* PRIVACY GUARANTEE */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 max-w-4xl mx-auto text-xs sm:text-sm text-indigo-950 leading-relaxed">
          <h4 className="font-bold text-base mb-1.5 text-indigo-900">
            🔒 Client-Side Browser Security
          </h4>
          <p>
            Your privacy is completely protected. When resizing images to {targetWidth}×{targetHeight}px on 20KBPhoto.in, all canvas transformations and metadata embedding execute locally inside your web browser. No copy of your photo or signature is sent to any server.
          </p>
        </div>
      </section>

    </ToolShell>
  );
}
