"use client";

import { useState, useEffect } from "react";
import { Exam } from "@/data/exams";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import CompressionControls from "@/components/tools/CompressionControls";
import RotateFlipControls from "@/components/tools/RotateFlipControls";
import ImageCropper from "@/components/tools/ImageCropper";
import {
  processImage,
  compressToRange,
  getImageInfo,
  validateOutput,
  setDPIInBlob,
  type ImageInfo,
  type ProcessingResult,
  type ValidationResult,
  type CropRect,
} from "@/lib/imageProcessor";
import { trackEvent } from "@/lib/gtag";
import WhatsAppChannelCTA from "@/components/tools/WhatsAppChannelCTA";

interface ExamToolClientProps {
  exam: Exam;
  type?: "photo" | "signature";
  allowDocTypeToggle?: boolean;
}

export default function ExamToolClient({
  exam,
  type = "photo",
  allowDocTypeToggle = false,
}: ExamToolClientProps) {
  const [activeDocType, setActiveDocType] = useState<"photo" | "signature">(type);
  const requirement = activeDocType === "photo" ? exam.photo : exam.signature;

  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);

  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);

  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | undefined>(undefined);

  const processExamImage = async (
    file: File = originalFile!,
    crop: CropRect | null = cropRect,
    rot: number = rotation,
    flipH: boolean = flipHorizontal,
    flipV: boolean = flipVertical,
    docType: "photo" | "signature" = activeDocType
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const activeReq = docType === "photo" ? exam.photo : exam.signature;
      const formatMime = activeReq.format.toLowerCase().includes("png") ? "image/png" : "image/jpeg";
      const targetDpi = activeReq.dpi || 300;
      
      const res = await processImage(file, {
        crop: crop || undefined,
        rotation: rot,
        flipHorizontal: flipH,
        flipVertical: flipV,
        width: activeReq.width,
        height: activeReq.height,
        minKB: activeReq.minKB,
        maxKB: activeReq.maxKB,
        format: formatMime,
        dpi: targetDpi,
      });

      setResult(res);

      const examToolSlug = `${exam.slug}-${docType}-resizer`;
      if (docType === "signature") {
        trackEvent("signature_resize", {
          tool_name: examToolSlug,
          target_width: activeReq.width,
          target_height: activeReq.height,
          output_format: res.format,
        });
      } else {
        trackEvent("image_resize", {
          tool_name: examToolSlug,
          target_width: activeReq.width,
          target_height: activeReq.height,
          output_format: res.format,
        });
      }

      if (activeReq.maxKB) {
        trackEvent("image_compress", {
          tool_name: examToolSlug,
          target_kb: activeReq.maxKB,
          output_format: res.format,
        });
      }

      const val = await validateOutput(res.blob, {
        width: activeReq.width,
        height: activeReq.height,
        minKB: activeReq.minKB,
        maxKB: activeReq.maxKB,
        format: activeReq.format,
        dpi: targetDpi,
      });
      setValidation(val);
    } catch (err) {
      console.error("Exam image processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (
    file: File,
    options?: { docType?: "photo" | "signature" }
  ) => {
    const selectedType = options?.docType || activeDocType;
    setActiveDocType(selectedType);
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      await processExamImage(file, null, 0, false, false, selectedType);
    } catch (err) {
      console.error("Failed to read file:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
    setValidation(undefined);
    setCropRect(null);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  useEffect(() => {
    if (originalFile) {
      processExamImage(originalFile, cropRect, rotation, flipHorizontal, flipVertical);
    }
  }, [cropRect, rotation, flipHorizontal, flipVertical]);

  const targetDpi = requirement.dpi || 300;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden space-y-6">
      {/* Header Requirement Bar */}
      <div className="bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
        <h3 className="font-bold text-gray-900 capitalize flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          {exam.name} {type} Specifications Locked
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg border border-indigo-200">
            {requirement.width} × {requirement.height} px
          </span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200">
            {requirement.minKB} – {requirement.maxKB} KB
          </span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg border border-purple-200">
            {requirement.format}
          </span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg border border-blue-200">
            {targetDpi} DPI
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {!originalFile ? (
          <UploadDropzone
            onFileSelect={handleFileSelect}
            label={`Click or drop ${activeDocType} for ${exam.name}`}
            sublabel={`JPG, PNG, HEIC, or WEBP up to 15MB`}
            toolName={`${exam.slug}-${activeDocType}-resizer`}
            selectedExamName={exam.name}
            selectedExamSlug={exam.slug}
            showDocTypeSelector={allowDocTypeToggle}
            initialDocType={activeDocType}
            photoRequirements={exam.photo}
            signatureRequirements={exam.signature}
          />
        ) : (
          <div className="space-y-6">
            {/* Live Preview Panel */}
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

            {/* Validation Checkmarks */}
            {result && validation && (
              <>
                <ValidationBadges
                  checks={validation.checks}
                  details={validation.details}
                  requirements={{
                    width: requirement.width,
                    height: requirement.height,
                    minKB: requirement.minKB,
                    maxKB: requirement.maxKB,
                    format: requirement.format,
                    dpi: targetDpi,
                  }}
                />

                <DownloadPanel
                  blob={result.blob}
                  filename={`${exam.slug}-${type}.${requirement.format.toLowerCase()}`}
                  onReset={handleReset}
                  isValid={validation.valid}
                  toolName={`${exam.slug}-${type}-resizer`}
                  outputFormat={result.format}
                  targetKB={requirement.maxKB}
                  targetWidth={requirement.width}
                  targetHeight={requirement.height}
                />
              </>
            )}
          </div>
        )}
      </div>

      <WhatsAppChannelCTA toolName={`${exam.name} ${activeDocType} resizer`} className="mt-8" />
    </div>
  );
}
