"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineEyeSlash,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface BlurRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function BlurToolClient() {
  const [file, setFile] = useState<File | null>(null);
  const [blurIntensity, setBlurIntensity] = useState<number>(15);
  const [fullBlur, setFullBlur] = useState<boolean>(false);
  const [regions, setRegions] = useState<BlurRegion[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<BlurRegion | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    setRegions([]);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      imgRef.current = img;
      renderCanvas(img, blurIntensity, fullBlur, []);
    };
  };

  const renderCanvas = (
    img: HTMLImageElement = imgRef.current!,
    intensity = blurIntensity,
    isFull = fullBlur,
    regionList = regions
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isFull) {
      ctx.filter = `blur(${intensity}px)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";
    } else {
      // Draw normal image
      ctx.drawImage(img, 0, 0);

      // Draw blurred regions
      regionList.forEach((r) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(r.x, r.y, r.width, r.height);
        ctx.clip();

        ctx.filter = `blur(${intensity}px)`;
        ctx.drawImage(img, 0, 0);
        ctx.restore();
      });
    }

    // Render active drawing rect if any
    if (currentRect) {
      ctx.strokeStyle = "#4f46e5";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(currentRect.x, currentRect.y, currentRect.width, currentRect.height);
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      renderCanvas(imgRef.current, blurIntensity, fullBlur, regions);
    }
  }, [blurIntensity, fullBlur, regions, currentRect]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (fullBlur || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setIsDrawing(true);
    setStartPoint({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    const x = Math.min(startPoint.x, currentX);
    const y = Math.min(startPoint.y, currentY);
    const width = Math.abs(currentX - startPoint.x);
    const height = Math.abs(currentY - startPoint.y);

    setCurrentRect({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentRect && currentRect.width > 5 && currentRect.height > 5) {
      setRegions((prev) => [...prev, currentRect]);
    }
    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRect(null);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.name.replace(/\.[^/.]+$/, "")}-blurred.jpg`;
        a.click();
        URL.revokeObjectURL(url);

        trackEvent("image_blurred", {
          tool_name: "blur-image",
          full_blur: fullBlur,
          regions_count: regions.length,
        });
      }
    }, "image/jpeg", 0.92);
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
            <HiOutlineEyeSlash className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Image to Blur Sensitive Details
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Blur faces, addresses, roll numbers, signatures, or entire photo. 100% private in browser.
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
              {file.name} ({regions.length} Blur Region{regions.length !== 1 ? "s" : ""})
            </div>

            <button
              onClick={() => {
                setFile(null);
                setRegions([]);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blur Mode</label>
              <select
                value={fullBlur ? "full" : "region"}
                onChange={(e) => setFullBlur(e.target.value === "full")}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="region">Manual Region Selector (Drag over areas)</option>
                <option value="full">Blur Entire Image</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Blur Intensity ({blurIntensity}px)
              </label>
              <input
                type="range"
                min="3"
                max="50"
                value={blurIntensity}
                onChange={(e) => setBlurIntensity(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setRegions([])}
                disabled={regions.length === 0}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl disabled:opacity-40 transition-colors"
              >
                Clear Selected Regions ({regions.length})
              </button>
            </div>
          </div>

          {!fullBlur && (
            <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-xl text-xs text-indigo-800 font-semibold text-center">
              💡 Tip: Click and drag your mouse across the image below to select areas to blur.
            </div>
          )}

          {/* Canvas Interactive Area */}
          <div
            ref={containerRef}
            className="bg-slate-900 rounded-2xl p-3 flex items-center justify-center overflow-auto max-h-[60vh]"
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className={`max-w-full max-h-[55vh] object-contain rounded-lg ${
                !fullBlur ? "cursor-crosshair" : "cursor-default"
              }`}
            />
          </div>

          {/* Download Button */}
          <div className="text-center pt-2">
            <button
              onClick={downloadImage}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
            >
              <HiOutlineArrowDownTray className="w-5 h-5" /> Download Blurred Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
