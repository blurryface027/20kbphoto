"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { trackEvent } from "@/lib/gtag";
import {
  HiCheckCircle,
  HiOutlineCamera,
  HiOutlinePencilSquare,
  HiInformationCircle,
  HiOutlineCloudArrowUp,
  HiMagnifyingGlass,
  HiXMark,
  HiChevronRight,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

export interface RequirementSpec {
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  format: string;
}

interface UploadDropzoneProps {
  onFileSelect: (
    file: File,
    options?: { docType?: "photo" | "signature"; requirement?: RequirementSpec }
  ) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  sublabel?: string;
  toolName?: string;
  toolTitle?: string;
  showExamSelector?: boolean;
  showDocTypeSelector?: boolean;
  selectedExamName?: string;
  selectedExamSlug?: string;
  initialDocType?: "photo" | "signature";
  photoRequirements?: RequirementSpec;
  signatureRequirements?: RequirementSpec;
  customRequirements?: RequirementSpec;
  onRequirementChange?: (req: RequirementSpec, docType: "photo" | "signature") => void;
}

const defaultPopularExams: { name: string; photo: RequirementSpec; signature: RequirementSpec }[] = [
  {
    name: "UPSC CSE",
    photo: { width: 400, height: 400, minKB: 20, maxKB: 300, format: "JPG" },
    signature: { width: 350, height: 350, minKB: 20, maxKB: 300, format: "JPG" },
  },
  {
    name: "SSC CGL",
    photo: { width: 275, height: 354, minKB: 20, maxKB: 50, format: "JPG" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "JPG" },
  },
  {
    name: "SSC CHSL",
    photo: { width: 200, height: 240, minKB: 20, maxKB: 50, format: "JPG" },
    signature: { width: 200, height: 80, minKB: 10, maxKB: 20, format: "JPG" },
  },
  {
    name: "IBPS PO / Clerk",
    photo: { width: 200, height: 230, minKB: 20, maxKB: 50, format: "JPG" },
    signature: { width: 140, height: 60, minKB: 10, maxKB: 20, format: "JPG" },
  },
  {
    name: "NEET UG",
    photo: { width: 350, height: 450, minKB: 10, maxKB: 200, format: "JPG" },
    signature: { width: 275, height: 118, minKB: 4, maxKB: 30, format: "JPG" },
  },
  {
    name: "JEE Main",
    photo: { width: 350, height: 450, minKB: 10, maxKB: 200, format: "JPG" },
    signature: { width: 275, height: 118, minKB: 4, maxKB: 30, format: "JPG" },
  },
  {
    name: "PAN Card",
    photo: { width: 213, height: 213, minKB: 10, maxKB: 50, format: "JPG" },
    signature: { width: 444, height: 205, minKB: 10, maxKB: 30, format: "JPG" },
  },
  {
    name: "Passport Photo",
    photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: "JPG" },
    signature: { width: 200, height: 80, minKB: 10, maxKB: 50, format: "JPG" },
  },
];

export default function UploadDropzone({
  onFileSelect,
  accept = "image/jpeg,image/png,image/webp,image/heic,.heic,.heif",
  maxSizeMB = 15,
  label = "Click or drop image",
  sublabel = "JPG, PNG, HEIC, or WEBP up to 15MB",
  toolName,
  toolTitle,
  showExamSelector = false,
  showDocTypeSelector = false,
  selectedExamName,
  initialDocType = "photo",
  photoRequirements = { width: 400, height: 400, minKB: 20, maxKB: 300, format: "JPG" },
  signatureRequirements = { width: 350, height: 350, minKB: 20, maxKB: 300, format: "JPG" },
  customRequirements,
  onRequirementChange,
}: UploadDropzoneProps) {
  const [docType, setDocType] = useState<"photo" | "signature">(initialDocType);
  const [currentExamName, setCurrentExamName] = useState<string>(selectedExamName || "UPSC");
  
  const [photoReq, setPhotoReq] = useState<RequirementSpec>(photoRequirements);
  const [sigReq, setSigReq] = useState<RequirementSpec>(signatureRequirements);

  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeReq = customRequirements || (docType === "photo" ? photoReq : sigReq);

  const handleDocTypeChange = (newType: "photo" | "signature") => {
    setDocType(newType);
    const req = newType === "photo" ? photoReq : sigReq;
    if (onRequirementChange) {
      onRequirementChange(req, newType);
    }
  };

  const handleSelectExamPreset = (examItem: { name: string; photo: RequirementSpec; signature: RequirementSpec }) => {
    setCurrentExamName(examItem.name);
    setPhotoReq(examItem.photo);
    setSigReq(examItem.signature);

    const req = docType === "photo" ? examItem.photo : examItem.signature;
    if (onRequirementChange) {
      onRequirementChange(req, docType);
    }
    setIsModalOpen(false);
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    trackEvent("image_upload", {
      tool_name: toolName || "image_upload_dropzone",
      file_type: file.type || "image/unknown",
      doc_type: docType,
      exam_name: currentExamName,
    });

    onFileSelect(file, { docType, requirement: activeReq });
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

  const filteredExams = defaultPopularExams.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 2-Column Card Container */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: STEP 1 CONFIGURATION */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Step Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                  1
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  Configuration
                </h3>
              </div>

              {/* CARD 1: Selected Exam OR Active Tool */}
              {showExamSelector ? (
                /* Homepage & General Resizer: Interactive Exam Preset Switcher */
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <HiCheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                        Selected Exam
                      </span>
                      <h4 className="text-base font-extrabold text-indigo-950 leading-snug">
                        {currentExamName}
                      </h4>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs hover:bg-indigo-50 transition-colors"
                  >
                    &lt; Change
                  </button>
                </div>
              ) : selectedExamName ? (
                /* Specific Exam Page: Locked Exam Badge */
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <HiCheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                      Exam Preset
                    </span>
                    <h4 className="text-base font-extrabold text-indigo-950 leading-snug">
                      {selectedExamName}
                    </h4>
                  </div>
                </div>
              ) : (
                /* Standalone Tool Page: Active Tool Card */
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <HiOutlineWrenchScrewdriver className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                      Active Tool
                    </span>
                    <h4 className="text-base font-extrabold text-indigo-950 leading-snug">
                      {toolTitle || "Image Resizer"}
                    </h4>
                  </div>
                </div>
              )}

              {/* CARD 2: Document Type Selector */}
              {showDocTypeSelector ? (
                /* Homepage & General Resizer: Interactive Toggle */
                <div className="mt-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5 block">
                    Choose Document Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleDocTypeChange("photo")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 text-center ${
                        docType === "photo"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                          : "bg-gray-50/80 text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                          docType === "photo" ? "bg-white/20 text-white" : "bg-white text-indigo-600 border border-gray-200"
                        }`}
                      >
                        <HiOutlineCamera className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm">Photo</span>
                      <span
                        className={`text-[11px] mt-0.5 ${
                          docType === "photo" ? "text-indigo-100" : "text-gray-400"
                        }`}
                      >
                        Passport size
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDocTypeChange("signature")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 text-center ${
                        docType === "signature"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                          : "bg-gray-50/80 text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                          docType === "signature" ? "bg-white/20 text-white" : "bg-white text-indigo-600 border border-gray-200"
                        }`}
                      >
                        <HiOutlinePencilSquare className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm">Signature</span>
                      <span
                        className={`text-[11px] mt-0.5 ${
                          docType === "signature" ? "text-indigo-100" : "text-gray-400"
                        }`}
                      >
                        Digital sign
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Standalone Tool Page: Single Locked Document Type Badge */
                <div className="mt-5 bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    {docType === "signature" ? (
                      <HiOutlinePencilSquare className="w-5 h-5" />
                    ) : (
                      <HiOutlineCamera className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider block">
                      Target Document Type
                    </span>
                    <h5 className="text-sm font-extrabold text-gray-900">
                      {docType === "signature" ? "Signature (Digital sign)" : "Photo (Passport size)"}
                    </h5>
                  </div>
                </div>
              )}

              {/* CARD 3: Image Requirements Card */}
              <div className="mt-5 bg-indigo-50/50 border border-indigo-100/80 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-xs mb-3">
                  <HiInformationCircle className="w-4 h-4 text-indigo-600" />
                  <span>Image Requirements</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white rounded-xl p-2.5 border border-indigo-100/60 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Dimensions
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-gray-900 block">
                      {activeReq.width} × {activeReq.height} px
                    </span>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-indigo-100/60 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Size
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-gray-900 block">
                      {activeReq.minKB > 0 ? `${activeReq.minKB}–${activeReq.maxKB} KB` : `Max ${activeReq.maxKB} KB`}
                    </span>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-indigo-100/60 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Format
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-gray-900 block">
                      {activeReq.format}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Footer Note */}
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-6 pt-4 border-t border-gray-100">
              Privacy First: Your photos are processed locally in your browser and never uploaded to any server.
            </p>
          </div>

          {/* RIGHT COLUMN: STEP 2 UPLOAD & PROCESS */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex flex-col h-full">
              {/* Step Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                  2
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  Upload & Process
                </h3>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center group min-h-[260px] ${
                  isDragging
                    ? "border-indigo-600 bg-indigo-50/80 scale-[1.01]"
                    : "border-gray-300 bg-gray-50/60 hover:bg-indigo-50/30 hover:border-indigo-400 shadow-2xs"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  onChange={handleChange}
                  className="hidden"
                  aria-label="Upload Image File"
                />

                {/* Cloud Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4 group-hover:scale-105 transition-transform">
                  <HiOutlineCloudArrowUp className="w-8 h-8" />
                </div>

                <h4 className="text-lg font-extrabold text-gray-900 mb-1">
                  {label}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                  {sublabel}
                </p>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-medium">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Footer Note */}
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-6 pt-4 border-t border-gray-100">
              Fast & Secure: Image processing happens instantly on your device. No waiting, no uploads.
            </p>
          </div>
        </div>
      </div>

      {/* CHANGE EXAM PRESET MODAL (Only when showExamSelector is true) */}
      {showExamSelector && isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">
                Select Exam Preset
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <HiMagnifyingGlass className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exam (e.g. UPSC, SSC, NEET, PAN)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Exam List */}
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {filteredExams.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleSelectExamPreset(item)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    currentExamName === item.name
                      ? "bg-indigo-50/80 border-indigo-300 text-indigo-900 font-bold"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-200"
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{item.name}</span>
                    <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                      Photo: {item.photo.width}×{item.photo.height}px ({item.photo.minKB}–{item.photo.maxKB}KB) • Sig: {item.signature.width}×{item.signature.height}px
                    </span>
                  </div>
                  <HiChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
