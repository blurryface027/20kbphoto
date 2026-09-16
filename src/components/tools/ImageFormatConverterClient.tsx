"use client";

import { useState, useRef } from "react";
import { processImage } from "@/lib/imageProcessor";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineArrowPath,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

export default function ImageFormatConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");
  const [convertedDataUrl, setConvertedDataUrl] = useState<string | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [convertedSizeKB, setConvertedSizeKB] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    processConversion(selectedFile, targetFormat);
  };

  const processConversion = async (
    imgFile: File,
    fmt = targetFormat
  ) => {
    setIsProcessing(true);
    try {
      const result = await processImage(imgFile, {
        format: fmt,
      });

      setConvertedDataUrl(result.dataUrl);
      setConvertedBlob(result.blob);
      setConvertedSizeKB(Math.round(result.size / 1024));

      trackEvent("image_format_converted", {
        tool_name: "image-format-converter",
        input_format: imgFile.type,
        output_format: fmt,
      });
    } catch (err) {
      console.error("Error converting format:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const isPngToJpg = file?.type === "image/png" && targetFormat === "image/jpeg";

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
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineArrowPath className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Image to Convert Format
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Convert JPG to PNG, PNG to JPG, WebP to JPG, PNG to WebP effortlessly.
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
              {file.name} ({Math.round(file.size / 1024)} KB)
            </div>

            <button
              onClick={() => {
                setFile(null);
                setConvertedDataUrl(null);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">Choose Target Format</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "image/jpeg", label: "JPG / JPEG", desc: "Exam & Form Standard" },
                { id: "image/png", label: "PNG", desc: "High Quality / Transparent" },
                { id: "image/webp", label: "WebP", desc: "Lightweight Web Format" },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setTargetFormat(fmt.id as any);
                    if (file) processConversion(file, fmt.id as any);
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    targetFormat === fmt.id
                      ? "border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <div className="text-xs font-extrabold text-slate-900">{fmt.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Transparency Warning Notice for PNG -> JPG */}
          {isPngToJpg && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800 font-semibold flex items-center gap-2">
              <HiOutlineInformationCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Note: JPG does not support transparent backgrounds. Transparent areas will be converted to a clean white background.
              </span>
            </div>
          )}

          {/* Preview & Download */}
          {convertedDataUrl && !isProcessing && (
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md mx-auto">
              <span className="text-xs font-bold text-slate-500 block">Converted Image Result</span>
              <div className="aspect-square bg-white rounded-xl overflow-hidden border border-slate-200 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={convertedDataUrl} alt="Converted" className="w-full h-full object-contain" />
              </div>

              <div className="text-xs text-slate-600 font-semibold">
                Converted Size: <span className="font-bold text-slate-900">{convertedSizeKB} KB</span>
              </div>

              <a
                href={convertedDataUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}.${
                  targetFormat === "image/jpeg" ? "jpg" : targetFormat === "image/png" ? "png" : "webp"
                }`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
              >
                <HiOutlineArrowDownTray className="w-5 h-5" /> Download Converted File
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
