import React from "react";
import { Exam } from "@/data/exams";
import {
  HiOutlinePhoto,
  HiOutlinePencilSquare,
  HiInformationCircle,
  HiCheckCircle,
  HiExclamationTriangle,
  HiOutlineCheckBadge,
  HiOutlineLink,
} from "react-icons/hi2";

interface OfficialExamGuidelinesProps {
  exam: Exam;
}

export default function OfficialExamGuidelines({ exam }: OfficialExamGuidelinesProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 space-y-10">
      {/* Title & Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <HiOutlineCheckBadge className="w-4 h-4 text-emerald-600" />
          Verified Official Requirements • Last Updated {exam.lastVerified}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Official Specifications for <span className="text-indigo-600">{exam.name}</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 max-w-2xl mx-auto">
          Conducting Authority: <strong className="text-gray-900 font-semibold">{exam.authority}</strong> ({exam.fullName})
        </p>
      </div>

      {/* VERIFIED SPECIFICATIONS COMPARISON TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HiInformationCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <h3 className="font-extrabold text-base sm:text-lg">
              {exam.name} Document Specification Summary
            </h3>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-indigo-200 font-mono">
            Source: {exam.source || "Official Notification"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 sm:px-6">Parameter</th>
                <th className="py-3.5 px-4 sm:px-6">Photograph Requirements</th>
                <th className="py-3.5 px-4 sm:px-6">Signature Requirements</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">Pixel Dimensions (Width × Height)</td>
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-indigo-600">
                  {exam.photo.width} × {exam.photo.height} px {exam.photo.isDimensionFlexible ? <span className="text-xs text-amber-700 font-normal ml-1">(Flexible / Recommended)</span> : null}
                </td>
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-indigo-600">
                  {exam.signature.width} × {exam.signature.height} px {exam.signature.isDimensionFlexible ? <span className="text-xs text-amber-700 font-normal ml-1">(Flexible / Recommended)</span> : null}
                </td>
              </tr>
              {exam.photo.physicalWidthCm || exam.signature.physicalWidthCm ? (
                <tr className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">Physical Size (cm / mm)</td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                    {exam.photo.physicalWidthCm && exam.photo.physicalHeightCm ? `${exam.photo.physicalWidthCm} cm × ${exam.photo.physicalHeightCm} cm` : 'As per official portal'}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                    {exam.signature.physicalWidthCm && exam.signature.physicalHeightCm ? `${exam.signature.physicalWidthCm} cm × ${exam.signature.physicalHeightCm} cm` : 'As per official portal'}
                  </td>
                </tr>
              ) : null}
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">File Size Limit (KB)</td>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">{exam.photo.minKB > 0 ? `${exam.photo.minKB} KB to ${exam.photo.maxKB} KB` : `Max ${exam.photo.maxKB} KB`}</td>
                <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">{exam.signature.minKB > 0 ? `${exam.signature.minKB} KB to ${exam.signature.maxKB} KB` : `Max ${exam.signature.maxKB} KB`}</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">Accepted Formats</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-gray-800">{exam.photo.format}</td>
                <td className="py-3.5 px-4 sm:px-6 font-mono text-gray-800">{exam.signature.format}</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">Target Resolution (DPI)</td>
                <td className="py-3.5 px-4 sm:px-6 text-gray-600">{exam.photo.dpi ? `${exam.photo.dpi} DPI` : "200 - 300 DPI recommended"}</td>
                <td className="py-3.5 px-4 sm:px-6 text-gray-600">{exam.signature.dpi ? `${exam.signature.dpi} DPI` : "200 - 300 DPI recommended"}</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-900 bg-gray-50/30">Background / Ink Rules</td>
                <td className="py-3.5 px-4 sm:px-6 text-gray-600">{exam.photo.notes || "Light or plain white background, 70-80% face coverage"}</td>
                <td className="py-3.5 px-4 sm:px-6 text-gray-600">{exam.signature.notes || "Black or dark blue ink pen on clean white paper"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-COLUMN CARDS GRID: PHOTO VS SIGNATURE GUIDELINES */}
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
                <h3 className="text-lg font-extrabold text-gray-900 leading-snug">Photograph Rules</h3>
                <span className="text-xs text-gray-500 font-medium">Official Exam Guidelines</span>
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
                <span>General Photo Instructions</span>
              </div>
              <div className="bg-gray-50/80 border border-gray-200/70 rounded-2xl p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                A recent colored passport-size photograph taken against a light-colored or plain white background. The file size should strictly be between {exam.photo.minKB} KB and {exam.photo.maxKB} KB in {exam.photo.format} format.
              </div>
            </div>

            {/* Rules & Background */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rules & Face Coverage</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal space-y-1">
                <p>• Clear frontal view with both ears visible and eyes open looking straight at the camera.</p>
                <p>• The face must cover 70% to 80% of the image frame.</p>
                <p>• No dark sunglasses, caps, hats, or face coverings are permitted.</p>
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
                <h3 className="text-lg font-extrabold text-gray-900 leading-snug">Signature Rules</h3>
                <span className="text-xs text-gray-500 font-medium">Official Exam Guidelines</span>
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
                <span>General Signature Instructions</span>
              </div>
              <div className="bg-gray-50/80 border border-gray-200/70 rounded-2xl p-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                A scanned image of the candidate&apos;s signature with their full name written in clear running handwriting on plain white paper using a black or dark blue ink pen.
              </div>
            </div>

            {/* Rules & Ink */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                <HiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rules & Ink Constraints</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal space-y-1">
                <p>• Must be signed with a black or dark blue ink pen within a clean white background.</p>
                <p>• Signatures in ALL CAPITAL LETTERS or block initials are strictly rejected.</p>
                <p>• File size must strictly be between {exam.signature.minKB} KB and {exam.signature.maxKB} KB.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* COMMON REJECTION MISTAKES WARNING BOX */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
            <HiExclamationTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-amber-950">
              Common {exam.name} Application Rejection Traps to Avoid
            </h3>
            <p className="text-xs text-amber-800 font-medium">
              Over 15% of online applications are rejected during initial document verification due to formatting issues.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-amber-900/90 font-medium">
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-600 font-bold">✕</span>
            <span>Uploading a photo with shadows, patterned background, or non-white backdrop.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-600 font-bold">✕</span>
            <span>Signing in capital block letters or using a light gel/pencil pen.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-600 font-bold">✕</span>
            <span>Uploading file sizes smaller than {exam.photo.minKB}KB or larger than {exam.photo.maxKB}KB.</span>
          </li>
          <li className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-amber-200/60">
            <span className="text-amber-600 font-bold">✕</span>
            <span>Submitting blurry, distorted, or tilted scans taken from a phone camera without cropping.</span>
          </li>
        </ul>
      </div>

      {/* VERIFICATION SOURCE NOTICE */}
      <div className="text-center text-xs text-gray-500 flex flex-wrap items-center justify-center gap-2 pt-2">
        <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
          <HiOutlineLink className="w-3.5 h-3.5 text-indigo-600" />
          Source: {exam.sourceUrl ? (
            <a
              href={exam.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline font-bold"
            >
              {exam.sourceTitle || `${exam.authority} Official Portal`}
            </a>
          ) : (
            `${exam.authority} Official Recruitment Portal`
          )}
        </span>
        <span>•</span>
        <span>Specifications verified against official notification on {exam.lastVerified}.</span>
        <span>•</span>
        <span className="text-gray-400">Always confirm with the latest recruitment notification before final submission.</span>
      </div>
    </div>
  );
}
