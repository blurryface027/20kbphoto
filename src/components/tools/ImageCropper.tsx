"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  HiOutlineScissors,
  HiSparkles,
  HiOutlineArrowPath,
  HiOutlineArrowsUpDown,
  HiOutlineRectangleStack,
} from "react-icons/hi2";
import { autoCropSignature, type CropRect, type ImageInfo } from "@/lib/imageProcessor";

interface ImageCropperProps {
  file: File;
  originalInfo?: ImageInfo;
  cropRect: CropRect | null;
  onCropChange: (rect: CropRect) => void;
  onResetCrop: () => void;
  isSignatureTool?: boolean;
}

type AspectRatioOption = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "passport" | "signature";

export default function ImageCropper({
  file,
  originalInfo,
  cropRect,
  onCropChange,
  onResetCrop,
  isSignatureTool = false,
}: ImageCropperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>(
    isSignatureTool ? "signature" : "free"
  );
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [isAutoCropping, setIsAutoCropping] = useState(false);

  // Local drag state
  const [dragState, setDragState] = useState<{
    type: "move" | "handle" | null;
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
      if (!img || !currentCrop) return;

      if (ratioOpt === "free") return;

      let ratio = 1;
      if (ratioOpt === "1:1") ratio = 1;
      if (ratioOpt === "4:3") ratio = 4 / 3;
      if (ratioOpt === "3:4") ratio = 3 / 4;
      if (ratioOpt === "16:9") ratio = 16 / 9;
      if (ratioOpt === "passport") ratio = 3.5 / 4.5;
      if (ratioOpt === "signature") ratio = 140 / 60;

      let newW = currentCrop.width;
      let newH = Math.round(newW / ratio);

      if (newH > img.height) {
        newH = img.height;
        newW = Math.round(newH * ratio);
      }
      if (newW > img.width) {
        newW = img.width;
        newH = Math.round(newW / ratio);
      }

      let newX = Math.max(0, Math.min(img.width - newW, currentCrop.x));
      let newY = Math.max(0, Math.min(img.height - newH, currentCrop.y));

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
      ctx.fillRect(0, cropRect.y + cropRect.height, canvas.width, canvas.height - (cropRect.y + cropRect.height));
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

      // Grid rule of thirds lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;

      const thirdW = cropRect.width / 3;
      const thirdH = cropRect.height / 3;

      ctx.beginPath();
      ctx.moveTo(cropRect.x + thirdW, cropRect.y);
      ctx.lineTo(cropRect.x + thirdW, cropRect.y + cropRect.height);
      ctx.moveTo(cropRect.x + thirdW * 2, cropRect.y);
      ctx.lineTo(cropRect.x + thirdW * 2, cropRect.y + cropRect.height);

      ctx.moveTo(cropRect.x, cropRect.y + thirdH);
      ctx.lineTo(cropRect.x + cropRect.width, cropRect.y + thirdH);
      ctx.moveTo(cropRect.x, cropRect.y + thirdH * 2);
      ctx.lineTo(cropRect.x + cropRect.width, cropRect.y + thirdH * 2);
      ctx.stroke();
    }
  }, [imageLoaded, imgElement, cropRect]);

  // Mouse / Touch Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle?: string) => {
    e.preventDefault();
    if (!imgElement || !cropRect || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    setDragState({
      type: handle ? "handle" : "move",
      handle,
      startX: clientX,
      startY: clientY,
      startCrop: { ...cropRect },
    });

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || !imgElement || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
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

      // Enforce locked aspect ratio if selected
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

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState) {
      setDragState(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiOutlineScissors className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Crop Image Options</h3>
        </div>

        <div className="flex items-center gap-2">
          {isSignatureTool && (
            <button
              type="button"
              onClick={handleAutoTrimSignature}
              disabled={isAutoCropping}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors"
            >
              <HiSparkles className="w-4 h-4 text-indigo-600" />
              {isAutoCropping ? "Scanning..." : "Auto-Trim Signature Margins"}
            </button>
          )}

          <button
            type="button"
            onClick={onResetCrop}
            className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 transition-colors"
          >
            <HiOutlineArrowPath className="w-3.5 h-3.5" />
            Reset Crop
          </button>
        </div>
      </div>

      {/* Aspect Ratio Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
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
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                aspectRatio === opt.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Dimension Readout */}
      {cropRect && imgElement && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200 text-xs">
          <div className="text-gray-600 font-medium">
            Crop Selection:{" "}
            <span className="font-bold text-gray-900">
              {cropRect.width} × {cropRect.height} px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500">
              Offset: X={cropRect.x}, Y={cropRect.y}
            </span>
            <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">
              Original: {imgElement.width}×{imgElement.height} px
            </span>
          </div>
        </div>
      )}

      {/* Interactive Crop Viewport */}
      <div
        ref={containerRef}
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full max-h-[460px] bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center cursor-move touch-none border border-gray-300"
      >
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[460px] object-contain select-none"
        />

        {/* Drag Handles Overlay */}
        {cropRect && imgElement && containerRef.current && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner & Edge Handles */}
            {["nw", "n", "ne", "e", "se", "s", "sw", "w"].map((h) => {
              const rect = containerRef.current!.getBoundingClientRect();
              const scaleX = rect.width / imgElement.width;
              const scaleY = rect.height / imgElement.height;

              // Compute handle positions on screen
              let left = cropRect.x * scaleX;
              let top = cropRect.y * scaleY;

              if (h.includes("e")) left += cropRect.width * scaleX;
              if (h.includes("w")) left += 0;
              if (h.includes("s")) top += cropRect.height * scaleY;
              if (h.includes("n")) top += 0;

              if (h === "n" || h === "s") left += (cropRect.width * scaleX) / 2;
              if (h === "e" || h === "w") top += (cropRect.height * scaleY) / 2;

              return (
                <div
                  key={h}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    handlePointerDown(e, h);
                  }}
                  style={{
                    left: `${left}px`,
                    top: `${top}px`,
                  }}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md hover:scale-125 transition-transform cursor-pointer"
                />
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        💡 Drag the image or white handles to adjust crop boundaries. Click preset ratios to lock aspect ratio.
      </p>
    </div>
  );
}
