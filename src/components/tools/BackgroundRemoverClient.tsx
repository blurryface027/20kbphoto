"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineSparkles,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

export default function BackgroundRemoverClient() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [tolerance, setTolerance] = useState<number>(30);
  const [bgColor, setBgColor] = useState<string>("transparent");
  const [removeMode, setRemoveMode] = useState<"white" | "auto" | "custom">("auto");
  const [customColor, setCustomColor] = useState<string>("#ffffff");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);
    processBackgroundRemoval(selectedFile, tolerance, removeMode, customColor, bgColor);
  };

  const processBackgroundRemoval = (
    imgFile: File,
    tol: number,
    mode: "white" | "auto" | "custom",
    customHex: string,
    targetBg: string
  ) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = URL.createObjectURL(imgFile);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample border pixels to detect target background color if auto
      let targetR = 255, targetG = 255, targetB = 255;
      if (mode === "auto") {
        // Sample top-left, top-right, bottom-left corners
        const cornerPixels = [
          [0, 0],
          [canvas.width - 1, 0],
          [0, canvas.height - 1],
          [canvas.width - 1, canvas.height - 1],
        ];
        let rSum = 0, gSum = 0, bSum = 0;
        cornerPixels.forEach(([x, y]) => {
          const idx = (y * canvas.width + x) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
        });
        targetR = Math.round(rSum / 4);
        targetG = Math.round(gSum / 4);
        targetB = Math.round(bSum / 4);
      } else if (mode === "custom") {
        const hex = customHex.replace("#", "");
        targetR = parseInt(hex.substring(0, 2), 16) || 255;
        targetG = parseInt(hex.substring(2, 4), 16) || 255;
        targetB = parseInt(hex.substring(4, 6), 16) || 255;
      }

      // Process transparency
      const tolSq = tol * tol * 3;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const distSq = (r - targetR) ** 2 + (g - targetG) ** 2 + (b - targetB) ** 2;

        if (distSq <= tolSq) {
          // Soft edge feathering
          const alphaFactor = Math.max(0, (distSq / tolSq));
          data[i + 3] = Math.round(data[i + 3] * alphaFactor);
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Apply target background color if requested (e.g. solid white/blue)
      if (targetBg !== "transparent") {
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const finalCtx = finalCanvas.getContext("2d");
        if (finalCtx) {
          finalCtx.fillStyle = targetBg;
          finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
          finalCtx.drawImage(canvas, 0, 0);
          finalCanvas.toBlob((b) => {
            if (b) {
              setResultBlob(b);
              setResultUrl(URL.createObjectURL(b));
            }
            setIsProcessing(false);
          }, "image/png");
          return;
        }
      }

      canvas.toBlob((b) => {
        if (b) {
          setResultBlob(b);
          setResultUrl(URL.createObjectURL(b));
        }
        setIsProcessing(false);
      }, "image/png");

      trackEvent("background_removed", {
        tool_name: "background-remover",
        tolerance: tol,
        mode: mode,
      });
    };
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
            <HiOutlineSparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Image to Remove Background
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Remove background automatically and export as transparent PNG file. Fast & 100% private.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Photo / Image
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
                setResultUrl(null);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Color Detection</label>
              <select
                value={removeMode}
                onChange={(e) => {
                  const m = e.target.value as any;
                  setRemoveMode(m);
                  if (file) processBackgroundRemoval(file, tolerance, m, customColor, bgColor);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="auto">Auto-Detect Background</option>
                <option value="white">White Background Removal</option>
                <option value="custom">Custom Color Picker</option>
              </select>
            </div>

            {removeMode === "custom" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Custom Background Color</label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    if (file) processBackgroundRemoval(file, tolerance, removeMode, e.target.value, bgColor);
                  }}
                  className="w-full h-9 rounded-xl border border-slate-300 p-1 cursor-pointer"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Removal Sensitivity / Tolerance ({tolerance}%)
              </label>
              <input
                type="range"
                min="5"
                max="80"
                value={tolerance}
                onChange={(e) => {
                  const t = parseInt(e.target.value);
                  setTolerance(t);
                  if (file) processBackgroundRemoval(file, t, removeMode, customColor, bgColor);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Background Fill</label>
              <select
                value={bgColor}
                onChange={(e) => {
                  const bg = e.target.value;
                  setBgColor(bg);
                  if (file) processBackgroundRemoval(file, tolerance, removeMode, customColor, bg);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="transparent">Transparent PNG (No Background)</option>
                <option value="#ffffff">Solid White Background</option>
                <option value="#3b82f6">Solid Light Blue (Exam Standard)</option>
                <option value="#e2e8f0">Solid Light Gray</option>
              </select>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 block mb-2">Original Image</span>
              {originalUrl && (
                <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
                </div>
              )}
            </div>

            {/* Result */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-500 block mb-2">Background Removed</span>
              {isProcessing ? (
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center">
                  <HiOutlineArrowPath className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              ) : resultUrl ? (
                <div
                  className="aspect-square rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200"
                  style={{
                    backgroundColor: bgColor === "transparent" ? "#ffffff" : bgColor,
                    backgroundImage:
                      bgColor === "transparent"
                        ? "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)"
                        : "none",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resultUrl} alt="Result" className="max-h-full max-w-full object-contain" />
                </div>
              ) : null}
            </div>
          </div>

          {/* Download */}
          {resultUrl && !isProcessing && (
            <div className="text-center pt-2">
              <a
                href={resultUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}-no-bg.png`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
              >
                <HiOutlineArrowDownTray className="w-5 h-5" /> Download Transparent PNG
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
