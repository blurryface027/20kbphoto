"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { searchAll, type SearchResult } from "@/lib/searchIndex";
import {
  HiOutlineDocumentText,
  HiOutlineWrenchScrewdriver,
  HiOutlineArchiveBox,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineLockClosed,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

interface GlobalSearchProps {
  onClose: () => void;
}

export default function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length >= 1) {
      const searchResults = searchAll(query.trim());
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const suggestions = useMemo(
    () => [
      "SSC CGL photo",
      "resize image to 20kb",
      "signature 140x60",
      "UPSC photo",
      "passport photo",
      "PAN card photo",
      "50 KB image",
      "NEET photo",
    ],
    []
  );

  const typeIcons: Record<string, React.ReactNode> = {
    exam: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600 shrink-0" />,
    tool: <HiOutlineWrenchScrewdriver className="w-5 h-5 text-indigo-600 shrink-0" />,
    "kb-tool": <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600 shrink-0" />,
    "dimension-tool": <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600 shrink-0" />,
  };

  const typeLabels: Record<string, string> = {
    exam: "Exam",
    tool: "Tool",
    "kb-tool": "Size Tool",
    "dimension-tool": "Dimension",
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Panel */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exams, tools, dimensions (e.g. 50 KB image, SSC CGL)..."
            className="flex-1 text-base bg-transparent outline-none text-gray-900 placeholder:text-gray-400 font-medium"
            aria-label="Search 20KB Photo"
          />
          <button
            onClick={onClose}
            className="text-xs text-gray-500 border border-gray-200 px-2 py-1 rounded-md hover:bg-gray-100 font-mono transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result, i) => (
                <Link
                  key={`${result.url}-${i}`}
                  href={result.url}
                  onClick={onClose}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-indigo-50/60 rounded-xl transition-colors group"
                >
                  <span className="mt-0.5">{typeIcons[result.type] || <HiOutlineWrenchScrewdriver className="w-5 h-5 text-indigo-600 shrink-0" />}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {result.title}
                    </div>
                    {result.meta && (
                      <div className="text-xs text-indigo-600 font-medium mt-0.5">{result.meta}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                      {result.description}
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 font-semibold rounded-full shrink-0 mt-1">
                    {typeLabels[result.type] || "Tool"}
                  </span>
                </Link>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500 text-sm font-medium">No results found for &ldquo;{query}&rdquo;</div>
              <Link
                href="/tools/image-resizer"
                onClick={onClose}
                className="text-indigo-600 font-semibold text-sm mt-2 inline-block hover:underline"
              >
                Try the Image Resizer →
              </Link>
            </div>
          ) : (
            <div className="p-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2 px-3 mb-4">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-semibold px-3 py-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <HiOutlineLockClosed className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Your files are processed locally in your browser
          </span>
          <span className="hidden sm:inline">↑↓ Navigate · Enter to select</span>
        </div>
      </div>
    </div>
  );
}
