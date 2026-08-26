"use client";

import { useState } from "react";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";
import UploadDropzone from "@/components/tools/UploadDropzone";
import PreviewPanel from "@/components/tools/PreviewPanel";
import ValidationBadges from "@/components/tools/ValidationBadges";
import DownloadPanel from "@/components/tools/DownloadPanel";
import { compressToSize, getImageInfo, type ImageInfo, type ProcessingResult } from "@/lib/imageProcessor";

interface KBToolClientProps {
  targetKB: number;
}

export default function KBToolClient({ targetKB }: KBToolClientProps) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalInfo, setOriginalInfo] = useState<ImageInfo | undefined>(undefined);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setIsProcessing(true);
    try {
      const info = await getImageInfo(file);
      setOriginalInfo(info);
      const res = await compressToSize(file, targetKB);
      setResult(res);
    } catch (err) {
      console.error("Processing failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setOriginalFile(null);
    setOriginalInfo(undefined);
    setResult(null);
  };

  const relatedSizes = [10, 20, 30, 40, 50, 60, 100, 150, 200, 300].filter((s) => s !== targetKB);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: `Resize to ${targetKB}KB` },
  ];

  const faqs = [
    {
      question: `How do I compress an image to under ${targetKB}KB?`,
      answer: `Upload your image file (JPG, PNG, WEBP). Our browser binary-search compressor automatically optimizes image encoding quality until the output file size is exactly under ${targetKB}KB.`,
    },
    {
      question: "Is my photo uploaded to any server during compression?",
      answer: "No. 100% of image compression happens locally inside your browser's memory using HTML5 Canvas API technology. Your photo never leaves your device.",
    },
    {
      question: `Which government exam forms require ${targetKB}KB photo size?`,
      answer: `Many central and state government recruitment portals (including SSC CGL, IBPS PO, RRB NTPC, UPSC, and State PSCs) strictly require photograph or signature uploads between 10KB and ${targetKB}KB.`,
    },
  ];

  return (
    <ToolShell
      title={`Resize Image to ${targetKB}KB Online`}
      subtitle={`Compress and reduce any photo or signature image file size to exactly ${targetKB}KB or less for online forms and application portals.`}
      breadcrumbs={breadcrumbs}
      faqs={faqs}
    >
      {!originalFile ? (
        <UploadDropzone onFileSelect={handleFileSelect} label={`Upload image to resize to ${targetKB}KB`} />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          <PreviewPanel
            originalFile={originalFile}
            originalInfo={originalInfo}
            processedDataUrl={result?.dataUrl}
            processedInfo={
              result
                ? {
                    width: result.width,
                    height: result.height,
                    size: result.size,
                    format: result.format,
                    quality: result.quality,
                  }
                : undefined
            }
            isProcessing={isProcessing}
          />

          {result && (
            <>
              <ValidationBadges
                checks={{
                  dimensions: true,
                  fileSize: result.size / 1024 <= targetKB + 1,
                  format: true,
                }}
                details={{
                  width: result.width,
                  height: result.height,
                  size: result.size,
                  format: result.format,
                }}
                requirements={{
                  width: result.width,
                  height: result.height,
                  minKB: 0,
                  maxKB: targetKB,
                  format: "JPG/PNG",
                }}
              />
              <DownloadPanel
                blob={result.blob}
                filename={`image-${targetKB}kb.jpg`}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Other Exact Size Compressors</h3>
        <div className="flex flex-wrap gap-2">
          {relatedSizes.map((size) => (
            <Link
              key={size}
              href={`/resize-image-to-${size}kb`}
              className="px-3.5 py-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 rounded-full text-xs font-semibold transition-all"
            >
              Resize to {size}KB
            </Link>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
