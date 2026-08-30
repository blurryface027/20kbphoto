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
    </ToolShell>
  );
}
