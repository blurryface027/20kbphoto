import React from "react";
import { Exam } from "@/data/exams";
import { HiOutlinePhoto, HiOutlinePencilSquare, HiInformationCircle, HiCheckCircle } from "react-icons/hi2";

interface OfficialExamGuidelinesProps {
  exam: Exam;
}

export default function OfficialExamGuidelines({ exam }: OfficialExamGuidelinesProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      {/* Title & Badge */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Official Requirements for <span className="text-indigo-600">{exam.name}</span>
        </h2>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold">
          Administered by {exam.fullName || exam.authority} ({exam.name})
        </div>
      </div>

      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT CARD: PHOTOGRAPH GUIDELINES */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiOutlinePhoto className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 leading-snug">Photograph</h3>
                <span className="text-xs text-gray-500 font-medium">Official Guidelines</span>
              </div>
            </div>

            {/* Spec Pills */}
            <div className="grid grid-cols-3 gap-2 text-center mb-6">
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Dimensions
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.photo.width} × {exam.photo.height} <span className="text-xs font-normal text-gray-500">px</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  File Size
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.photo.minKB > 0 ? `${exam.photo.minKB}–${exam.photo.maxKB}` : `Max ${exam.photo.maxKB}`} <span className="text-xs font-normal text-gray-500">KB</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Format
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.photo.format}
                </span>
              </div>
            </div>

            {/* General Requirements */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                <HiInformationCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>General Requirements</span>
              </div>
              <div className="bg-gray-50/80 border border-gray-200/70 rounded-2xl p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                A recent colored passport-size photograph taken against a light-colored or plain white background. The file size should strictly be between {exam.photo.minKB} KB and {exam.photo.maxKB} KB in {exam.photo.format} format.
              </div>
            </div>

            {/* Rules & Background */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rules & Background</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                • The photograph must have a clear frontal view with both ears visible and eyes open looking straight at the camera. The face must cover 70% to 80% of the image area. No sunglasses, dark spectacles, caps, or face coverings are permitted.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: SIGNATURE GUIDELINES */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <HiOutlinePencilSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 leading-snug">Signature</h3>
                <span className="text-xs text-gray-500 font-medium">Official Guidelines</span>
              </div>
            </div>

            {/* Spec Pills */}
            <div className="grid grid-cols-3 gap-2 text-center mb-6">
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Dimensions
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.signature.width} × {exam.signature.height} <span className="text-xs font-normal text-gray-500">px</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  File Size
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.signature.minKB > 0 ? `${exam.signature.minKB}–${exam.signature.maxKB}` : `Max ${exam.signature.maxKB}`} <span className="text-xs font-normal text-gray-500">KB</span>
                </span>
              </div>
              <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                  Format
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {exam.signature.format}
                </span>
              </div>
            </div>

            {/* General Requirements */}
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                <HiInformationCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>General Requirements</span>
              </div>
              <div className="bg-gray-50/80 border border-gray-200/70 rounded-2xl p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                A scanned image of the candidate's signature with their full name written in clear running handwriting on plain white paper using a black or dark blue ink pen.
              </div>
            </div>

            {/* Rules & Ink */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rules & Ink</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                • The candidate must sign using a black or dark blue ink pen within the specified box. Signatures in ALL CAPITAL LETTERS or block initials are strictly rejected by the application portal. File size must be between {exam.signature.minKB} KB and {exam.signature.maxKB} KB.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
