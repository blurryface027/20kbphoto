"use client";

import React, { useState, useEffect } from "react";
import { HiOutlinePhoto, HiSparkles, HiOutlineCheckCircle, HiOutlineBolt } from "react-icons/hi2";

interface PreviewPanelProps {
  originalFile?: File;
  processedDataUrl?: string;
  originalInfo?: { width: number; height: number; size: number; format: string; dpi?: number };
  processedInfo?: { width: number; height: number; size: number; format: string; quality?: number; dpi?: number };
  isProcessing?: boolean;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 KB";
  const k = 1024;
  return (bytes / k).toFixed(2) + " KB";
};

const formatTypeName = (fmt: string) => {
  if (!fmt) return "JPG";
  if (fmt.includes("jpeg") || fmt.includes("jpg") || fmt === "JPEG" || fmt === "JPG") return "JPG";
  if (fmt.includes("png") || fmt === "PNG") return "PNG";
  if (fmt.includes("webp") || fmt === "WEBP") return "WEBP";
  return fmt.replace("image/", "").toUpperCase();
};

export default function PreviewPanel({
  originalFile,
  processedDataUrl,
  originalInfo,
  processedInfo,
  isProcessing = false,
}: PreviewPanelProps) {
  const [originalDataUrl, setOriginalDataUrl] = useState<string>("");

  useEffect(() => {
    if (!originalFile) {
      setOriginalDataUrl("");
      return;
    }

    let isMounted = true;
    const reader = new FileReader();
    reader.onload = () => {
      if (isMounted && typeof reader.result === "string") {
        setOriginalDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(originalFile);

    return () => {
      isMounted = false;
    };
  }, [originalFile]);

  const calcReduction = () => {
    if (originalInfo?.size && processedInfo?.size) {
      const diff = originalInfo.size - processedInfo.size;
      const pct = (diff / originalInfo.size) * 100;
      if (pct > 0) return `${pct.toFixed(1)}% smaller`;
      if (pct < 0) return `${Math.abs(pct).toFixed(1)}% larger`;
      return "Same size";
    }
    return null;
  };

  const reductionStr = calcReduction();

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Original Image Card */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40">
        <div className="bg-slate-50/80 px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiOutlinePhoto className="w-4 h-4 text-slate-500" />
            <h3 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
              Original Image
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-200/60 px-2.5 py-0.5 rounded-full">
            Before
          </span>
        </div>

        <div className="flex-1 min-h-[260px] relative flex items-center justify-center p-5 bg-slate-100/60">
          {originalDataUrl ? (
            <img
              src={originalDataUrl}
              alt="Original Input"
              className="max-h-[300px] object-contain shadow-md border border-slate-300 rounded-none"
            />
          ) : (
            <div className="text-slate-400 text-xs font-semibold">No image loaded</div>
          )}
        </div>

        {originalInfo && (
          <div className="p-4 bg-white grid grid-cols-3 gap-2 text-xs border-t border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Dimensions</span>
              <span className="font-extrabold text-slate-900 mt-0.5">{originalInfo.width} × {originalInfo.height} px</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Size</span>
              <span className="font-extrabold text-slate-900 mt-0.5">{formatSize(originalInfo.size)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Format</span>
              <span className="font-extrabold text-slate-900 mt-0.5">{formatTypeName(originalInfo.format)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Processed Output Image Card */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 relative">
        <div className="bg-indigo-50/70 px-5 py-3.5 border-b border-indigo-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiSparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-indigo-950 text-xs uppercase tracking-wider">
              Processed & Optimized Output
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Ready
          </span>
        </div>

        <div className="flex-1 min-h-[260px] relative flex items-center justify-center p-5 bg-slate-100/60">
          {/* Floating Badges */}
          {processedInfo && !isProcessing && (
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-10">
              {reductionStr && (
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <HiOutlineBolt className="w-3.5 h-3.5" />
                  {reductionStr}
                </span>
              )}
              {processedInfo.dpi !== undefined && (
                <span className="ml-auto bg-white/90 backdrop-blur-md text-indigo-700 text-[11px] font-extrabold px-3 py-1 rounded-full border border-indigo-200 shadow-sm flex items-center gap-1">
                  <HiOutlineCheckCircle className="w-3.5 h-3.5 text-indigo-600" />
                  DPI: {processedInfo.dpi}
                </span>
              )}
            </div>
          )}

          {isProcessing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-600 text-xs font-bold">Optimizing Image...</span>
            </div>
          ) : processedDataUrl ? (
            <img
              src={processedDataUrl}
              alt="Processed Output"
              className="max-h-[300px] object-contain shadow-md border border-slate-300 rounded-none"
            />
          ) : (
            <span className="text-slate-400 text-xs font-semibold">Waiting for processing...</span>
          )}
        </div>

        {processedInfo && !isProcessing && (
          <div className="p-4 bg-white grid grid-cols-4 gap-2 text-xs border-t border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Dimensions</span>
              <span className="font-extrabold text-slate-900 mt-0.5">{processedInfo.width} × {processedInfo.height} px</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Size</span>
              <span className="font-extrabold text-indigo-600 mt-0.5">{formatSize(processedInfo.size)}</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Format</span>
              <span className="font-extrabold text-slate-900 mt-0.5">{formatTypeName(processedInfo.format)}</span>
            </div>
            <div className="flex flex-col items-center border-l border-slate-100">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">DPI</span>
              <span className="font-extrabold text-emerald-700 mt-0.5">{processedInfo.dpi ? `${processedInfo.dpi} DPI` : "72 DPI"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
