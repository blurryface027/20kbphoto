"use client";

import React, { useEffect, useState } from "react";

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

export default function PreviewPanel({
  originalFile,
  processedDataUrl,
  originalInfo,
  processedInfo,
  isProcessing = false,
}: PreviewPanelProps) {
  const [originalDataUrl, setOriginalDataUrl] = useState<string>("");

  useEffect(() => {
    if (originalFile) {
      const url = URL.createObjectURL(originalFile);
      setOriginalDataUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [originalFile]);

  const calcReduction = () => {
    if (originalInfo?.size && processedInfo?.size) {
      const diff = originalInfo.size - processedInfo.size;
      const pct = (diff / originalInfo.size) * 100;
      return pct > 0 ? pct.toFixed(1) + "% smaller" : "Larger";
    }
    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Original Image Panel */}
      <div className="flex-1 flex flex-col bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 border-b border-border p-3">
          <h3 className="font-semibold text-primary text-center">Original Image</h3>
        </div>
        <div className="flex-1 min-h-[250px] relative flex items-center justify-center p-4 bg-gray-100">
          {originalDataUrl ? (
            <img
              src={originalDataUrl}
              alt="Original"
              className="max-h-[300px] object-contain rounded drop-shadow-md"
            />
          ) : (
            <span className="text-gray-400">No image loaded</span>
          )}
        </div>
        {originalInfo && (
          <div className="p-3 bg-surface grid grid-cols-3 gap-2 text-xs text-center border-t border-border">
            <div className="flex flex-col">
              <span className="text-gray-500 uppercase">Dimensions</span>
              <span className="font-medium text-primary">{originalInfo.width} × {originalInfo.height} px</span>
            </div>
            <div className="flex flex-col border-x border-border">
              <span className="text-gray-500 uppercase">Size</span>
              <span className="font-medium text-primary">{formatSize(originalInfo.size)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 uppercase">Format</span>
              <span className="font-medium text-primary">{originalInfo.format.replace('image/', '').toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Processed Image Panel */}
      <div className="flex-1 flex flex-col bg-surface border border-border rounded-xl overflow-hidden shadow-sm relative">
        <div className="bg-gray-50 border-b border-border p-3 flex justify-between items-center">
          <h3 className="font-semibold text-accent text-center w-full">Processed Image</h3>
        </div>
        
        <div className="flex-1 min-h-[250px] relative flex items-center justify-center p-4 bg-gray-100">
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-10 w-10 text-accent mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600 text-sm font-medium">Processing...</span>
            </div>
          ) : processedDataUrl ? (
            <img
              src={processedDataUrl}
              alt="Processed"
              className="max-h-[300px] object-contain rounded drop-shadow-md"
            />
          ) : (
            <span className="text-gray-400">Waiting for processing...</span>
          )}
        </div>

        {/* DPI Updated Banner directly below processed image */}
        {processedInfo?.dpi !== undefined && !isProcessing && (
          <div className="bg-emerald-50 text-emerald-900 text-xs px-4 py-2 border-t border-emerald-200 flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              ✓ DPI Updated
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded border border-emerald-300 text-emerald-800 font-extrabold">
              Image DPI: {processedInfo.dpi} DPI
            </span>
          </div>
        )}
        
        {processedInfo && !isProcessing && (
          <div className="p-3 bg-surface grid grid-cols-4 gap-2 text-xs text-center border-t border-border">
            <div className="flex flex-col">
              <span className="text-gray-500 uppercase">Dimensions</span>
              <span className="font-medium text-primary">{processedInfo.width} × {processedInfo.height} px</span>
            </div>
            <div className="flex flex-col border-l border-border relative">
              <span className="text-gray-500 uppercase">Size</span>
              <span className="font-medium text-primary">{formatSize(processedInfo.size)}</span>
              {calcReduction() && (
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-success text-white px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap shadow-sm">
                  {calcReduction()}
                </span>
              )}
            </div>
            <div className="flex flex-col border-l border-border">
              <span className="text-gray-500 uppercase">Format</span>
              <span className="font-medium text-primary">{processedInfo.format.replace('image/', '').toUpperCase()}</span>
            </div>
            <div className="flex flex-col border-l border-border">
              <span className="text-gray-500 uppercase">DPI</span>
              <span className="font-bold text-emerald-700">{processedInfo.dpi ? `${processedInfo.dpi} DPI` : '72 DPI'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
