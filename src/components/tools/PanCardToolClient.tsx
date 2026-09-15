"use client";

import { useState } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import {
  processImage,
  getImageInfo,
  type ImageInfo,
  type ProcessingResult,
} from "@/lib/imageProcessor";
import { trackEvent } from "@/lib/gtag";
import { HiOutlineCreditCard, HiOutlineCamera, HiOutlinePencilSquare, HiOutlineCheckCircle } from "react-icons/hi2";

export default function PanCardToolClient() {
  const [mode, setMode] = useState<"photo" | "signature">("photo");

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Specs
  const currentWidth = mode === "photo" ? 213 : 444;
  const currentHeight = mode === "photo" ? 213 : 205;
  const maxKB = mode === "photo" ? 50 : 30;
  const targetLabel = mode === "photo" ? "PAN Card Passport Photo (213×213 px)" : "PAN Card Signature (444×205 px)";

  const processPanImage = async (file: File, m: "photo" | "signature" = mode) => {
    setIsProcessing(true);
    try {
      const w = m === "photo" ? 213 : 444;
      const h = m === "photo" ? 213 : 205;
      const kb = m === "photo" ? 50 : 30;
      const toolSlug = `pan-card-${m}-resizer`;

      const res = await processImage(file, {
        width: w,
        height: h,
        minKB: 10,
        maxKB: kb,
        format: "image/jpeg",
        dpi: 300,
      });
      setResult(res);

      if (m === "signature") {
        trackEvent("signature_resize", {
          tool_name: toolSlug,
          target_width: w,
          target_height: h,
          output_format: res.format,
        });
      } else {
        trackEvent("image_resize", {
          tool_name: toolSlug,
          target_width: w,
          target_height: h,
          output_format: res.format,
        });
      }

      trackEvent("image_compress", {
        tool_name: toolSlug,
        target_kb: kb,
        output_format: res.format,
      });
    } catch (err) {
      console.error("PAN card image processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      await processPanImage(file, mode);
    } catch (err) {
      console.error("Failed to load file:", err);
    }
  };

  const handleModeChange = (newMode: "photo" | "signature") => {
    setMode(newMode);
    if (originalFile) {
      processPanImage(originalFile, newMode);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "PAN Card Photo Resizer" },
  ];

  const faqs = [
    {
      question: "What is the exact photo size for PAN Card online application?",
      answer: "According to NSDL (Protean) and UTIITSL guidelines, the photograph must be exactly 213 × 213 pixels (2.5 cm × 2.5 cm), formatted as JPEG/JPG, and under 50 KB in file size.",
    },
    {
      question: "What is the signature requirement for PAN Card portal?",
      answer: "The signature image for NSDL and UTIITSL online PAN applications must be 444 × 205 pixels (4.5 cm × 2.0 cm), formatted as JPEG, and strictly under 30 KB (or 50 KB depending on portal prompt).",
    },
    {
      question: "Is 300 DPI resolution applied to the photo?",
      answer: "Yes, our PAN Card photo resizer formats your photo at 300 DPI at 213×213 pixels so it passes official portal validation checkmarks without error.",
    },
  ];

  const isSizeValid = result ? (result.size / 1024) >= 10 && (result.size / 1024) <= maxKB : false;

  return (
    <ToolShell
      title="PAN Card Photo & Signature Resizer Online"
      subtitle="Resize and compress photos and signatures for NSDL (Protean) and UTIITSL online PAN card application forms to exact 213×213 px / 444×205 px and 300 DPI."
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      {/* Mode Switcher */}
      <div className="max-w-xl mx-auto mb-8 bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200">
        <button
          onClick={() => handleModeChange("photo")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === "photo"
              ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <HiOutlineCamera className="w-4 h-4" />
          PAN Photo (213×213 px)
        </button>
        <button
          onClick={() => handleModeChange("signature")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            mode === "signature"
              ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <HiOutlinePencilSquare className="w-4 h-4" />
          PAN Signature (444×205 px)
        </button>
      </div>

      {/* Info Badge Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-900 font-semibold">
        <div className="flex items-center gap-2">
          <HiOutlineCreditCard className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>Active Target: <strong>{targetLabel}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-white px-2.5 py-1 rounded-lg border border-indigo-200 text-indigo-700 font-bold">
            300 DPI
          </span>
          <span className="bg-white px-2.5 py-1 rounded-lg border border-indigo-200 text-indigo-700 font-bold">
            10 – {maxKB} KB
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
            NSDL / UTIITSL Ready
          </span>
        </div>
      </div>

      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label={`Click or drop ${mode === "photo" ? "Photograph" : "Signature"} for PAN Card`}
          sublabel="JPG, PNG, HEIC, or WEBP up to 15MB"
          toolName={`pan-card-${mode}-resizer`}
          toolTitle={`PAN Card ${mode === "photo" ? "Photo" : "Signature"} Resizer`}
          initialDocType={mode}
          customRequirements={{
            width: currentWidth,
            height: currentHeight,
            minKB: 10,
            maxKB: maxKB,
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
                  dimensions: result.width === currentWidth && result.height === currentHeight,
                  fileSize: isSizeValid,
                  format: true,
                }}
                details={{
                  width: result.width,
                  height: result.height,
                  size: result.size,
                  format: result.format,
                }}
                requirements={{
                  width: currentWidth,
                  height: currentHeight,
                  minKB: 10,
                  maxKB: maxKB,
                  format: "JPG",
                }}
              />

              <DownloadPanel
                blob={result.blob}
                filename={mode === "photo" ? "pancard-photo-213x213.jpg" : "pancard-signature-444x205.jpg"}
                onReset={handleReset}
                isValid={isSizeValid}
                toolName={`pan-card-${mode}-resizer`}
                outputFormat={result.format}
                targetKB={maxKB}
                targetWidth={currentWidth}
                targetHeight={currentHeight}
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
            Complete PAN Card Photo & Signature Specifications Guide
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Applying for a new PAN card or correcting details on NSDL (Protean) or UTIITSL online portals? Both portals strictly enforce physical millimeter & pixel dimensions, maximum file size in KB, and 300 DPI resolution.
          </p>
        </div>

        {/* NSDL & UTIITSL SPECIFICATIONS MATRIX TABLE */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden max-w-4xl mx-auto">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base">
              PAN Card Document Specification Summary
            </h3>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              NSDL / UTIITSL Official Specs
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">PAN Photo Requirements</th>
                  <th className="py-3 px-4">PAN Signature Requirements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Pixel Dimensions</td>
                  <td className="py-3 px-4 text-indigo-600 font-bold">213 × 213 pixels</td>
                  <td className="py-3 px-4 text-indigo-600 font-bold">444 × 205 pixels</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Physical Size</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">2.5 cm × 2.5 cm</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">4.5 cm × 2.0 cm</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">File Size Limit</td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">Max 50 KB (10KB – 50KB)</td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">Max 30 KB (10KB – 30KB)</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">Resolution (DPI)</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">300 DPI Required</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">300 DPI Required</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50/40">File Format</td>
                  <td className="py-3 px-4 font-mono">JPEG / JPG</td>
                  <td className="py-3 px-4 font-mono">JPEG / JPG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="bg-gray-50/70 border border-gray-200/80 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
            How to Prepare Photo & Signature for Online PAN Card Portal
          </h3>
          <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <li>Select &ldquo;PAN Photo (213×213 px)&rdquo; or &ldquo;PAN Signature (444×205 px)&rdquo; from the top toggle bar.</li>
            <li>Upload your original photo scan or signature photo.</li>
            <li>Our tool automatically resizes the image to exact NSDL pixel dimensions and embeds 300 DPI EXIF headers.</li>
            <li>The binary compressor adjusts JPEG quality to keep file size strictly under 50KB (for photo) or 30KB (for signature).</li>
            <li>Download the processed JPEG file and upload directly to NSDL e-Gov / UTIITSL PAN portal.</li>
          </ol>
        </div>
      </section>
    </ToolShell>
  );
}
