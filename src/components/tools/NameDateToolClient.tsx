"use client";

import { useState } from "react";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import {
  addTextOverlay,
  getImageInfo,
  compressToRange,
  type ImageInfo,
  type ProcessingResult,
} from "@/lib/imageProcessor";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function getTodayDDMMYYYY(): string {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

interface NameDateToolClientProps {
  includeDate?: boolean;
}

export default function NameDateToolClient({ includeDate = true }: NameDateToolClientProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [name, setName] = useState<string>("CANDIDATE NAME");
  const [dop, setDop] = useState<string>(getTodayDDMMYYYY());
  const [dob, setDob] = useState<string>("");
  const [position, setPosition] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom-center"
  >("bottom-center");
  const [targetKB, setTargetKB] = useState<number>(50);
  const [targetWidth, setTargetWidth] = useState<number>(275);
  const [targetHeight, setTargetHeight] = useState<number>(354);

  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImageWithOverlay = async (
    file: File = originalFile!,
    currentName: string = name,
    currentDop: string = dop,
    currentDob: string = dob,
    currentPos: typeof position = position,
    w: number = targetWidth,
    h: number = targetHeight,
    kb: number = targetKB
  ) => {
    if (!file) return;
    setIsProcessing(true);
    try {
      // 1. Add text overlay with optional Name, DOP, and DOB
      const overlayResult = await addTextOverlay(file, {
        name: currentName.trim() || undefined,
        dop: currentDop.trim() || undefined,
        dob: currentDob.trim() || undefined,
        position: currentPos,
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        opacity: 1.0,
      });

      // 2. Convert overlay blob to File
      const tempFile = new File([overlayResult.blob], file.name, { type: "image/jpeg" });

      // 3. Compress & Resize to exact boundaries
      const finalResult = await compressToRange(tempFile, 10, kb, w, h, "image/jpeg");
      setResult(finalResult);
    } catch (err) {
      console.error("Processing with overlay failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      const w = info.width || 275;
      const h = info.height || 354;
      setTargetWidth(w);
      setTargetHeight(h);
      await processImageWithOverlay(file, name, dop, dob, position, w, h, targetKB);
    } catch (err) {
      console.error("Failed to load image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyOverlay = () => {
    if (originalFile) {
      processImageWithOverlay();
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
    setName("CANDIDATE NAME");
    setDop(getTodayDDMMYYYY());
    setDob("");
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools/image-resizer" },
    { label: "Add Name & Date" },
  ];

  return (
    <ToolShell
      title="Add Name, DOP & DOB to Photo Online"
      subtitle="Overlay candidate name, Date of Photo (DOP), and/or Date of Birth (DOB) onto your photograph for official SSC, UPSC, and government recruitment forms."
      breadcrumbs={breadcrumbs}
    >
      {!originalFile ? (
        <UploadDropzone
          onFileSelect={handleFileSelect}
          label="Upload photo to add name & date"
          sublabel="Supports JPG, PNG, WEBP files up to 10MB"
        />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Controls box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600 shrink-0" />
              Text Overlay Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Candidate Full Name <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  {name && (
                    <button
                      type="button"
                      onClick={() => setName("")}
                      className="text-[11px] text-gray-400 hover:text-red-500 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. RAHUL KUMAR"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium uppercase"
                />
              </div>

              {/* DOP Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Date of Photo (DOP) <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  {dop && (
                    <button
                      type="button"
                      onClick={() => setDop("")}
                      className="text-[11px] text-gray-400 hover:text-red-500 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={dop}
                    onChange={(e) => setDop(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium pr-16"
                  />
                  <button
                    type="button"
                    onClick={() => setDop(getTodayDDMMYYYY())}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold px-2 py-1 rounded-md transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* DOB Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Date of Birth (DOB) <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  {dob && (
                    <button
                      type="button"
                      onClick={() => setDob("")}
                      className="text-[11px] text-gray-400 hover:text-red-500 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
                />
              </div>

              {/* Text Position */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Text Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as typeof position)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
                >
                  <option value="bottom-center">Bottom Center (Standard SSC/UPSC)</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                </select>
              </div>

              {/* Target KB */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Target File Size (KB)
                </label>
                <select
                  value={targetKB}
                  onChange={(e) => {
                    const kb = Number(e.target.value);
                    setTargetKB(kb);
                  }}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-indigo-500 outline-none font-medium"
                >
                  <option value={50}>Max 50 KB (SSC Standard)</option>
                  <option value={20}>Max 20 KB</option>
                  <option value={100}>Max 100 KB</option>
                  <option value={200}>Max 200 KB (UPSC Standard)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleApplyOverlay}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Apply Text & Resize"}
              </button>
            </div>
          </div>

          {/* Preview */}
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

          {/* Result Badges & Download */}
          {result && (
            <>
              <ValidationBadges
                checks={{
                  dimensions: true,
                  fileSize: result.size / 1024 <= targetKB + 1,
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
                  minKB: 10,
                  maxKB: targetKB,
                  format: "JPG",
                }}
              />

              <DownloadPanel
                blob={result.blob}
                filename="photo-with-name-date.jpg"
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}
    </ToolShell>
  );
}
