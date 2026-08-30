import React from "react";
import {
  HiMagnifyingGlass,
  HiOutlineArrowUpTray,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

export default function HowItWorksSection() {
  return (
    <section className="py-14 sm:py-20 bg-gray-50/70 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get your exam documents ready in 3 simple steps. No technical skills required.
          </p>
        </div>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto text-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-6 shadow-2xs transition-transform hover:scale-105">
              <HiMagnifyingGlass className="w-7 h-7 stroke-2" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2.5">
              1. Select Your Exam
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-sm">
              Choose from our extensive list of supported government exams. We automatically load the correct dimensions and file size limits.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-6 shadow-2xs transition-transform hover:scale-105">
              <HiOutlineArrowUpTray className="w-7 h-7 stroke-2" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2.5">
              2. Upload & Customize
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-sm">
              Upload your photo or signature. Our tool handles resizing and compression automatically.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center mb-6 shadow-2xs transition-transform hover:scale-105">
              <HiOutlineArrowDownTray className="w-7 h-7 stroke-2" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 mb-2.5">
              3. Download
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal max-w-sm">
              Preview your processed image and download it instantly. Your files are processed locally and never leave your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
