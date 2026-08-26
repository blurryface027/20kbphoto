"use client";

import React, { useEffect, useState } from "react";

interface DownloadPanelProps {
  blob?: Blob;
  filename?: string;
  onReset: () => void;
  examName?: string;
}

export default function DownloadPanel({
  blob,
  filename = "photo.jpg",
  onReset,
  examName,
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
      <h3 className="text-xl font-semibold text-primary mb-2">Ready to Download</h3>
      {examName && (
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
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md shadow-indigo-200 transition-all duration-200 flex items-center transform hover:scale-105"
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
