"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { searchAll } from "@/lib/searchIndex";

const searchSuggestions = [
  "SSC CGL",
  "UPSC CSE",
  "IBPS PO",
  "NEET UG",
  "JEE Main",
  "20KB Image",
  "140×60 Signature",
  "Passport Photo",
];

export default function HomeHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleExecuteSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    const results = searchAll(trimmed);
    if (results.length > 0 && results[0].priority >= 80) {
      router.push(results[0].url);
    } else {
      router.push(`/exams?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteSearch(query);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-gray-50 border-b border-gray-200/80 py-16 sm:py-24 lg:py-28">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-100/40 via-[#1B2CC1]/15 to-blue-100/20 blur-3xl pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1B2CC1] animate-pulse" />
            100% Free & Private — Browser-Based Resizer
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Free Indian Exam Photo &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B2CC1] via-blue-600 to-[#15239B]">
              Signature Resizer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Automatically resize and compress your photo & signature for{" "}
            <strong className="text-gray-900 font-semibold">UPSC, SSC, IBPS, NEET, JEE</strong> and 100+ government exams to exact required dimensions & KB sizes.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl border border-gray-200 shadow-lg shadow-indigo-100/40 p-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <svg
                className="ml-3 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exam preset (e.g. SSC CGL, UPSC, 20KB)..."
                className="flex-1 px-3 py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none bg-transparent"
                aria-label="Search for tools or exams"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors text-sm shrink-0 shadow-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {searchSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  handleExecuteSearch(s);
                }}
                className="text-xs px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors font-medium shadow-xs"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools/image-resizer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:-translate-y-0.5"
            >
              Start Resizer Tool
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/exams"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 shadow-sm transition-all"
            >
              Browse 100+ Exam Presets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
