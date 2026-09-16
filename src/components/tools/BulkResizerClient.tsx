"use client";

import { useState, useRef } from "react";
import JSZip from "jszip";
import { processImage } from "@/lib/imageProcessor";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineSquare2Stack,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface BulkResizeItem {
  id: string;
  file: File;
  originalWidth: number;
  originalHeight: number;
  resizedWidth: number | null;
  resizedHeight: number | null;
  resizedBlob: Blob | null;
  resizedDataUrl: string | null;
  status: "pending" | "processing" | "done" | "error";
}

export default function BulkResizerClient() {
  const [items, setItems] = useState<BulkResizeItem[]>([]);
  const [mode, setMode] = useState<"percentage" | "dimensions">("percentage");
  const [scalePercent, setScalePercent] = useState<number>(50);
  const [targetWidth, setTargetWidth] = useState<number>(300);
  const [targetHeight, setTargetHeight] = useState<number>(300);
  const [keepAspectRatio, setKeepAspectRatio] = useState<boolean>(true);

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = async (files: FileList | File[]) => {
    const newItems: BulkResizeItem[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
      });

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        originalWidth: img.width || 800,
        originalHeight: img.height || 600,
        resizedWidth: null,
        resizedHeight: null,
        resizedBlob: null,
        resizedDataUrl: null,
        status: "pending",
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const processBulkResize = async () => {
    if (items.length === 0) return;
    setIsResizing(true);

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      updated[i].status = "processing";
      setItems([...updated]);

      try {
        let w: number | undefined = undefined;
        let h: number | undefined = undefined;
        let pct: number | undefined = undefined;

        if (mode === "percentage") {
          pct = scalePercent;
        } else {
          w = targetWidth;
          h = keepAspectRatio ? undefined : targetHeight;
        }

        const result = await processImage(updated[i].file, {
          width: w,
          height: h,
          scalePercent: pct,
          format: updated[i].file.type || "image/jpeg",
        });

        updated[i].resizedBlob = result.blob;
        updated[i].resizedWidth = result.width;
        updated[i].resizedHeight = result.height;
        updated[i].resizedDataUrl = result.dataUrl;
        updated[i].status = "done";
      } catch (err) {
        console.error("Error resizing file:", err);
        updated[i].status = "error";
      }

      setItems([...updated]);
    }

    setIsResizing(false);

    trackEvent("bulk_resized", {
      tool_name: "bulk-image-resizer",
      image_count: items.length,
      mode,
    });
  };

  const downloadAllZip = async () => {
    const completedItems = items.filter((it) => it.resizedBlob);
    if (completedItems.length === 0) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();
      completedItems.forEach((it) => {
        const ext = it.file.name.split(".").pop() || "jpg";
        const nameWithoutExt = it.file.name.replace(/\.[^/.]+$/, "");
        zip.file(`${nameWithoutExt}-resized.${ext}`, it.resizedBlob!);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bulk-resized-images-${Date.now()}.zip`;
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
            <HiOutlineSquare2Stack className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Multiple Images to Resize in Bulk
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Batch resize images by exact pixel dimensions or percentage scale with ZIP download.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Multiple Image Files
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {items.length} Image File{items.length > 1 ? "s" : ""} Loaded
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
              >
                + Add More Files
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Resize Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as any)}
                className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white outline-none"
              >
                <option value="percentage">Percentage Scale (%)</option>
                <option value="dimensions">Target Dimensions (Pixels)</option>
              </select>
            </div>

            {mode === "percentage" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scale Percentage ({scalePercent}%)</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={scalePercent}
                  onChange={(e) => setScalePercent(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Width (px)</label>
                <input
                  type="number"
                  min="10"
                  max="5000"
                  value={targetWidth}
                  onChange={(e) => setTargetWidth(parseInt(e.target.value) || 300)}
                  className="w-full text-xs font-bold border border-slate-300 rounded-xl p-2 bg-slate-50 outline-none"
                />
              </div>
            )}

            <div className="flex items-end">
              <button
                onClick={processBulkResize}
                disabled={isResizing}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isResizing ? (
                  <>
                    <HiOutlineArrowPath className="w-4 h-4 animate-spin" /> Batch Resizing...
                  </>
                ) : (
                  <>Resize All {items.length} Files Now</>
                )}
              </button>
            </div>
          </div>

          {/* Table Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">Batch Resize Results</span>
              {items.some((it) => it.status === "done") && (
                <button
                  onClick={downloadAllZip}
                  disabled={isZipping}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                >
                  {isZipping ? (
                    <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
                  ) : (
                    <HiOutlineArrowDownTray className="w-4 h-4" />
                  )}
                  Download All ZIP
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">File Name</th>
                    <th className="py-2.5 px-3">Original Dimensions</th>
                    <th className="py-2.5 px-3">Resized Dimensions</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {items.map((it) => (
                    <tr key={it.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-900 truncate max-w-[150px]">
                        {it.file.name}
                      </td>
                      <td className="py-2.5 px-3 font-mono">{it.originalWidth} × {it.originalHeight} px</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">
                        {it.resizedWidth && it.resizedHeight ? `${it.resizedWidth} × ${it.resizedHeight} px` : "—"}
                      </td>
                      <td className="py-2.5 px-3">
                        {it.status === "processing" ? (
                          <span className="text-indigo-600 font-bold flex items-center gap-1">
                            <HiOutlineArrowPath className="w-3.5 h-3.5 animate-spin" /> Processing
                          </span>
                        ) : it.status === "done" ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <HiOutlineCheckCircle className="w-4 h-4" /> Ready
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">Pending</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {it.resizedDataUrl && (
                          <a
                            href={it.resizedDataUrl}
                            download={`${it.file.name.replace(/\.[^/.]+$/, "")}-resized.${
                              it.file.name.split(".").pop() || "jpg"
                            }`}
                            className="text-indigo-600 font-bold hover:underline"
                          >
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
