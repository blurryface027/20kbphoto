"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
  HiOutlineArrowDownTray,
  HiOutlineArrowPath,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

interface Props {
  toolSlug: "jpg-to-pdf" | "image-to-pdf" | "photos-to-pdf";
}

export default function JspdfConverterClient({ toolSlug }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "fit" | "letter">("a4");
  const [orientation, setOrientation] = useState<"portrait" | "landscape" | "auto">("auto");
  const [margin, setMargin] = useState<"none" | "small" | "medium">("small");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [pdfSizeKB, setPdfSizeKB] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = async (files: FileList | File[]) => {
    const newItems: ImageItem[] = [];
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
      });
    }

    setImages((prev) => [...prev, ...newItems]);
    setPdfBlobUrl(null);
    setPdfSizeKB(null);
  };

  const moveImage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setImages(updated);
    setPdfBlobUrl(null);
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setPdfBlobUrl(null);
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      let doc: jsPDF | null = null;

      const marginMM = margin === "none" ? 0 : margin === "small" ? 5 : 10;

      for (let i = 0; i < images.length; i++) {
        const item = images[i];

        // Determine orientation for current image if auto
        let imgOrientation: "p" | "l" = "p";
        if (orientation === "auto") {
          imgOrientation = item.width > item.height ? "l" : "p";
        } else {
          imgOrientation = orientation === "landscape" ? "l" : "p";
        }

        let pdfPageW = 210; // mm A4 width
        let pdfPageH = 297; // mm A4 height

        if (pageSize === "letter") {
          pdfPageW = 215.9;
          pdfPageH = 279.4;
        } else if (pageSize === "fit") {
          // Convert px to mm (72 dpi ratio roughly)
          pdfPageW = item.width * 0.264583;
          pdfPageH = item.height * 0.264583;
        }

        if (imgOrientation === "l" && pageSize !== "fit") {
          const temp = pdfPageW;
          pdfPageW = pdfPageH;
          pdfPageH = temp;
        }

        if (i === 0) {
          doc = new jsPDF({
            orientation: imgOrientation,
            unit: "mm",
            format: pageSize === "fit" ? [pdfPageW, pdfPageH] : pageSize === "letter" ? "letter" : "a4",
          });
        } else {
          doc!.addPage(
            pageSize === "fit" ? [pdfPageW, pdfPageH] : pageSize === "letter" ? "letter" : "a4",
            imgOrientation
          );
        }

        // Draw image onto canvas to get clean JPEG data
        const canvas = document.createElement("canvas");
        canvas.width = item.width;
        canvas.height = item.height;
        const ctx = canvas.getContext("2d");
        const imgEl = new Image();
        imgEl.src = item.previewUrl;
        await new Promise((r) => {
          imgEl.onload = r;
        });
        ctx?.drawImage(imgEl, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        // Calculate fitted bounds inside margins
        const availW = pdfPageW - marginMM * 2;
        const availH = pdfPageH - marginMM * 2;
        const scale = Math.min(availW / item.width, availH / item.height);
        const drawW = item.width * scale;
        const drawH = item.height * scale;
        const posX = marginMM + (availW - drawW) / 2;
        const posY = marginMM + (availH - drawH) / 2;

        doc!.addImage(imgData, "JPEG", posX, posY, drawW, drawH);
      }

      if (doc) {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        setPdfSizeKB(Math.round(blob.size / 1024));

        trackEvent("pdf_created", {
          tool_name: toolSlug,
          page_count: images.length,
          page_size: pageSize,
        });
      }
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {images.length === 0 ? (
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
            accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp"
            className="hidden"
            onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineCloudArrowUp className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Images to Convert to PDF
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Select one or multiple JPG, PNG, or WebP images. You can reorder pages before generating PDF.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            <HiOutlineDocumentText className="w-4 h-4" />
            Select Image Files
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {images.length} Image{images.length > 1 ? "s" : ""} Loaded
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
                onClick={() => {
                  setImages([]);
                  setPdfBlobUrl(null);
                }}
                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Size</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value as any);
                  setPdfBlobUrl(null);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="a4">Standard A4 (210×297 mm)</option>
                <option value="letter">US Letter (8.5×11 in)</option>
                <option value="fit">Fit Page to Image Size</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Orientation</label>
              <select
                value={orientation}
                onChange={(e) => {
                  setOrientation(e.target.value as any);
                  setPdfBlobUrl(null);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="auto">Auto (Match Image)</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Page Margin</label>
              <select
                value={margin}
                onChange={(e) => {
                  setMargin(e.target.value as any);
                  setPdfBlobUrl(null);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="none">No Margin (Full Page)</option>
                <option value="small">Small Margin (5mm)</option>
                <option value="medium">Medium Margin (10mm)</option>
              </select>
            </div>
          </div>

          {/* Reorderable Page List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Page Sequence & Order
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-2.5 relative flex flex-col group hover:shadow-md transition-all"
                >
                  <div className="aspect-[3/4] bg-slate-200 rounded-xl overflow-hidden mb-2 relative flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt={`Page ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                    <span className="absolute top-1.5 left-1.5 bg-slate-900/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      P. {idx + 1}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-700 truncate mb-2">
                    {item.file.name}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-200/80 pt-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveImage(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                        title="Move Up"
                      >
                        <HiOutlineArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveImage(idx, "down")}
                        disabled={idx === images.length - 1}
                        className="p-1 rounded-md hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                        title="Move Down"
                      >
                        <HiOutlineArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeImage(idx)}
                      className="p-1 rounded-md hover:bg-rose-100 text-rose-600"
                      title="Delete Page"
                    >
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate & Download Controls */}
          <div className="pt-4 border-t border-slate-200 text-center space-y-4">
            {!pdfBlobUrl ? (
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                {isGenerating ? (
                  <>
                    <HiOutlineArrowPath className="w-5 h-5 animate-spin" /> Generating PDF...
                  </>
                ) : (
                  <>
                    <HiOutlineDocumentText className="w-5 h-5" /> Create PDF Document Now
                  </>
                )}
              </button>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-3xl max-w-lg mx-auto text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-1">
                  <HiOutlineCheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900">PDF Ready for Download!</h4>
                <p className="text-xs text-slate-600">
                  Total Size: <span className="font-bold text-slate-900">{pdfSizeKB} KB</span> · {images.length} Page{images.length > 1 ? "s" : ""}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={pdfBlobUrl}
                    download={`converted-document-${Date.now()}.pdf`}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <HiOutlineArrowDownTray className="w-5 h-5" /> Download PDF File
                  </a>

                  <button
                    onClick={generatePDF}
                    className="px-4 py-3 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Re-generate PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
