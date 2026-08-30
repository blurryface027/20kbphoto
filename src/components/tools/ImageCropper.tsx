"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { trackEvent } from "@/lib/gtag";
import {
  HiOutlineScissors,
  HiSparkles,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { autoCropSignature, type CropRect, type ImageInfo } from "@/lib/imageProcessor";

interface ImageCropperProps {
  file: File;
  originalInfo?: ImageInfo;
  cropRect: CropRect | null;
  onCropChange: (rect: CropRect) => void;
  onResetCrop: () => void;
  isSignatureTool?: boolean;
  toolName?: string;
}

type AspectRatioOption = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "passport" | "signature";

export default function ImageCropper({
  file,
  originalInfo,
  cropRect,
  onCropChange,
  onResetCrop,
  isSignatureTool = false,
  toolName = "crop-image",
}: ImageCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>(
    isSignatureTool ? "signature" : "free"
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [isAutoCropping, setIsAutoCropping] = useState(false);

  // Dragging state
  const [dragState, setDragState] = useState<{
    type: "move" | "handle";
    handle?: string;
    startX: number;
    startY: number;
    startCrop: CropRect;
  } | null>(null);

  // Load Image into Element
  useEffect(() => {
    let active = true;
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      if (!active) return;
      URL.revokeObjectURL(url);
      setImgElement(img);
      setImageLoaded(true);

      // Default crop rectangle if null
      if (!cropRect) {
        let initialW = img.width;
        let initialH = img.height;
        let initialX = 0;
        let initialY = 0;

        if (isSignatureTool) {
          // Signature default 2.33:1 aspect ratio centered
          const targetRatio = 140 / 60;
          if (initialW / initialH > targetRatio) {
            initialW = Math.round(initialH * targetRatio);
            initialX = Math.round((img.width - initialW) / 2);
          } else {
            initialH = Math.round(initialW / targetRatio);
            initialY = Math.round((img.height - initialH) / 2);
          }
        }

        onCropChange({
          x: initialX,
          y: initialY,
          width: initialW,
          height: initialH,
        });
      }
    };

    img.src = url;

    return () => {
      active = false;
    };
  }, [file]);

  // Handle Aspect Ratio Change
  const applyAspectRatio = useCallback(
    (ratioOpt: AspectRatioOption, currentCrop: CropRect | null, img: HTMLImageElement | null) => {
      setAspectRatio(ratioOpt);
      if (!img) return;

      if (ratioOpt === "free") return;

      let ratio = 1;
      if (ratioOpt === "1:1") ratio = 1;
      if (ratioOpt === "4:3") ratio = 4 / 3;
      if (ratioOpt === "3:4") ratio = 3 / 4;
      if (ratioOpt === "16:9") ratio = 16 / 9;
      if (ratioOpt === "passport") ratio = 3.5 / 4.5;
      if (ratioOpt === "signature") ratio = 140 / 60;

      let baseW = currentCrop ? currentCrop.width : img.width;
      let newW = baseW;
      let newH = Math.round(newW / ratio);

      if (newH > img.height) {
        newH = img.height;
        newW = Math.round(newH * ratio);
      }
      if (newW > img.width) {
        newW = img.width;
        newH = Math.round(newW / ratio);
      }

      let newX = currentCrop ? currentCrop.x : Math.round((img.width - newW) / 2);
      let newY = currentCrop ? currentCrop.y : Math.round((img.height - newH) / 2);

      newX = Math.max(0, Math.min(img.width - newW, newX));
      newY = Math.max(0, Math.min(img.height - newH, newY));

      onCropChange({ x: newX, y: newY, width: newW, height: newH });
    },
    [onCropChange]
  );

  // Auto Trim Signature Margins
  const handleAutoTrimSignature = async () => {
    if (!file) return;
    setIsAutoCropping(true);
    try {
      const autoRect = await autoCropSignature(file, 240, 16);
      if (autoRect) {
        trackEvent("image_crop", {
          tool_name: toolName,
        });
        onCropChange(autoRect);
      }
    } catch (err) {
      console.error("Auto signature crop failed:", err);
    } finally {
      setIsAutoCropping(false);
    }
  };

  // Render Preview Canvas
  useEffect(() => {
    if (!imageLoaded || !imgElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Draw full image
    ctx.drawImage(imgElement, 0, 0);

    if (cropRect) {
      // Dark overlay over unselected region
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      // Top
      ctx.fillRect(0, 0, canvas.width, cropRect.y);
      // Bottom
      ctx.fillRect(
        0,
        cropRect.y + cropRect.height,
        canvas.width,
        canvas.height - (cropRect.y + cropRect.height)
      );
      // Left
      ctx.fillRect(0, cropRect.y, cropRect.x, cropRect.height);
      // Right
      ctx.fillRect(
        cropRect.x + cropRect.width,
        cropRect.y,
        canvas.width - (cropRect.x + cropRect.width),
        cropRect.height
      );

      // Crop border line
      ctx.strokeStyle = "#4F46E5";
      ctx.lineWidth = Math.max(2, Math.round(canvas.width / 400));
      ctx.strokeRect(cropRect.x, cropRect.y, cropRect.width, cropRect.height);
    }
  }, [imageLoaded, imgElement, cropRect]);

  // Pointer Down Handler
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle?: string) => {
    e.preventDefault();
    if (!imgElement || !cropRect || !containerRef.current) return;

    setDragState({
      type: handle ? "handle" : "move",
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...cropRect },
    });

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  // Pointer Move Handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || !imgElement || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const scaleX = imgElement.width / rect.width;
    const scaleY = imgElement.height / rect.height;

    const deltaX = Math.round((e.clientX - dragState.startX) * scaleX);
    const deltaY = Math.round((e.clientY - dragState.startY) * scaleY);

    const { startCrop, type, handle } = dragState;
    let nextX = startCrop.x;
    let nextY = startCrop.y;
    let nextW = startCrop.width;
    let nextH = startCrop.height;

    if (type === "move") {
      nextX = Math.max(0, Math.min(imgElement.width - startCrop.width, startCrop.x + deltaX));
      nextY = Math.max(0, Math.min(imgElement.height - startCrop.height, startCrop.y + deltaY));
    } else if (type === "handle" && handle) {
      if (handle.includes("e")) {
        nextW = Math.max(20, Math.min(imgElement.width - startCrop.x, startCrop.width + deltaX));
      }
      if (handle.includes("s")) {
        nextH = Math.max(20, Math.min(imgElement.height - startCrop.y, startCrop.height + deltaY));
      }
      if (handle.includes("w")) {
        const potentialW = startCrop.width - deltaX;
        if (potentialW >= 20 && startCrop.x + deltaX >= 0) {
          nextX = startCrop.x + deltaX;
          nextW = potentialW;
        }
      }
      if (handle.includes("n")) {
        const potentialH = startCrop.height - deltaY;
        if (potentialH >= 20 && startCrop.y + deltaY >= 0) {
          nextY = startCrop.y + deltaY;
          nextH = potentialH;
        }
      }

      // Enforce locked aspect ratio if active
      if (aspectRatio !== "free") {
        let targetRatio = 1;
        if (aspectRatio === "1:1") targetRatio = 1;
        if (aspectRatio === "4:3") targetRatio = 4 / 3;
        if (aspectRatio === "3:4") targetRatio = 3 / 4;
        if (aspectRatio === "16:9") targetRatio = 16 / 9;
        if (aspectRatio === "passport") targetRatio = 3.5 / 4.5;
        if (aspectRatio === "signature") targetRatio = 140 / 60;

        nextH = Math.round(nextW / targetRatio);
        if (nextY + nextH > imgElement.height) {
          nextH = imgElement.height - nextY;
          nextW = Math.round(nextH * targetRatio);
        }
      }
    }

    onCropChange({ x: nextX, y: nextY, width: nextW, height: nextH });
  };

  // Pointer Up Handler
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState) {
      setDragState(null);
    }
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/40 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-sm">
            <HiOutlineScissors className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Precision Crop Engine
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Drag handles or select predefined ratios to trim your image perfectly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSignatureTool && (
            <button
              type="button"
              onClick={handleAutoTrimSignature}
              disabled={isAutoCropping}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200 shadow-xs transition-all"
            >
              <HiSparkles className="w-4 h-4 text-indigo-600" />
              {isAutoCropping ? "Scanning..." : "Auto-Trim Signature Margins"}
            </button>
          )}

          <button
            type="button"
            onClick={onResetCrop}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition-all"
          >
            <HiOutlineArrowPath className="w-4 h-4" />
            Reset Crop
          </button>
        </div>
      </div>

      {/* Aspect Ratio Buttons */}
      <div className="space-y-2.5">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Select Crop Aspect Ratio
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "free", label: "Free Form" },
            { id: "1:1", label: "1:1 Square" },
            { id: "4:3", label: "4:3 Standard" },
            { id: "3:4", label: "3:4 Portrait" },
            { id: "16:9", label: "16:9 Wide" },
            { id: "passport", label: "Passport (3.5:4.5)" },
            { id: "signature", label: "Signature (2.33:1)" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() =>
                applyAspectRatio(opt.id as AspectRatioOption, cropRect, imgElement)
              }
              className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                aspectRatio === opt.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Dimension Readout */}
      {cropRect && imgElement && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs">
          <div className="text-slate-600 font-semibold flex items-center gap-2">
            <span>Crop Selection:</span>
            <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
              {cropRect.width} × {cropRect.height} px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">
              Offset: X={cropRect.x}, Y={cropRect.y}
            </span>
            <span className="text-indigo-700 font-bold bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
              Original: {imgElement.width} × {imgElement.height} px
            </span>
          </div>
        </div>
      )}

      {/* Interactive Crop Viewport - Shrink-wrapped to image without black letterboxing */}
      <div className="w-full flex justify-center items-center p-3 sm:p-4 bg-slate-100/70 rounded-2xl border border-slate-200/80 min-h-[250px]">
        {imageLoaded && imgElement ? (
          <div
            ref={containerRef}
            onPointerDown={(e) => handlePointerDown(e)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative inline-block select-none touch-none rounded-none overflow-hidden shadow-xl border border-slate-300/80 bg-white cursor-move"
          >
            <canvas
              ref={canvasRef}
              className="block max-w-full max-h-[520px] w-auto h-auto select-none pointer-events-none"
            />

            {/* Drag Handles & Crop Box Overlay */}
            {cropRect && imgElement && containerRef.current && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Crop Box Area & Rule-of-Thirds Grid */}
                <div
                  style={{
                    left: `${(cropRect.x / imgElement.width) * 100}%`,
                    top: `${(cropRect.y / imgElement.height) * 100}%`,
                    width: `${(cropRect.width / imgElement.width) * 100}%`,
                    height: `${(cropRect.height / imgElement.height) * 100}%`,
                  }}
                  className="absolute border-2 border-indigo-600 pointer-events-auto cursor-move shadow-xs"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handlePointerDown(e);
                  }}
                >
                  {/* Grid Lines */}
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 pointer-events-none">
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-r border-b border-white/40" />
                    <div className="border-b border-white/40" />
                    <div className="border-r border-white/40" />
                    <div className="border-r border-white/40" />
                    <div />
                  </div>
                </div>

                {/* 8 Drag Handles positioned at exact percentages of the crop rect */}
                {[
                  { id: "nw", cursor: "cursor-nwse-resize" },
                  { id: "n", cursor: "cursor-ns-resize" },
                  { id: "ne", cursor: "cursor-nesw-resize" },
                  { id: "e", cursor: "cursor-ew-resize" },
                  { id: "se", cursor: "cursor-nwse-resize" },
                  { id: "s", cursor: "cursor-ns-resize" },
                  { id: "sw", cursor: "cursor-nesw-resize" },
                  { id: "w", cursor: "cursor-ew-resize" },
                ].map(({ id, cursor }) => {
                  let leftPct = (cropRect.x / imgElement.width) * 100;
                  let topPct = (cropRect.y / imgElement.height) * 100;

                  if (id.includes("e")) leftPct += (cropRect.width / imgElement.width) * 100;
                  if (id.includes("s")) topPct += (cropRect.height / imgElement.height) * 100;
                  if (id === "n" || id === "s") leftPct += ((cropRect.width / 2) / imgElement.width) * 100;
                  if (id === "e" || id === "w") topPct += ((cropRect.height / 2) / imgElement.height) * 100;

                  return (
                    <div
                      key={id}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        handlePointerDown(e, id);
                      }}
                      style={{
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                      }}
                      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-4 sm:w-4.5 h-4 sm:h-4.5 bg-white border-2 border-indigo-600 rounded-full shadow-lg hover:scale-125 active:scale-150 transition-transform ${cursor}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-slate-400 font-medium text-xs">Loading image viewport...</div>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center font-medium">
        💡 Click and drag inside the selection box to reposition crop. Drag white handles to adjust boundaries.
      </p>
    </div>
  );
}
