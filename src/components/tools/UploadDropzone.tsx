"use client";

import React, { useState, useRef, useMemo, useEffect, DragEvent, ChangeEvent } from "react";
import { trackEvent } from "@/lib/gtag";
import { exams, Exam } from "@/data/exams";
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

interface ExamPresetItem {
  name: string;
  fullName?: string;
  category: string;
  authority?: string;
  keywords?: string[];
  photo: RequirementSpec;
  signature: RequirementSpec;
}

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalInputRef = useRef<HTMLInputElement>(null);

  const activeReq = customRequirements || (docType === "photo" ? photoReq : sigReq);

  // Compile full exam presets list including special non-exam application tools
  const allExamPresets = useMemo<ExamPresetItem[]>(() => {
    const list: ExamPresetItem[] = [
      {
        name: "PAN Card",
        fullName: "Permanent Account Number Card Photo & Signature",
        category: "document",
        authority: "Income Tax Department / NSDL / UTITSL",
        keywords: ["pan card", "nsdl", "utitsl", "income tax"],
        photo: { width: 213, height: 213, minKB: 10, maxKB: 50, format: "JPG" },
        signature: { width: 444, height: 205, minKB: 10, maxKB: 30, format: "JPG" },
      },
      {
        name: "Passport Photo",
        fullName: "Standard Indian Passport Size Photograph",
        category: "document",
        authority: "Ministry of External Affairs / Passport Seva",
        keywords: ["passport photo", "3.5x4.5cm", "passport size", "mea"],
        photo: { width: 350, height: 450, minKB: 20, maxKB: 100, format: "JPG" },
        signature: { width: 200, height: 80, minKB: 10, maxKB: 50, format: "JPG" },
      },
    ];

    exams.forEach((e: Exam) => {
      list.push({
        name: e.name,
        fullName: e.fullName,
        category: e.category,
        authority: e.authority,
        keywords: e.keywords || [],
        photo: {
          width: e.photo.width,
          height: e.photo.height,
          minKB: e.photo.minKB,
          maxKB: e.photo.maxKB,
          format: e.photo.format || "JPG",
        },
        signature: {
          width: e.signature.width,
          height: e.signature.height,
          minKB: e.signature.minKB,
          maxKB: e.signature.maxKB,
          format: e.signature.format || "JPG",
        },
      });
    });

    return list;
  }, []);

  // Categories list for filter pills
  const categoriesList = useMemo(() => {
    return [
      { id: "all", label: "All Exams" },
      { id: "ssc", label: "SSC" },
      { id: "upsc", label: "UPSC" },
      { id: "banking", label: "Banking" },
      { id: "railway", label: "Railways" },
      { id: "admissions", label: "Entrance (NEET/JEE)" },
      { id: "state-psc", label: "State PSC" },
      { id: "police", label: "Police" },
      { id: "teaching", label: "Teaching" },
    ];
  }, []);

  // Filter exams based on query & category
  const filteredExams = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allExamPresets.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      const matchName = item.name.toLowerCase().includes(q);
      const matchFullName = (item.fullName || "").toLowerCase().includes(q);
      const matchAuthority = (item.authority || "").toLowerCase().includes(q);
      const matchCat = (item.category || "").toLowerCase().includes(q);
      const matchKeywords = (item.keywords || []).some((k) => k.toLowerCase().includes(q));

      return matchName || matchFullName || matchAuthority || matchCat || matchKeywords;
    });
  }, [allExamPresets, searchQuery, selectedCategory]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        modalInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen]);

  const handleDocTypeChange = (newType: "photo" | "signature") => {
    setDocType(newType);
    const req = newType === "photo" ? photoReq : sigReq;
    if (onRequirementChange) {
      onRequirementChange(req, newType);
    }
  };

  const handleSelectExamPreset = (examItem: ExamPresetItem) => {
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
        <div
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 animate-scale-in flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  Select Exam Preset
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Showing {filteredExams.length} of {allExamPresets.length} presets
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close modal"
              >
                <HiXMark className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input & Clear */}
            <div className="relative my-3 shrink-0">
              <HiMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
              <input
                ref={modalInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exam by name, acronym, category, or authority..."
                className="w-full pl-10 pr-9 py-2.5 text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15 text-gray-900 placeholder:text-gray-400 font-medium transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200/50 transition-colors"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills (Clean non-clipping single-line horizontal scroll) */}
            <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-gray-100 overflow-x-auto shrink-0 scrollbar-none">
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all shrink-0 whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Exam List Container */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {filteredExams.length > 0 ? (
                filteredExams.map((item) => (
                  <button
                    key={`${item.name}-${item.category}`}
                    type="button"
                    onClick={() => handleSelectExamPreset(item)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      currentExamName === item.name
                        ? "bg-indigo-50/90 border-indigo-300 text-indigo-900 font-bold shadow-xs"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50/80 hover:border-indigo-200"
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-gray-900">{item.name}</span>
                        {item.category && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold uppercase tracking-wider border border-gray-200/50">
                            {item.category}
                          </span>
                        )}
                      </div>
                      {item.fullName && item.fullName !== item.name && (
                        <span className="text-xs text-gray-500 font-medium truncate block mt-0.5">
                          {item.fullName}
                        </span>
                      )}
                      <span className="text-[11px] text-indigo-600 font-semibold block mt-1">
                        Photo: {item.photo.width}×{item.photo.height}px ({item.photo.minKB}–{item.photo.maxKB}KB) • Sig: {item.signature.width}×{item.signature.height}px ({item.signature.minKB}–{item.signature.maxKB}KB)
                      </span>
                    </div>
                    <HiChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </button>
                ))
              ) : (
                <div className="p-8 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                  <div className="text-gray-500 text-sm font-semibold mb-1">
                    No presets found for &ldquo;{searchQuery}&rdquo;
                  </div>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto mb-4">
                    Try searching by full name, authority (e.g. NTA, SSC, UPSC), or select a category filter above.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="text-xs px-3.5 py-1.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium shrink-0">
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">ESC</kbd> to close</span>
              <span>100+ Verified Exam Specifications</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
