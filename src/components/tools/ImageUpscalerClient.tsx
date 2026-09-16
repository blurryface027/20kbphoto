"use client";

import { useState, useRef } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineArrowUpRight,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

export default function ImageUpscalerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [upscaleFactor, setUpscaleFactor] = useState<2 | 4>(2);
  const [sharpenLevel, setSharpenLevel] = useState<number>(30);
  const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [upscaledDimensions, setUpscaledDimensions] = useState<{ w: number; h: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      setOriginalDimensions({ w: img.width, h: img.height });
      processUpscale(img, upscaleFactor, sharpenLevel);
    };
  };

  const processUpscale = (img: HTMLImageElement, factor: 2 | 4, sharpen: number) => {
    setIsProcessing(true);

    const canvas = document.createElement("canvas");
    const targetW = img.width * factor;
    const targetH = img.height * factor;
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Apply subtle sharpening filter
      if (sharpen > 0) {
        const imgData = ctx.getImageData(0, 0, targetW, targetH);
        const data = imgData.data;
        const amount = (sharpen / 100) * 0.3;

        // Sharpen kernel
        for (let y = 1; y < targetH - 1; y++) {
          for (let x = 1; x < targetW - 1; x++) {
            const idx = (y * targetW + x) * 4;
            const topIdx = ((y - 1) * targetW + x) * 4;
            const botIdx = ((y + 1) * targetW + x) * 4;
            const leftIdx = (y * targetW + (x - 1)) * 4;
            const rightIdx = (y * targetW + (x + 1)) * 4;

            for (let c = 0; c < 3; c++) {
              const current = data[idx + c];
              const neighborAvg =
                (data[topIdx + c] + data[botIdx + c] + data[leftIdx + c] + data[rightIdx + c]) / 4;
              const sharpened = current + (current - neighborAvg) * amount;
              data[idx + c] = Math.min(255, Math.max(0, sharpened));
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      setUpscaledUrl(dataUrl);
      setUpscaledDimensions({ w: targetW, h: targetH });

      trackEvent("image_upscaled", {
        tool_name: "image-upscaler",
        factor: factor,
      });
    }

    setIsProcessing(false);
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
            <HiOutlineArrowUpRight className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Image to Increase Resolution (Upscale)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Upscale photo resolution by 2x or 4x with bicubic interpolation and edge sharpening.
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
                setOriginalUrl(null);
                setUpscaledUrl(null);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Upscale Factor</label>
              <div className="flex gap-2">
                {[2, 4].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setUpscaleFactor(f as any);
                      if (file && originalUrl) {
                        const img = new Image();
                        img.src = originalUrl;
                        img.onload = () => processUpscale(img, f as any, sharpenLevel);
                      }
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      upscaleFactor === f
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {f}x Resolution ({f * 100}%)
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Edge Sharpening ({sharpenLevel}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={sharpenLevel}
                onChange={(e) => {
                  const s = parseInt(e.target.value);
                  setSharpenLevel(s);
                  if (file && originalUrl) {
                    const img = new Image();
                    img.src = originalUrl;
                    img.onload = () => processUpscale(img, upscaleFactor, s);
                  }
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Original Photo</span>
              {originalDimensions && (
                <span className="text-[11px] font-mono font-bold text-slate-700 block mb-2">
                  {originalDimensions.w} × {originalDimensions.h} px
                </span>
              )}
              {originalUrl && (
                <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </div>

            {/* Upscaled */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 block mb-1">Upscaled Result ({upscaleFactor}x)</span>
              {upscaledDimensions && (
                <span className="text-[11px] font-mono font-bold text-indigo-600 block mb-2">
                  {upscaledDimensions.w} × {upscaledDimensions.h} px
                </span>
              )}
              {isProcessing ? (
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                  <HiOutlineArrowPath className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              ) : upscaledUrl ? (
                <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={upscaledUrl} alt="Upscaled" className="max-h-full max-w-full object-contain" />
                </div>
              ) : null}
            </div>
          </div>

          {/* Download */}
          {upscaledUrl && !isProcessing && (
            <div className="text-center pt-2">
              <a
                href={upscaledUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}-${upscaleFactor}x-upscaled.jpg`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
              >
                <HiOutlineArrowDownTray className="w-5 h-5" /> Download Upscaled Image
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
