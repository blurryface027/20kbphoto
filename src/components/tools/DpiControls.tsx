"use client";

import React from "react";
import { HiOutlineAdjustmentsVertical, HiOutlineInformationCircle } from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface DpiControlsProps {
  dpi: number;
  onDpiChange: (dpi: number) => void;
  toolName?: string;
}

export default function DpiControls({ dpi, onDpiChange, toolName = "change-image-dpi" }: DpiControlsProps) {
  const presets = [
    { value: 72, label: "72 DPI", desc: "Web & Screen Display" },
    { value: 96, label: "96 DPI", desc: "Standard Monitor" },
    { value: 150, label: "150 DPI", desc: "Medium Print" },
    { value: 200, label: "200 DPI", desc: "Official Exam Portal" },
    { value: 300, label: "300 DPI", desc: "Print & PAN/SSC Standard" },
    { value: 600, label: "600 DPI", desc: "Ultra High Resolution" },
  ];

  const handleSelectDpi = (val: number) => {
    trackEvent("dpi_change", {
      tool_name: toolName,
      target_dpi: val,
    });
    onDpiChange(val);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiOutlineAdjustmentsVertical className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Image DPI Settings</h3>
        </div>

        <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Target DPI: {dpi} DPI
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
          Select DPI Resolution Preset
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {presets.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => handleSelectDpi(p.value)}
              className={`p-3 rounded-xl border text-left transition-all ${
                dpi === p.value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <div className="text-sm font-bold">{p.label}</div>
              <div
                className={`text-[11px] mt-0.5 ${
                  dpi === p.value ? "text-indigo-100" : "text-gray-500"
                }`}
              >
                {p.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Custom DPI */}
        <div className="flex items-center gap-3 pt-2">
          <label className="text-xs font-bold text-gray-700 shrink-0">
            Custom DPI Value:
          </label>
          <input
            type="number"
            min={10}
            max={1200}
            value={dpi}
            onChange={(e) => onDpiChange(Math.max(10, Number(e.target.value)))}
            className="w-24 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <span className="text-xs text-gray-500 font-medium">DPI (dots per inch)</span>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-blue-50/70 border border-blue-100 p-3 rounded-xl text-xs text-blue-900">
        <HiOutlineInformationCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          Setting the DPI directly updates the <strong>JFIF header</strong> (for JPG) or <strong>pHYs chunk</strong> (for PNG). Official exam portals verify this resolution tag upon upload.
        </span>
      </div>
    </div>
  );
}
