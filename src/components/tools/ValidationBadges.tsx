"use client";

import React from "react";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineShieldCheck } from "react-icons/hi2";

interface ValidationBadgesProps {
  checks: {
    dimensions: boolean;
    fileSize: boolean;
    format: boolean;
    dpi?: boolean;
  };
  details: {
    width: number;
    height: number;
    size: number;
    format: string;
    dpi?: number;
  };
  requirements?: {
    width: number;
    height: number;
    minKB: number;
    maxKB: number;
    format: string;
    dpi?: number;
  };
}

const formatSize = (bytes: number) => {
  return (bytes / 1024).toFixed(2) + " KB";
};

const formatTypeName = (fmt: string) => {
  if (!fmt) return "JPG";
  if (fmt.includes("jpeg") || fmt.includes("jpg") || fmt === "JPEG" || fmt === "JPG") return "JPG";
  if (fmt.includes("png") || fmt === "PNG") return "PNG";
  if (fmt.includes("webp") || fmt === "WEBP") return "WEBP";
  return fmt.replace("image/", "").toUpperCase();
};

interface BadgeCardProps {
  success: boolean;
  label: string;
  actualText: string;
  reqText?: string;
}

function BadgeCard({ success, label, actualText, reqText }: BadgeCardProps) {
  return (
    <div
      className={`flex items-start p-4 rounded-2xl border transition-all ${
        success
          ? "bg-emerald-50/70 border-emerald-200/80 text-emerald-950 shadow-xs"
          : "bg-rose-50/70 border-rose-200/80 text-rose-950 shadow-xs"
      }`}
    >
      {success ? (
        <HiOutlineCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 mr-3" />
      ) : (
        <HiOutlineXCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 mr-3" />
      )}
      <div className="flex flex-col min-w-0">
        <span className={`text-xs font-black tracking-tight ${success ? "text-emerald-900" : "text-rose-900"}`}>
          {label}
        </span>
        <div className="text-[11px] font-medium text-slate-600 mt-1 space-y-0.5">
          <div className="truncate">
            <span className="font-bold text-slate-800">Actual:</span> {actualText}
          </div>
          {reqText && (
            <div className="truncate text-slate-500">
              <span className="font-semibold text-slate-600">Req:</span> {reqText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ValidationBadges({
  checks,
  details,
  requirements,
}: ValidationBadgesProps) {
  const hasDpi = checks.dpi !== undefined || requirements?.dpi !== undefined;
  const allPassed =
    checks.dimensions && checks.fileSize && checks.format && (checks.dpi === undefined || checks.dpi);

  return (
    <div className="w-full bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-200/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Portal Requirement Validation
          </h3>
        </div>

        <div
          className={`text-xs font-bold px-3 py-1 rounded-full border ${
            allPassed
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {allPassed ? "✓ 100% Spec Compliant" : "⚠️ Requirements Mismatch"}
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasDpi ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-3.5`}>
        <BadgeCard
          success={checks.dimensions}
          label={checks.dimensions ? "Dimensions Matched" : "Invalid Dimensions"}
          actualText={`${details.width} × ${details.height} px`}
          reqText={requirements ? `${requirements.width} × ${requirements.height} px` : undefined}
        />

        <BadgeCard
          success={checks.fileSize}
          label={checks.fileSize ? "File Size Matched" : "Invalid File Size"}
          actualText={formatSize(details.size)}
          reqText={
            requirements
              ? requirements.minKB && requirements.minKB > 0
                ? `${requirements.minKB}–${requirements.maxKB} KB`
                : `≤ ${requirements.maxKB} KB`
              : undefined
          }
        />

        <BadgeCard
          success={checks.format}
          label={checks.format ? "Format Matched" : "Invalid Format"}
          actualText={formatTypeName(details.format)}
          reqText={requirements ? formatTypeName(requirements.format) : undefined}
        />

        {hasDpi && (
          <BadgeCard
            success={checks.dpi ?? false}
            label={checks.dpi ? "DPI Matched" : "DPI Mismatch"}
            actualText={`${details.dpi ?? "Unknown"} DPI`}
            reqText={requirements?.dpi ? `${requirements.dpi} DPI` : undefined}
          />
        )}
      </div>
    </div>
  );
}
