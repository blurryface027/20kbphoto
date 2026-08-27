"use client";

import React, { useEffect, useState } from "react";
import { trackEvent } from "@/lib/gtag";

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
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setDownloadUrl(null);
    }
  }, [blob]);

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
    <div className="w-full bg-surface border border-border rounded-xl p-6 text-center shadow-sm">
      <h3 className="text-xl font-semibold text-primary mb-2">
        {isValid ? "Ready to Download" : "Generated Output (Check Validation)"}
      </h3>

      {!isValid && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-semibold flex items-center justify-center gap-2 max-w-xl mx-auto">
          <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Warning: Generated file size or parameters do not satisfy official requirements.</span>
        </div>
      )}

      {examName && isValid && (
        <p className="text-sm text-success font-medium mb-4 flex items-center justify-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Optimized for {examName}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-6">
        <button
          onClick={handleDownload}
          className={`${
            isValid ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" : "bg-amber-600 hover:bg-amber-700 shadow-amber-200"
          } text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all duration-200 flex items-center transform hover:scale-105`}
          aria-label="Download processed image"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Image
        </button>
        
        <button
          onClick={onReset}
          className="bg-white hover:bg-gray-50 text-primary font-medium py-3 px-6 rounded-lg border border-border shadow-sm transition-all duration-200"
          aria-label="Process another image"
        >
          Process Another
        </button>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg inline-block">
        <span className="font-semibold">File will be saved as:</span> {filename}
        <p className="text-xs mt-1 text-gray-400">
          Auto-renamed for error-free upload to official portals.
        </p>
      </div>
    </div>
  );
}
