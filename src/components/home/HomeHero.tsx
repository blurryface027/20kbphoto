"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchAll } from "@/lib/searchIndex";
import UploadDropzone, { RequirementSpec } from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import ImageCropper from "@/components/tools/ImageCropper";
import RotateFlipControls from "@/components/tools/RotateFlipControls";
import {
  processImage,
  getImageInfo,
  validateOutput,
  type ImageInfo,
  type ProcessingResult,
  type ValidationResult,
  type CropRect,
} from "@/lib/imageProcessor";
import { trackEvent } from "@/lib/gtag";
import { HiOutlineScissors, HiOutlineArrowPath } from "react-icons/hi2";

const searchSuggestions = [
  "SSC CGL",
  "UPSC CSE",
  "IBPS PO",
  "NEET UG",
  "JEE Main",
  "20KB Image",
  "140×60 Signature",
  "Passport Photo",
];

export default function HomeHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Direct homepage processing state
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [activeReq, setActiveReq] = useState<RequirementSpec>({
    width: 400,
    height: 400,
    minKB: 20,
    maxKB: 300,
    format: "JPG",
  });
  const [activeDocType, setActiveDocType] = useState<"photo" | "signature">("photo");

  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);

  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validation, setValidation] = useState<ValidationResult | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"crop" | "rotate" | "none">("none");

  const handleExecuteSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const results = searchAll(trimmed);
    if (results.length > 0 && results[0].priority >= 80) {
      router.push(results[0].url);
    } else {
      router.push(`/exams?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(query);
  };

  const processHomepageImage = async (
    file: File = originalFile!,
    req: RequirementSpec = activeReq,
    crop: CropRect | null = cropRect,
    rot: number = rotation,
    flipH: boolean = flipHorizontal,
    flipV: boolean = flipVertical
  ) => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const formatMime = req.format.toLowerCase().includes("png")
        ? "image/png"
        : "image/jpeg";

      const res = await processImage(file, {
        crop: crop || undefined,
        rotation: rot,
        flipHorizontal: flipH,
        flipVertical: flipV,
        width: req.width,
        height: req.height,
        minKB: req.minKB,
        maxKB: req.maxKB,
        format: formatMime,
        dpi: 300,
      });

      setResult(res);

      trackEvent("image_resize", {
        tool_name: "homepage_direct_resizer",
        target_width: req.width,
        target_height: req.height,
        output_format: res.format,
      });

      const val = await validateOutput(res.blob, {
        width: req.width,
        height: req.height,
        minKB: req.minKB,
        maxKB: req.maxKB,
        format: req.format,
        dpi: 300,
      });
      setValidation(val);
    } catch (err) {
      console.error("Homepage direct image processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHomepageFileSelect = async (
    file: File,
    options?: { docType?: "photo" | "signature"; requirement?: RequirementSpec }
  ) => {
    setOriginalFile(file);
    const req = options?.requirement || activeReq;
    if (options?.requirement) setActiveReq(options.requirement);
    if (options?.docType) setActiveDocType(options.docType);

    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      await processHomepageImage(file, req, null, 0, false, false);
    } catch (err) {
      console.error("Failed to load file on homepage:", err);
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
    setActiveTab("none");
  };

  useEffect(() => {
    if (originalFile && (cropRect || rotation !== 0 || flipHorizontal || flipVertical)) {
      processHomepageImage(originalFile, activeReq, cropRect, rotation, flipHorizontal, flipVertical);
    }
  }, [cropRect, rotation, flipHorizontal, flipVertical]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-gray-50 border-b border-gray-200/80 py-12 sm:py-20 lg:py-24">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-100/40 via-[#1B2CC1]/15 to-blue-100/20 blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1B2CC1] animate-pulse" />
            100% Free & Private — Browser-Based Resizer
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Free Indian Exam Photo &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B2CC1] via-blue-600 to-[#15239B]">
              Signature Resizer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Automatically resize and compress your photo & signature for{" "}
            <strong className="text-gray-900 font-semibold">UPSC, SSC, IBPS, NEET, JEE</strong> and 100+ government exams to exact required dimensions & KB sizes.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-6 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl border border-gray-200 shadow-lg shadow-indigo-100/40 p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <svg
                className="ml-3 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exam preset (e.g. SSC CGL, UPSC, 20KB)..."
                className="flex-1 px-3 py-2 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                aria-label="Search for tools or exams"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-sm shrink-0 shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          <div className="mt-3.5 flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10">
            {searchSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  handleExecuteSearch(s);
                }}
                className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors font-medium shadow-xs"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Step Configuration & Upload Dropzone Section OR Live Homepage Resizer Suite */}
        <div className="mt-4 max-w-5xl mx-auto">
          {!originalFile ? (
            <UploadDropzone
              onFileSelect={handleHomepageFileSelect}
              toolName="homepage_hero_dropzone"
              showExamSelector={true}
              showDocTypeSelector={true}
              onRequirementChange={(req, docType) => {
                setActiveReq(req);
                setActiveDocType(docType);
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Tool Navigation Bar */}
              <div className="bg-gray-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 border border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "crop" ? "none" : "crop")}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "crop"
                      ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <HiOutlineScissors className="w-4 h-4" />
                  Crop Image
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === "rotate" ? "none" : "rotate")}
                  className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === "rotate"
                      ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <HiOutlineArrowPath className="w-4 h-4" />
                  Rotate & Flip
                </button>
              </div>

              {/* Active Tab Panel */}
              {activeTab === "crop" && (
                <ImageCropper
                  file={originalFile}
                  originalInfo={originalInfo}
                  cropRect={cropRect}
                  onCropChange={(rect) => setCropRect(rect)}
                  onResetCrop={() => setCropRect(null)}
                  isSignatureTool={activeDocType === "signature"}
                  toolName="homepage_hero_cropper"
                />
              )}

              {activeTab === "rotate" && (
                <RotateFlipControls
                  rotation={rotation}
                  onRotationChange={(rot: number) => setRotation(rot)}
                  flipHorizontal={flipHorizontal}
                  onFlipHorizontalChange={(f: boolean) => setFlipHorizontal(f)}
                  flipVertical={flipVertical}
                  onFlipVerticalChange={(f: boolean) => setFlipVertical(f)}
                  onReset={() => {
                    setRotation(0);
                    setFlipHorizontal(false);
                    setFlipVertical(false);
                  }}
                  toolName="homepage_hero_rotate"
                />
              )}

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

              {result && (
                <>
                  {/* Validation Badges */}
                  <ValidationBadges
                    checks={
                      validation?.checks || {
                        dimensions:
                          result.width === activeReq.width &&
                          result.height === activeReq.height,
                        fileSize:
                          result.size / 1024 >= activeReq.minKB &&
                          result.size / 1024 <= activeReq.maxKB,
                        format: true,
                        dpi: (result.dpi || 300) === 300,
                      }
                    }
                    details={
                      validation?.details || {
                        width: result.width,
                        height: result.height,
                        size: result.size,
                        format: result.format,
                        dpi: result.dpi || 300,
                      }
                    }
                    requirements={{
                      width: activeReq.width,
                      height: activeReq.height,
                      minKB: activeReq.minKB,
                      maxKB: activeReq.maxKB,
                      format: activeReq.format,
                      dpi: 300,
                    }}
                  />

                  {/* Download Panel */}
                  <DownloadPanel
                    blob={result.blob}
                    filename={`resized-${activeDocType}-${activeReq.width}x${activeReq.height}.jpg`}
                    onReset={handleReset}
                    isValid={true}
                    toolName="homepage_hero_dropzone"
                    outputFormat={result.format}
                    targetKB={activeReq.maxKB}
                    targetWidth={activeReq.width}
                    targetHeight={activeReq.height}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
