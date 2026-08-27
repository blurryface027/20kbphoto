"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { trackEvent } from "@/lib/gtag";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  toolName?: string;
}

export default function UploadDropzone({
  onFileSelect,
  accept = "image/jpeg,image/png,image/webp",
  maxSizeMB = 10,
  label = "Click or drop image to start",
  sublabel = "JPG, PNG, or WEBP up to 10MB",
  toolName,
}: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = (file: File) => {
    setError(null);
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
    const fileType = (file.type || "").toLowerCase();
    const fileName = (file.name || "").toLowerCase();

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        return fileName.endsWith(type);
      }
      if (type.endsWith("/*")) {
        return fileType.startsWith(type.replace("/*", ""));
      }
      if (type === "image/jpeg" || type === "image/jpg") {
        return fileType === "image/jpeg" || fileType === "image/jpg" || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");
      }
      if (type === "image/png") {
        return fileType === "image/png" || fileName.endsWith(".png");
      }
      if (type === "image/webp") {
        return fileType === "image/webp" || fileName.endsWith(".webp");
      }
      return type === fileType;
    });

    if (!isAccepted) {
      if (accept === "image/png") {
        setError("Invalid file format. Please upload a PNG image file (.png).");
      } else if (accept === "image/webp") {
        setError("Invalid file format. Please upload a WebP image file (.webp).");
      } else if (accept === "image/jpeg,image/jpg" || accept === "image/jpeg" || accept === "image/jpg") {
        setError("Invalid file format. Please upload a JPG or JPEG image file (.jpg, .jpeg).");
      } else {
        setError("Invalid file format. Please upload an allowed image format.");
      }
      return;
    }

    trackEvent("image_upload", {
      tool_name: toolName || "image_upload_dropzone",
      file_type: file.type || "image/unknown",
    });

    onFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-indigo-600 bg-indigo-50/80 scale-[1.01]"
            : "border-indigo-200 bg-gradient-to-b from-indigo-50/30 to-white hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-lg hover:shadow-indigo-100/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          aria-label="Upload File"
        />

        {/* Upload Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-xs group-hover:scale-110 transition-transform">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Label & Sublabel */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-1">
          {label}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 text-center font-medium">
          {sublabel}
        </p>

        {/* Privacy Note */}
        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-medium border border-emerald-100">
          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          100% Private — Processed in your browser
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs sm:text-sm rounded-xl border border-red-200 w-full text-center font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
