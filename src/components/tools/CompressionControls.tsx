"use client";

import React from "react";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineArrowPath,
  HiOutlineDocumentDuplicate,
  HiOutlineArrowsUpDown,
} from "react-icons/hi2";

interface CompressionControlsProps {
  targetKB?: number;
  onTargetKBChange?: (kb: number) => void;
  enableTargetKB?: boolean;
  onEnableTargetKBChange?: (enabled: boolean) => void;

  targetWidth?: number;
  onTargetWidthChange?: (w: number) => void;
  targetHeight?: number;
  onTargetHeightChange?: (h: number) => void;

  scalePercent?: number;
  onScalePercentChange?: (pct: number) => void;

  resizeMode?: "percentage" | "dimensions";
  onResizeModeChange?: (mode: "percentage" | "dimensions") => void;

  keepAspectRatio?: boolean;
  onKeepAspectRatioChange?: (keep: boolean) => void;

  format?: string;
  onFormatChange?: (f: string) => void;

  originalInfo?: { width: number; height: number; size: number; format: string };

  minKB?: number;
  maxKB?: number;
  showDimensions?: boolean;
  showFormat?: boolean;
  showCompression?: boolean;
  presetKBs?: number[];
  locked?: boolean;
}

export default function CompressionControls({
  targetKB = 50,
  onTargetKBChange,
  enableTargetKB = true,
  onEnableTargetKBChange,
  targetWidth,
  onTargetWidthChange,
  targetHeight,
  onTargetHeightChange,
  scalePercent = 100,
  onScalePercentChange,
  resizeMode = "percentage",
  onResizeModeChange,
  keepAspectRatio = true,
  onKeepAspectRatioChange,
  format = "image/jpeg",
  onFormatChange,
  originalInfo,
  minKB,
  maxKB,
  showDimensions = true,
  showFormat = true,
  showCompression = true,
  presetKBs = [10, 20, 30, 40, 50, 60, 100, 150, 200, 300, 500],
  locked = false,
}: CompressionControlsProps) {
  const percentagePresets = [25, 50, 75, 100, 125, 150, 200];

  const normalizeFormatValue = (fmt: string) => {
    if (fmt === "JPEG" || fmt === "JPG" || fmt === "image/jpeg") return "image/jpeg";
    if (fmt === "PNG" || fmt === "image/png") return "image/png";
    if (fmt === "WEBP" || fmt === "image/webp") return "image/webp";
    return fmt;
  };

  const currentFormat = normalizeFormatValue(format);

  const calculatedWidth =
    resizeMode === "percentage" && originalInfo
      ? Math.max(1, Math.round(originalInfo.width * (scalePercent / 100)))
      : targetWidth || originalInfo?.width || 0;

  const calculatedHeight =
    resizeMode === "percentage" && originalInfo
      ? Math.max(1, Math.round(originalInfo.height * (scalePercent / 100)))
      : targetHeight || originalInfo?.height || 0;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Conversion & Resize Options</h3>
        </div>
        {locked ? (
          <div className="flex items-center text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">
            <HiOutlineLockClosed className="w-3.5 h-3.5 mr-1" />
            Locked for Exam Requirement
          </div>
        ) : originalInfo ? (
          <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            Original: <span className="font-semibold text-gray-800">{originalInfo.width} × {originalInfo.height} px</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 1: Output Format */}
        {showFormat && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              1. Output Format
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl">
              {[
                { label: "JPG", value: "image/jpeg" },
                { label: "PNG", value: "image/png" },
                { label: "WebP", value: "image/webp" },
              ].map((fmt) => (
                <button
                  key={fmt.value}
                  type="button"
                  disabled={locked}
                  onClick={() => onFormatChange?.(fmt.value)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    currentFormat === fmt.value
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500">
              {currentFormat === "image/jpeg" && "JPG is ideal for photo uploads and exam forms."}
              {currentFormat === "image/png" && "PNG maintains lossless clarity and transparent backgrounds."}
              {currentFormat === "image/webp" && "WebP delivers high quality with compact file sizes."}
            </p>
          </div>
        )}

        {/* Section 2: Resize Mode (Percentage vs Dimensions) */}
        {showDimensions && (
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                2. Resize Image
              </label>

              {/* Mode Toggle Tabs */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => onResizeModeChange?.("percentage")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    resizeMode === "percentage"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  By Percentage (%)
                </button>
                <button
                  type="button"
                  onClick={() => onResizeModeChange?.("dimensions")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    resizeMode === "dimensions"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  By Pixels (W×H)
                </button>
              </div>
            </div>

            {/* Percentage Mode Controls */}
            {resizeMode === "percentage" ? (
              <div className="space-y-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700">Resize Scale:</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={scalePercent}
                      onChange={(e) => onScalePercentChange?.(Math.max(1, Number(e.target.value)))}
                      className="w-16 text-center text-xs font-bold border border-gray-300 rounded-lg p-1 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-xs font-bold text-gray-600">%</span>
                  </div>
                </div>

                {/* Preset Percentage Buttons */}
                <div className="flex flex-wrap gap-1.5">
                  {percentagePresets.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      disabled={locked}
                      onClick={() => onScalePercentChange?.(pct)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        scalePercent === pct
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={scalePercent}
                  onChange={(e) => onScalePercentChange?.(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                {calculatedWidth > 0 && calculatedHeight > 0 && (
                  <div className="text-[11px] font-medium text-indigo-700 bg-indigo-50/80 px-2.5 py-1.5 rounded-lg flex items-center justify-between border border-indigo-100">
                    <span>Target Output Dimensions:</span>
                    <span className="font-bold">{calculatedWidth} × {calculatedHeight} px</span>
                  </div>
                )}
              </div>
            ) : (
              /* Custom Dimensions (px) Mode Controls */
              <div className="space-y-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-200">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-600">Width:</span>
                    <input
                      type="number"
                      disabled={locked}
                      value={targetWidth || ""}
                      onChange={(e) => onTargetWidthChange?.(Number(e.target.value))}
                      placeholder="Auto"
                      className="w-24 text-xs font-bold border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-xs text-gray-500">px</span>
                  </div>

                  <span className="text-gray-400 font-bold">×</span>

                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-600">Height:</span>
                    <input
                      type="number"
                      disabled={locked}
                      value={targetHeight || ""}
                      onChange={(e) => onTargetHeightChange?.(Number(e.target.value))}
                      placeholder="Auto"
                      className="w-24 text-xs font-bold border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="text-xs text-gray-500">px</span>
                  </div>

                  {/* Aspect Ratio Lock Toggle */}
                  <button
                    type="button"
                    onClick={() => onKeepAspectRatioChange?.(!keepAspectRatio)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${
                      keepAspectRatio
                        ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                    title={keepAspectRatio ? "Aspect ratio locked" : "Aspect ratio unlocked"}
                  >
                    {keepAspectRatio ? (
                      <HiOutlineLockClosed className="w-3.5 h-3.5 text-indigo-600" />
                    ) : (
                      <HiOutlineLockOpen className="w-3.5 h-3.5 text-gray-400" />
                    )}
                    <span>{keepAspectRatio ? "Ratio Locked" : "Unlocked"}</span>
                  </button>
                </div>

                {/* Quick preset dimension tags */}
                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500 pt-1">
                  <span className="text-[11px] font-medium mr-1">Presets:</span>
                  {[
                    { w: 275, h: 354, label: "275×354" },
                    { w: 200, h: 230, label: "200×230" },
                    { w: 300, h: 300, label: "300×300" },
                    { w: 140, h: 60, label: "140×60" },
                    { w: 200, h: 80, label: "200×80" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        onTargetWidthChange?.(preset.w);
                        onTargetHeightChange?.(preset.h);
                      }}
                      className="px-2 py-0.5 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded text-[11px] font-medium transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 3: Target File Size (KB) / Compression Controls */}
      {showCompression && (
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              3. Target File Size (KB) & Compression
            </label>

            {/* Toggle switch between Max Quality and Target KB */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEnableTargetKBChange?.(!enableTargetKB)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  enableTargetKB
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                    : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${enableTargetKB ? "bg-indigo-600 animate-pulse" : "bg-gray-400"}`} />
                {enableTargetKB ? "Limit File Size (KB Active)" : "Original / Max Quality"}
              </button>
            </div>
          </div>

          {enableTargetKB && (
            <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Quick KB Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {presetKBs.map((kb) => (
                    <button
                      key={kb}
                      type="button"
                      disabled={locked}
                      onClick={() => {
                        onTargetKBChange?.(kb);
                        if (onEnableTargetKBChange && !enableTargetKB) {
                          onEnableTargetKBChange(true);
                        }
                      }}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        targetKB === kb && enableTargetKB
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      } ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {kb} KB
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-700">Custom Limit:</span>
                <input
                  type="number"
                  disabled={locked}
                  value={targetKB}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value));
                    onTargetKBChange?.(val);
                    if (onEnableTargetKBChange && !enableTargetKB) {
                      onEnableTargetKBChange(true);
                    }
                  }}
                  className={`w-24 text-xs font-bold border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    locked ? "bg-gray-100 cursor-not-allowed text-gray-500" : ""
                  }`}
                  min={1}
                />
                <span className="text-xs font-bold text-gray-600">KB</span>
              </div>

              {(minKB || maxKB) && (
                <p className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 inline-block font-medium">
                  Portal Requirements: {minKB && minKB > 0 ? `${minKB} KB – ${maxKB || "Any"} KB` : `≤${maxKB || "Any"} KB`}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
