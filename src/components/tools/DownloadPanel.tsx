"use client";

import React, { useMemo, useEffect } from "react";
import { trackEvent } from "@/lib/gtag";
import {
  HiOutlineArrowDownTray,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineSparkles,
} from "react-icons/hi2";

interface DownloadPanelProps {
  blob?: Blob;
  filename?: string;
  onReset: () => void;
  examName?: string;
  isValid?: boolean;
  toolName?: string;
  outputFormat?: string;
  targetKB?: number;
  targetWidth?: number;
  targetHeight?: number;
}

export default function DownloadPanel({
  blob,
  filename = "photo.jpg",
  onReset,
  examName,
  isValid = true,
  toolName,
  outputFormat,
  targetKB,
  targetWidth,
  targetHeight,
}: DownloadPanelProps) {
  const downloadUrl = useMemo(() => {
    if (blob) {
      return URL.createObjectURL(blob);
    }
    return null;
  }, [blob]);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleDownload = () => {
    if (downloadUrl) {
      trackEvent("image_download", {
        tool_name: toolName || examName || "photo-resizer",
        output_format: outputFormat || (blob?.type || "image/jpeg"),
        target_kb: targetKB,
        target_width: targetWidth,
        target_height: targetHeight,
      });

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (!blob) {
    return null;
  }

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center shadow-xl shadow-slate-200/40 space-y-6">
      <div className="space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-extrabold">
          <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
          <span>Output Ready</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {isValid ? "Download Your Optimized Image" : "Generated Output (Review Specifications)"}
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Processed with exact DPI resolution, file size constraints, and portal formatting
        </p>
      </div>

      {!isValid && (
        <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-800 text-xs font-semibold flex items-center justify-center gap-2 max-w-xl mx-auto">
          <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Notice: File parameters differ slightly from portal recommendations.</span>
        </div>
      )}

      {examName && isValid && (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <HiOutlineCheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Optimized for {examName} Portal</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        <button
          onClick={handleDownload}
          className={`${
            isValid
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200"
              : "bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-200"
          } text-sm font-black py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto min-w-[220px]`}
          aria-label="Download processed image"
        >
          <HiOutlineArrowDownTray className="w-5 h-5" />
          <span>Download Image</span>
        </button>

        <button
          onClick={onReset}
          className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-sm font-bold py-4 px-6 rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
          aria-label="Process another image"
        >
          <HiOutlineArrowPath className="w-4.5 h-4.5 text-slate-500" />
          <span>Process Another Image</span>
        </button>
      </div>

      <div className="pt-2">
        <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
          <span className="font-semibold text-slate-500">Save Filename:</span>
          <span className="font-mono text-indigo-600 font-bold">{filename}</span>
        </div>
      </div>
    </div>
  );
}
