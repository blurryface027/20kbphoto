"use client";

import { useState, useRef } from "react";
import JSZip from "jszip";
import { processImage } from "@/lib/imageProcessor";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineArchiveBox,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface BulkItem {
  id: string;
  file: File;
  originalSizeKB: number;
  compressedBlob: Blob | null;
  compressedSizeKB: number | null;
  compressedDataUrl: string | null;
  savingsPercent: number | null;
  status: "pending" | "processing" | "done" | "error";
}

export default function BulkCompressorClient() {
  const [items, setItems] = useState<BulkItem[]>([]);
  const [targetKB, setTargetKB] = useState<number>(50);
  const [useTargetKB, setUseTargetKB] = useState<boolean>(true);
  const [quality, setQuality] = useState<number>(80);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = async (files: FileList | File[]) => {
    const newItems: BulkItem[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        originalSizeKB: Math.round(file.size / 1024),
        compressedBlob: null,
        compressedSizeKB: null,
        compressedDataUrl: null,
        savingsPercent: null,
        status: "pending",
      });
    }

    setItems((prev) => [...prev, ...newItems]);
  };

  const processBulkCompression = async (
    itemList = items,
    useKB = useTargetKB,
    kbLimit = targetKB,
    qualPct = quality
  ) => {
    if (itemList.length === 0) return;
    setIsCompressing(true);

    const updated = [...itemList];

    for (let i = 0; i < updated.length; i++) {
      updated[i].status = "processing";
      setItems([...updated]);

      try {
        const result = await processImage(updated[i].file, {
          targetKB: useKB ? kbLimit : undefined,
          format: updated[i].file.type || "image/jpeg",
        });

        const compSizeKB = Math.round(result.size / 1024);
        const origSizeKB = updated[i].originalSizeKB;
        const savings = Math.max(0, Math.round(((origSizeKB - compSizeKB) / origSizeKB) * 100));

        updated[i].compressedBlob = result.blob;
        updated[i].compressedSizeKB = compSizeKB;
        updated[i].compressedDataUrl = result.dataUrl;
        updated[i].savingsPercent = savings;
        updated[i].status = "done";
      } catch (err) {
        console.error("Error compressing file:", err);
        updated[i].status = "error";
      }

      setItems([...updated]);
    }

    setIsCompressing(false);

    trackEvent("bulk_compressed", {
      tool_name: "bulk-image-compressor",
      image_count: itemList.length,
      target_kb: useKB ? kbLimit : undefined,
    });
  };

  const downloadAllZip = async () => {
    const completedItems = items.filter((it) => it.compressedBlob);
    if (completedItems.length === 0) return;
    setIsZipping(true);

    try {
      const zip = new JSZip();
      completedItems.forEach((it) => {
        const ext = it.file.name.split(".").pop() || "jpg";
        const nameWithoutExt = it.file.name.replace(/\.[^/.]+$/, "");
        zip.file(`${nameWithoutExt}-compressed.${ext}`, it.compressedBlob!);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bulk-compressed-images-${Date.now()}.zip`;
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
            <HiOutlineArchiveBox className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Multiple Images to Compress in Bulk
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Compress multiple images to exact target KB size (20KB, 50KB, 100KB) simultaneously.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Compression Target KB</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="5"
                  max="5000"
                  value={targetKB}
                  onChange={(e) => setTargetKB(parseInt(e.target.value) || 50)}
                  className="flex-1 text-xs font-bold border border-slate-300 rounded-xl p-2 bg-slate-50 outline-none"
                />
                <span className="text-xs font-bold text-slate-600">KB per image</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[20, 30, 50, 100, 200, 300].map((kb) => (
                  <button
                    key={kb}
                    onClick={() => {
                      setTargetKB(kb);
                      processBulkCompression(items, true, kb, quality);
                    }}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                      targetKB === kb
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {kb} KB
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => processBulkCompression(items, true, targetKB, quality)}
                disabled={isCompressing}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCompressing ? (
                  <>
                    <HiOutlineArrowPath className="w-4 h-4 animate-spin" /> Batch Compressing...
                  </>
                ) : (
                  <>Compress All {items.length} Files Now</>
                )}
              </button>
            </div>
          </div>

          {/* Table Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">Batch Compression Results</span>
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
                    <th className="py-2.5 px-3">Original Size</th>
                    <th className="py-2.5 px-3">Compressed Size</th>
                    <th className="py-2.5 px-3">Saved %</th>
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
                      <td className="py-2.5 px-3 font-mono">{it.originalSizeKB} KB</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-600">
                        {it.compressedSizeKB ? `${it.compressedSizeKB} KB` : "—"}
                      </td>
                      <td className="py-2.5 px-3">
                        {it.savingsPercent !== null ? (
                          <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            -{it.savingsPercent}%
                          </span>
                        ) : (
                          "—"
                        )}
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
                        {it.compressedDataUrl && (
                          <a
                            href={it.compressedDataUrl}
                            download={`${it.file.name.replace(/\.[^/.]+$/, "")}-min.${
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
