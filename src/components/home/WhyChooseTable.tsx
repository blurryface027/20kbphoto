import React from "react";
import { HiCheck, HiXMark } from "react-icons/hi2";

export default function WhyChooseTable() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50/50 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Why Choose <span className="text-indigo-600">20KBPhoto Resizer?</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See how we stack up against other resizing methods. We prioritize your privacy and ease of use.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <th scope="col" className="p-4 sm:p-5 w-1/4 bg-gray-50/80">
                    Feature
                  </th>
                  <th scope="col" className="p-4 sm:p-5 w-1/4 bg-indigo-50/60 text-indigo-700">
                    20KBPhoto Resizer
                  </th>
                  <th scope="col" className="p-4 sm:p-5 w-1/4 bg-gray-50/80 text-gray-600">
                    Other Online Tools
                  </th>
                  <th scope="col" className="p-4 sm:p-5 w-1/4 bg-gray-50/80 text-gray-600">
                    Manual Editing <span className="normal-case font-normal text-gray-400 block text-[11px]">(Photoshop / Paint)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {/* Row 1 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Privacy (Local Processing)
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <HiCheck className="w-4 h-4 stroke-2" />
                      </span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                        <HiXMark className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Uploads to server</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <HiCheck className="w-4 h-4 stroke-2" />
                    </span>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Pre-set Exam Dimensions
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <HiCheck className="w-4 h-4 stroke-2" />
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ?
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Varies</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                        <HiXMark className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Manual setup needed</span>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Automatic File Size Compression
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <HiCheck className="w-4 h-4 stroke-2" />
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                      ?
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                        <HiXMark className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Hard to control exact KB</span>
                    </div>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Add Name & Date
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <HiCheck className="w-4 h-4 stroke-2" />
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                        <HiXMark className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Rarely supported</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ?
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Time consuming</span>
                    </div>
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    iPhone HEIC/HEIF Support
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <HiCheck className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600">Native support</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                        <HiXMark className="w-4 h-4 stroke-2" />
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Requires converter</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        ?
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">Depends on OS/App</span>
                    </div>
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Processing Engine
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                      Browser & Web Canvas
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 font-medium">
                    Standard JavaScript
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 font-medium">
                    Native Application
                  </td>
                </tr>

                {/* Row 7 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Ease of Use
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Easiest
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                      Moderate
                    </span>
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                      Difficult
                    </span>
                  </td>
                </tr>

                {/* Row 8 */}
                <tr className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-gray-900">
                    Cost
                  </td>
                  <td className="p-4 sm:p-5 bg-indigo-50/30 font-extrabold text-indigo-600 text-sm sm:text-base">
                    100% Free
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 font-medium">
                    Often Freemium/Ads
                  </td>
                  <td className="p-4 sm:p-5 text-gray-600 font-medium">
                    Expensive Software
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

