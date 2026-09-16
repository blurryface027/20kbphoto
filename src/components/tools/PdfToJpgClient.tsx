"use client";

import { useState, useRef } from "react";
import JSZip from "jszip";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineArrowPath,
  HiOutlineDocumentCheck,
  HiOutlinePhoto,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface PDFPageItem {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

interface Props {
  toolSlug: "pdf-to-jpg" | "pdf-to-image";
}

export default function PdfToJpgClient({ toolSlug }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [scale, setScale] = useState<number>(1.5); // 1.5x resolution for crisp text
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>("");
  const [pages, setPages] = useState<PDFPageItem[]>([]);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processPDF = async (pdfFile: File, targetFormat = outputFormat, targetScale = scale) => {
    setFile(pdfFile);
    setIsProcessing(true);
    setPages([]);
    setProgress("Loading PDF document...");

    try {
      // Dynamic import pdfjs-dist
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdfDoc.numPages;

      const renderedPages: PDFPageItem[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgress(`Rendering page ${i} of ${totalPages}...`);
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: targetScale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
          const dataUrl = canvas.toDataURL(targetFormat, 0.92);

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((b) => resolve(b!), targetFormat, 0.92);
          });

          renderedPages.push({
            pageNumber: i,
            dataUrl,
            blob,
            width: Math.round(viewport.width),
            height: Math.round(viewport.height),
          });
        }
      }

      setPages(renderedPages);
      trackEvent("pdf_converted_to_image", {
        tool_name: toolSlug,
        page_count: totalPages,
        format: targetFormat,
      });
    } catch (err) {
      console.error("Error processing PDF:", err);
      alert("Could not process PDF. Please ensure it is a valid, unencrypted PDF file.");
    } finally {
      setIsProcessing(false);
      setProgress("");
    }
  };

  const downloadAllAsZip = async () => {
    if (pages.length === 0 || !file) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();
      const ext = outputFormat === "image/jpeg" ? "jpg" : "png";
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      pages.forEach((p) => {
        zip.file(`${baseName}-page-${p.pageNumber}.${ext}`, p.blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}-images.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error creating ZIP:", err);
    } finally {
      setIsZipping(false);
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
              processPDF(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && processPDF(e.target.files[0])}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineCloudArrowUp className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload PDF Document to Convert to Images
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Extract every page into high resolution JPG or PNG format. 100% private in browser.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            <HiOutlineDocumentCheck className="w-4 h-4" />
            Select PDF File
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
              {file.name} ({pages.length} Page{pages.length > 1 ? "s" : ""})
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFile(null);
                  setPages([]);
                }}
                className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <HiOutlineTrash className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Output Image Format</label>
              <select
                value={outputFormat}
                onChange={(e) => {
                  const fmt = e.target.value as any;
                  setOutputFormat(fmt);
                  if (file) processPDF(file, fmt, scale);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="image/jpeg">JPG / JPEG Format (Recommended for photos)</option>
                <option value="image/png">PNG Format (High Quality / Text Crisp)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Render Resolution Quality</label>
              <select
                value={scale}
                onChange={(e) => {
                  const sc = parseFloat(e.target.value);
                  setScale(sc);
                  if (file) processPDF(file, outputFormat, sc);
                }}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1.0}>Standard (100% / Standard Web)</option>
                <option value={1.5}>High Resolution (150% / Clear Text)</option>
                <option value={2.0}>Ultra High (200% / Crisp Print Quality)</option>
              </select>
            </div>
          </div>

          {isProcessing ? (
            <div className="text-center py-12 space-y-3">
              <HiOutlineArrowPath className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-800">{progress}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pages.length > 1 && (
                <div className="flex justify-end">
                  <button
                    onClick={downloadAllAsZip}
                    disabled={isZipping}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    {isZipping ? (
                      <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
                    ) : (
                      <HiOutlineArrowDownTray className="w-4 h-4" />
                    )}
                    Download All Pages as ZIP
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pages.map((p) => (
                  <div
                    key={p.pageNumber}
                    className="bg-slate-50 rounded-2xl border border-slate-200 p-3 flex flex-col hover:shadow-md transition-all"
                  >
                    <div className="aspect-[3/4] bg-white rounded-xl overflow-hidden mb-2 border border-slate-200/60 relative flex items-center justify-center p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 left-2 bg-slate-900/80 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Page {p.pageNumber}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono mb-3">
                      {p.width} × {p.height} px · {Math.round(p.blob.size / 1024)} KB
                    </div>

                    <a
                      href={p.dataUrl}
                      download={`${file.name.replace(/\.[^/.]+$/, "")}-page-${p.pageNumber}.${
                        outputFormat === "image/jpeg" ? "jpg" : "png"
                      }`}
                      className="mt-auto w-full py-2 bg-white hover:bg-indigo-50 border border-slate-300 hover:border-indigo-300 text-slate-800 hover:text-indigo-600 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <HiOutlinePhoto className="w-4 h-4" /> Download Image
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
