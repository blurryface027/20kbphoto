"use client";

import { useState, useRef, useEffect } from "react";
import { processImage } from "@/lib/imageProcessor";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineIdentification,
  HiOutlinePrinter,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface Preset {
  id: string;
  name: string;
  width: number;
  height: number;
  maxKB: number;
  description: string;
}

const PASSPORT_PRESETS: Preset[] = [
  { id: "india-passport", name: "India Passport / Visa", width: 413, height: 531, maxKB: 300, description: "3.5 × 4.5 cm (413 × 531 px) · Light BG" },
  { id: "us-passport", name: "US Passport & Visa", width: 600, height: 600, maxKB: 240, description: "2 × 2 in (600 × 600 px) · White BG" },
  { id: "uk-passport", name: "UK / EU Passport", width: 413, height: 531, maxKB: 300, description: "35 × 45 mm (413 × 531 px) · Light Gray BG" },
  { id: "pan-card", name: "PAN Card Photo", width: 213, height: 213, maxKB: 50, description: "2.5 × 2.5 cm (213 × 213 px) · Max 50KB" },
  { id: "ssc-exam", name: "SSC Exam Portal", width: 350, height: 450, maxKB: 50, description: "3.5 × 4.5 cm (350 × 450 px) · 20 - 50 KB" },
  { id: "upsc-exam", name: "UPSC CSE Photo", width: 350, height: 450, maxKB: 300, description: "3.5 × 4.5 cm (350 × 450 px) · With Name & Date" },
];

export default function PassportMakerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PASSPORT_PRESETS[0]);
  const [bgColor, setBgColor] = useState<string>("original");
  const [singlePhotoUrl, setSinglePhotoUrl] = useState<string | null>(null);
  const [sheetPhotoUrl, setSheetPhotoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    processPassportPhoto(selectedFile, selectedPreset, bgColor);
  };

  const processPassportPhoto = async (
    imgFile: File,
    preset = selectedPreset,
    bg = bgColor
  ) => {
    setIsProcessing(true);
    try {
      // 1. Process single passport photo
      const result = await processImage(imgFile, {
        width: preset.width,
        height: preset.height,
        targetKB: preset.maxKB,
        format: "image/jpeg",
      });

      let finalSingleDataUrl = result.dataUrl;

      // Apply background color if not original
      if (bg !== "original") {
        const img = new Image();
        img.src = result.dataUrl;
        await new Promise((r) => { img.onload = r; });

        const canvas = document.createElement("canvas");
        canvas.width = preset.width;
        canvas.height = preset.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          finalSingleDataUrl = canvas.toDataURL("image/jpeg", 0.92);
        }
      }

      setSinglePhotoUrl(finalSingleDataUrl);

      // 2. Generate 4x6 inch printable photo sheet grid (6 photos)
      // 4x6 inch at 300 DPI = 1200 x 1800 px canvas
      const sheetCanvas = document.createElement("canvas");
      sheetCanvas.width = 1200;
      sheetCanvas.height = 1800;
      const sheetCtx = sheetCanvas.getContext("2d");

      if (sheetCtx) {
        sheetCtx.fillStyle = "#ffffff";
        sheetCtx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

        const img = new Image();
        img.src = finalSingleDataUrl;
        await new Promise((r) => { img.onload = r; });

        // Draw 6 passport photos (2 columns x 3 rows) on 4x6 print canvas
        const itemW = 500;
        const itemH = 500 * (preset.height / preset.width);
        const marginX = (1200 - itemW * 2) / 3; // spacing
        const marginY = (1800 - itemH * 3) / 4;

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 2; col++) {
            const x = marginX + col * (itemW + marginX);
            const y = marginY + row * (itemH + marginY);

            // Light border around photo for easy scissor cutting
            sheetCtx.strokeStyle = "#cbd5e1";
            sheetCtx.lineWidth = 2;
            sheetCtx.strokeRect(x - 2, y - 2, itemW + 4, itemH + 4);

            sheetCtx.drawImage(img, x, y, itemW, itemH);
          }
        }

        setSheetPhotoUrl(sheetCanvas.toDataURL("image/jpeg", 0.92));
      }

      trackEvent("passport_photo_created", {
        tool_name: "passport-photo-maker",
        preset: preset.id,
      });
    } catch (err) {
      console.error("Error creating passport photo:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineIdentification className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Photo to Make Passport Size Photo
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Create standard passport photos & 4x6 print sheets for Indian Passport, US Visa, SSC, UPSC.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Photo File
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
              {file.name}
            </div>

            <button
              onClick={() => {
                setFile(null);
                setSinglePhotoUrl(null);
                setSheetPhotoUrl(null);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Preset Selector */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">Select Country / Application Preset</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PASSPORT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPreset(p);
                    if (file) processPassportPhoto(file, p, bgColor);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPreset.id === p.id
                      ? "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <div className="text-xs font-extrabold text-slate-900">{p.name}</div>
                  <div className="text-[11px] font-semibold text-indigo-600 mt-0.5">{p.width} × {p.height} px</div>
                  <div className="text-[10px] text-slate-500 mt-1">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Color Picker */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <label className="text-xs font-bold text-slate-700">Background Tint Color</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "original", label: "Original BG", color: "transparent" },
                { id: "#ffffff", label: "White", color: "#ffffff" },
                { id: "#e0f2fe", label: "Light Blue", color: "#e0f2fe" },
                { id: "#f1f5f9", label: "Light Gray", color: "#f1f5f9" },
              ].map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setBgColor(bg.id);
                    if (file) processPassportPhoto(file, selectedPreset, bg.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    bgColor === bg.id
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Single Photo */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Single Passport Photo
              </span>
              {isProcessing ? (
                <div className="aspect-[3/4] bg-white rounded-xl flex items-center justify-center">
                  <HiOutlineArrowPath className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              ) : singlePhotoUrl ? (
                <>
                  <div className="aspect-[3/4] max-w-[200px] mx-auto bg-white rounded-xl overflow-hidden border border-slate-300 p-1 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={singlePhotoUrl} alt="Passport Photo" className="w-full h-full object-contain" />
                  </div>
                  <a
                    href={singlePhotoUrl}
                    download={`passport-photo-${selectedPreset.width}x${selectedPreset.height}.jpg`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    <HiOutlineArrowDownTray className="w-4 h-4" /> Download Single Photo
                  </a>
                </>
              ) : null}
            </div>

            {/* 4x6 Print Sheet */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                4×6 Inch Printable Sheet (6 Copies)
              </span>
              {isProcessing ? (
                <div className="aspect-[3/4] bg-white rounded-xl flex items-center justify-center">
                  <HiOutlineArrowPath className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              ) : sheetPhotoUrl ? (
                <>
                  <div className="aspect-[3/4] max-w-[200px] mx-auto bg-white rounded-xl overflow-hidden border border-slate-300 p-1 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sheetPhotoUrl} alt="Printable Photo Sheet" className="w-full h-full object-contain" />
                  </div>
                  <a
                    href={sheetPhotoUrl}
                    download={`passport-photo-sheet-4x6.jpg`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    <HiOutlinePrinter className="w-4 h-4" /> Download 4×6 Print Sheet
                  </a>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
