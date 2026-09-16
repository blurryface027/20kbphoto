"use client";

import { useState, useRef, useEffect } from "react";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
  HiOutlineArrowDownTray,
  HiOutlineViewColumns,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface StitchItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  imgEl: HTMLImageElement;
}

export default function ImageStitcherClient() {
  const [items, setItems] = useState<StitchItem[]>([]);
  const [direction, setDirection] = useState<"vertical" | "horizontal">("vertical");
  const [spacing, setSpacing] = useState<number>(10);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [stitchedUrl, setStitchedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilesAdded = async (files: FileList | File[]) => {
    const newItems: StitchItem[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const previewUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = previewUrl;
      });
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl,
        width: img.width || 800,
        height: img.height || 600,
        imgEl: img,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const moveItem = (index: number, dir: "up" | "down") => {
    const targetIndex = dir === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const renderStitchedCanvas = () => {
    if (items.length === 0) {
      setStitchedUrl(null);
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (direction === "vertical") {
      const maxW = Math.max(...items.map((it) => it.width));
      const totalH =
        items.reduce((acc, it) => acc + it.height, 0) + (items.length - 1) * spacing;

      canvas.width = maxW;
      canvas.height = totalH;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentY = 0;
      items.forEach((it) => {
        const posX = (maxW - it.width) / 2;
        ctx.drawImage(it.imgEl, posX, currentY);
        currentY += it.height + spacing;
      });
    } else {
      const maxH = Math.max(...items.map((it) => it.height));
      const totalW =
        items.reduce((acc, it) => acc + it.width, 0) + (items.length - 1) * spacing;

      canvas.width = totalW;
      canvas.height = maxH;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let currentX = 0;
      items.forEach((it) => {
        const posY = (maxH - it.height) / 2;
        ctx.drawImage(it.imgEl, currentX, posY);
        currentX += it.width + spacing;
      });
    }

    const url = canvas.toDataURL("image/png");
    setStitchedUrl(url);

    trackEvent("images_stitched", {
      tool_name: "image-stitcher",
      direction,
      image_count: items.length,
    });
  };

  useEffect(() => {
    renderStitchedCanvas();
  }, [items, direction, spacing, bgColor]);

  return (
    <div className="space-y-6">
      {items.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) handleFilesAdded(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineViewColumns className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Images to Combine / Stitch
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Join multiple photos vertically or horizontally into a single image.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Images to Combine
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {items.length} Image{items.length > 1 ? "s" : ""} Loaded
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
              >
                + Add More Images
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
              />

              <button
                onClick={() => setItems([])}
                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stitch Direction</label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as any)}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="vertical">Vertical (Stacked Top-to-Bottom)</option>
                <option value="horizontal">Horizontal (Side-by-Side Left-to-Right)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Image Spacing / Gap ({spacing}px)
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={spacing}
                onChange={(e) => setSpacing(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Background Fill Color</label>
              <select
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="#ffffff">White Background</option>
                <option value="#000000">Black Background</option>
                <option value="#f8fafc">Slate Light Gray</option>
              </select>
            </div>
          </div>

          {/* Image Order Manager */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reorder Images
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs font-semibold text-slate-700"
                >
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="max-w-[100px] truncate">{it.file.name}</span>
                  <button
                    onClick={() => moveItem(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                  >
                    <HiOutlineArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, "down")}
                    disabled={idx === items.length - 1}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30"
                  >
                    <HiOutlineArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeItem(idx)}
                    className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                  >
                    <HiOutlineTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stitched Preview */}
          {stitchedUrl && (
            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-center max-h-[60vh] overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stitchedUrl}
                alt="Stitched Result"
                className="max-h-[50vh] max-w-full mx-auto object-contain rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Download */}
          {stitchedUrl && (
            <div className="text-center pt-2">
              <a
                href={stitchedUrl}
                download={`stitched-combined-photo-${Date.now()}.png`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
              >
                <HiOutlineArrowDownTray className="w-5 h-5" /> Download Stitched Image
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
