"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineDocumentCheck,
  HiOutlineArrowPath,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface DocPage {
  id: string;
  file: File;
  originalUrl: string;
  enhancedDataUrl: string;
  filter: "bw" | "grayscale" | "contrast" | "color" | "original";
  width: number;
  height: number;
}

export default function DocumentScannerClient() {
  const [pages, setPages] = useState<DocPage[]>([]);
  const [globalFilter, setGlobalFilter] = useState<"bw" | "grayscale" | "contrast" | "color" | "original">("bw");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const applyFilterToCanvas = (
    img: HTMLImageElement,
    filterMode: "bw" | "grayscale" | "contrast" | "color" | "original"
  ): string => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return img.src;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    if (filterMode === "original") {
      return canvas.toDataURL("image/jpeg", 0.92);
    }

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Luminance
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      if (filterMode === "bw") {
        // High Contrast B&W threshold with smooth document look
        const val = gray > 140 ? 255 : Math.max(0, gray - 30);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      } else if (filterMode === "grayscale") {
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      } else if (filterMode === "contrast") {
        // Contrast boost
        const factor = 1.4;
        data[i] = Math.min(255, Math.max(0, factor * (r - 128) + 128));
        data[i + 1] = Math.min(255, Math.max(0, factor * (g - 128) + 128));
        data[i + 2] = Math.min(255, Math.max(0, factor * (b - 128) + 128));
      } else if (filterMode === "color") {
        // Magic color enhance
        data[i] = Math.min(255, r * 1.1);
        data[i + 1] = Math.min(255, g * 1.1);
        data[i + 2] = Math.min(255, b * 1.1);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  };

  const handleFilesAdded = async (files: FileList | File[]) => {
    setIsProcessing(true);
    const newPages: DocPage[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const originalUrl = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = originalUrl;
      });

      const enhancedDataUrl = applyFilterToCanvas(img, globalFilter);
      newPages.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        originalUrl,
        enhancedDataUrl,
        filter: globalFilter,
        width: img.width || 800,
        height: img.height || 600,
      });
    }

    setPages((prev) => [...prev, ...newPages]);
    setIsProcessing(false);
    setPdfUrl(null);
  };

  const updateGlobalFilter = (newFilter: "bw" | "grayscale" | "contrast" | "color" | "original") => {
    setGlobalFilter(newFilter);
    const updated = pages.map((p) => {
      const img = new Image();
      img.src = p.originalUrl;
      const enhancedDataUrl = applyFilterToCanvas(img, newFilter);
      return { ...p, filter: newFilter, enhancedDataUrl };
    });
    setPages(updated);
    setPdfUrl(null);
  };

  const exportScannedPDF = async () => {
    if (pages.length === 0) return;
    setIsProcessing(true);

    try {
      let doc: jsPDF | null = null;

      for (let i = 0; i < pages.length; i++) {
        const p = pages[i];
        const pageW = 210; // mm A4
        const pageH = 297;

        if (i === 0) {
          doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
        } else {
          doc!.addPage("a4", "p");
        }

        const availW = 200;
        const availH = 287;
        const scale = Math.min(availW / p.width, availH / p.height);
        const drawW = p.width * scale;
        const drawH = p.height * scale;
        const posX = (pageW - drawW) / 2;
        const posY = (pageH - drawH) / 2;

        doc!.addImage(p.enhancedDataUrl, "JPEG", posX, posY, drawW, drawH);
      }

      if (doc) {
        const blob = doc.output("blob");
        setPdfUrl(URL.createObjectURL(blob));

        trackEvent("document_scanned", {
          tool_name: "document-scanner",
          page_count: pages.length,
          filter: globalFilter,
        });
      }
    } catch (err) {
      console.error("Error creating scanned PDF:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {pages.length === 0 ? (
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
            <HiOutlineDocumentCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Document Photos to Scan & Enhance
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Upload photos of Aadhar, PAN, marksheets, certificates or receipts. Convert to clear B&W scan & export to PDF.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Document Photos
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {pages.length} Scanned Page{pages.length > 1 ? "s" : ""}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
              >
                + Add More Pages
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
                onClick={() => {
                  setPages([]);
                  setPdfUrl(null);
                }}
                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>

          {/* Scanner Enhancement Preset Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <label className="block text-xs font-bold text-slate-700">Scan Filter Enhancement Mode</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "bw", label: "Magic B&W Scanner (High Contrast)", icon: "✨" },
                { id: "grayscale", label: "Grayscale Document", icon: "📄" },
                { id: "contrast", label: "Contrast Boost", icon: "🎨" },
                { id: "color", label: "Magic Color", icon: "🌈" },
                { id: "original", label: "Original Photo", icon: "📷" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateGlobalFilter(f.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    globalFilter === f.id
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scanned Pages Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pages.map((p, idx) => (
              <div key={p.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col">
                <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden mb-2 border border-slate-200 relative flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.enhancedDataUrl} alt={`Page ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Page {idx + 1}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span>{p.file.name}</span>
                  <button
                    onClick={() => setPages(pages.filter((_, i) => i !== idx))}
                    className="text-rose-600 hover:text-rose-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Export Options */}
          <div className="pt-4 border-t border-slate-200 text-center space-y-3">
            {!pdfUrl ? (
              <button
                onClick={exportScannedPDF}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all"
              >
                {isProcessing ? (
                  <HiOutlineArrowPath className="w-5 h-5 animate-spin" />
                ) : (
                  <HiOutlineDocumentCheck className="w-5 h-5" />
                )}
                Generate Scanned PDF Document
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-3xl max-w-lg mx-auto text-center space-y-3">
                <h4 className="text-base font-extrabold text-slate-900">Scanned Document PDF Ready!</h4>
                <a
                  href={pdfUrl}
                  download={`scanned-document-${Date.now()}.pdf`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all"
                >
                  <HiOutlineArrowDownTray className="w-5 h-5" /> Download Scanned PDF File
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
