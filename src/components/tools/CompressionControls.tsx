"use client";

import React from "react";
import { trackEvent } from "@/lib/gtag";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineSparkles,
  HiOutlinePhoto,
  HiOutlineScale,
  HiOutlineBolt,
  HiOutlineCheckCircle,
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
  toolName?: string;
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
  toolName = "image-resizer",
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

  // Calculate GCD for simple aspect ratio display
  const getAspectRatioStr = (w: number, h: number) => {
    if (!w || !h) return "";
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(w, h);
    const rw = Math.round(w / divisor);
    const rh = Math.round(h / divisor);
    if (rw > 20 || rh > 20) return `${(w / h).toFixed(2)}:1`;
    return `${rw}:${rh}`;
  };

  const currentAspectRatio = getAspectRatioStr(calculatedWidth, calculatedHeight);

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/40 space-y-7 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-sm">
            <HiOutlineAdjustmentsHorizontal className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Conversion & Image Tuning
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Customize format, dimensions, scale factor & compression limits
            </p>
          </div>
        </div>

        {locked ? (
          <div className="flex items-center gap-1.5 text-xs font-bold bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-xs">
            <HiOutlineLockClosed className="w-4 h-4 text-amber-600" />
            <span>Locked for Exam Specs</span>
          </div>
        ) : originalInfo ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200">
            <span>Original Image:</span>
            <span className="font-bold text-slate-900">
              {originalInfo.width} × {originalInfo.height} px
            </span>
          </div>
        ) : null}
      </div>

      {/* Main Grid Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Section 1: Output Format (4 Cols) */}
        {showFormat && (
          <div className="lg:col-span-4 space-y-3 flex flex-col justify-between bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HiOutlinePhoto className="w-4 h-4 text-indigo-600" />
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  1. Output Format
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "JPG", value: "image/jpeg" },
                  { label: "PNG", value: "image/png" },
                  { label: "WebP", value: "image/webp" },
                ].map((fmt) => {
                  const isActive = currentFormat === fmt.value;
                  return (
                    <button
                      key={fmt.value}
                      type="button"
                      disabled={locked}
                      onClick={() => onFormatChange?.(fmt.value)}
                      className={`relative py-3 px-2 rounded-xl text-center transition-all duration-150 flex flex-col items-center justify-center ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 border border-slate-200/80"
                      } ${locked ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                      <span className="text-xs font-black tracking-wide">{fmt.label}</span>
                      {isActive && (
                        <HiOutlineCheckCircle className="w-3.5 h-3.5 absolute top-1.5 right-1.5 text-white/90" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 text-[11px] font-medium text-slate-600 leading-relaxed">
              {currentFormat === "image/jpeg" && (
                <span className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">JPG</span> standard format required by official exam portals, SSC, UPSC, and passport upload forms.
                </span>
              )}
              {currentFormat === "image/png" && (
                <span className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">PNG</span> delivers maximum clarity and preserves background transparency.
                </span>
              )}
              {currentFormat === "image/webp" && (
                <span className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">WebP</span> offers next-gen high efficiency with minimal file size for fast web loading.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Section 2: Image Dimensions & Resizing (8 Cols) */}
        {showDimensions && (
          <div className={`${showFormat ? "lg:col-span-8" : "lg:col-span-12"} space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <HiOutlineScale className="w-4 h-4 text-indigo-600" />
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  2. Image Resizing & Dimensions
                </label>
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex items-center bg-slate-200/70 p-1 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => onResizeModeChange?.("percentage")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    resizeMode === "percentage"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Scale (%)
                </button>
                <button
                  type="button"
                  onClick={() => onResizeModeChange?.("dimensions")}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    resizeMode === "dimensions"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Pixels (W×H)
                </button>
              </div>
            </div>

            {/* Percentage Mode Controls */}
            {resizeMode === "percentage" ? (
              <div className="space-y-4 pt-1">
                {/* Scale Input & Presets */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">Scale Factor:</span>
                    <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-300">
                      <input
                        type="number"
                        min={1}
                        max={500}
                        value={scalePercent}
                        onChange={(e) => onScalePercentChange?.(Math.max(1, Number(e.target.value)))}
                        className="w-14 text-center text-xs font-black text-slate-900 bg-transparent focus:outline-none"
                      />
                      <span className="text-xs font-black text-indigo-600">%</span>
                    </div>
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {percentagePresets.map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        disabled={locked}
                        onClick={() => onScalePercentChange?.(pct)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                          scalePercent === pct
                            ? "bg-indigo-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={scalePercent}
                    onChange={(e) => onScalePercentChange?.(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                    <span>5% (Tiny)</span>
                    <span>50%</span>
                    <span className="font-bold text-slate-600">100% (Original)</span>
                    <span>150%</span>
                    <span>200% (2× Enlarge)</span>
                  </div>
                </div>

                {/* Live Output Dimensions Card */}
                {calculatedWidth > 0 && calculatedHeight > 0 && (
                  <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-200 text-indigo-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2">
                      <HiOutlineSparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs font-bold text-indigo-900">Target Output Dimensions:</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold tracking-wide text-indigo-900">
                        {calculatedWidth} × {calculatedHeight} <span className="text-xs font-semibold text-indigo-700">px</span>
                      </span>
                      {currentAspectRatio && (
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded text-indigo-700 border border-indigo-200">
                          {currentAspectRatio} Ratio
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Custom Dimensions (px) Mode Controls */
              <div className="space-y-4 pt-1">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[120px] space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Width (px)</label>
                      <input
                        type="number"
                        disabled={locked}
                        value={targetWidth || ""}
                        onChange={(e) => onTargetWidthChange?.(Number(e.target.value))}
                        placeholder="Auto"
                        className="w-full text-xs font-black border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                    </div>

                    <span className="text-slate-400 font-extrabold self-end pb-3 text-sm">×</span>

                    <div className="flex-1 min-w-[120px] space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">Height (px)</label>
                      <input
                        type="number"
                        disabled={locked}
                        value={targetHeight || ""}
                        onChange={(e) => onTargetHeightChange?.(Number(e.target.value))}
                        placeholder="Auto"
                        className="w-full text-xs font-black border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Aspect Ratio Lock Toggle */}
                    <div className="self-end pb-0.5">
                      <button
                        type="button"
                        onClick={() => onKeepAspectRatioChange?.(!keepAspectRatio)}
                        className={`flex items-center gap-1.5 text-xs px-3.5 py-2.5 rounded-xl border font-bold transition-all ${
                          keepAspectRatio
                            ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs"
                            : "bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200"
                        }`}
                        title={keepAspectRatio ? "Proportional Aspect Ratio Locked" : "Aspect Ratio Unlocked (Freeform)"}
                      >
                        {keepAspectRatio ? (
                          <HiOutlineLockClosed className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <HiOutlineLockOpen className="w-4 h-4 text-slate-400" />
                        )}
                        <span>{keepAspectRatio ? "Proportional" : "Freeform"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Preset dimension shortcuts */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase mr-1">Presets:</span>
                    {[
                      { w: 275, h: 354, label: "Passport (275×354)" },
                      { w: 200, h: 230, label: "SSC Photo (200×230)" },
                      { w: 300, h: 300, label: "Square (300×300)" },
                      { w: 140, h: 60, label: "Signature (140×60)" },
                      { w: 200, h: 80, label: "Sign (200×80)" },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          trackEvent("dimension_preset_selected", {
                            tool_name: toolName,
                            target_width: preset.w,
                            target_height: preset.h,
                          });
                          onTargetWidthChange?.(preset.w);
                          onTargetHeightChange?.(preset.h);
                        }}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 transition-all"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section 3: Target File Size (KB) & Compression Controls */}
      {showCompression && (
        <div className="pt-5 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <HiOutlineBolt className="w-5 h-5 text-indigo-600" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                3. Compression & Target File Size (KB)
              </h4>
            </div>

            {/* Toggle switch between Max Quality and Target KB */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => onEnableTargetKBChange?.(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !enableTargetKB
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Max Quality / Original
              </button>
              <button
                type="button"
                onClick={() => onEnableTargetKBChange?.(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  enableTargetKB
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${enableTargetKB ? "bg-white animate-pulse" : "bg-slate-400"}`} />
                Target KB Limit Active
              </button>
            </div>
          </div>

          {enableTargetKB ? (
            <div className="bg-indigo-50/40 p-4 sm:p-5 rounded-2xl border border-indigo-100/80 space-y-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-700">Custom Size Limit:</span>
                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-xs">
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
                      className={`w-20 text-center text-xs font-black text-slate-900 focus:outline-none ${
                        locked ? "bg-slate-100 cursor-not-allowed text-slate-500" : ""
                      }`}
                      min={1}
                    />
                    <span className="text-xs font-black text-indigo-600">KB</span>
                  </div>
                </div>

                {(minKB || maxKB) && (
                  <p className="text-[11px] text-amber-800 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200 font-semibold flex items-center gap-1">
                    <HiOutlineCheckCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Portal Spec: {minKB && minKB > 0 ? `${minKB} KB – ${maxKB || "Any"} KB` : `≤ ${maxKB || "Any"} KB`}
                  </p>
                )}
              </div>

              {/* Quick KB Presets */}
              <div className="space-y-2 pt-1 border-t border-indigo-100/60">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Popular Exam KB Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetKBs.map((kb) => {
                    const isSelected = targetKB === kb && enableTargetKB;
                    return (
                      <button
                        key={kb}
                        type="button"
                        disabled={locked}
                        onClick={() => {
                          trackEvent("kb_preset_selected", {
                            tool_name: toolName,
                            target_kb: kb,
                          });
                          onTargetKBChange?.(kb);
                          if (onEnableTargetKBChange && !enableTargetKB) {
                            onEnableTargetKBChange(true);
                          }
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200"
                        } ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {kb} KB
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 font-medium">
              Compression target disabled. Output image will be exported at maximum visual quality with standard encoding.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
