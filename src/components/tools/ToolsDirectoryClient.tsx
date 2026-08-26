"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Tool, ExactKBTool, DimensionTool } from "@/data/tools";
import {
  HiOutlinePhoto,
  HiOutlineArchiveBox,
  HiOutlinePencilSquare,
  HiOutlineCamera,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineScissors,
  HiOutlineIdentification,
  HiOutlineArrowDownRight,
  HiOutlineDocumentText,
  HiOutlineWrenchScrewdriver,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";

const iconMap: Record<string, React.ReactNode> = {
  HiOutlinePhoto: <HiOutlinePhoto className="w-5 h-5 text-indigo-600" />,
  HiOutlineArchiveBox: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" />,
  HiOutlinePencilSquare: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" />,
  HiOutlineCamera: <HiOutlineCamera className="w-5 h-5 text-indigo-600" />,
  HiOutlineArrowPath: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" />,
  HiOutlineAdjustmentsHorizontal: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" />,
  HiOutlineScissors: <HiOutlineScissors className="w-5 h-5 text-indigo-600" />,
  HiOutlineIdentification: <HiOutlineIdentification className="w-5 h-5 text-indigo-600" />,
  HiOutlineArrowDownRight: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" />,
  HiOutlineDocumentText: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" />,
};

const extraSpecialTools = [
  {
    slug: "add-name-and-date-to-photo",
    name: "Add Name & Date to Photo",
    description: "Overlay candidate name and date of photo for SSC and UPSC forms.",
    path: "/add-name-and-date-to-photo",
    category: "photo",
    icon: "HiOutlinePencilSquare",
  },
  {
    slug: "pan-card-photo-resizer",
    name: "PAN Card Photo Resizer",
    description: "Resize photo to 213x213 pixels and 50KB for PAN Card portal.",
    path: "/pan-card-photo-resizer",
    category: "photo",
    icon: "HiOutlineIdentification",
  },
];

interface Props {
  tools: Tool[];
  exactKBTools: ExactKBTool[];
  dimensionTools: DimensionTool[];
}

export default function ToolsDirectoryClient({ tools, exactKBTools, dimensionTools }: Props) {
  const searchParams = useSearchParams();
  const qParam = searchParams ? searchParams.get("q") || "" : "";
  const [search, setSearch] = useState(qParam);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    if (qParam) {
      setSearch(qParam);
    }
  }, [qParam]);

  const allMainTools = [...tools, ...extraSpecialTools];

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "resize", label: "Image Resizer" },
    { id: "compress", label: "Compressor Tools" },
    { id: "signature", label: "Signature Tools" },
    { id: "convert", label: "Converters" },
    { id: "kb", label: "Exact KB Sizes" },
    { id: "dimension", label: "Dimension Presets" },
  ];

  const filteredTools = allMainTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredKBs = exactKBTools.filter((kb) =>
    kb.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDims = dimensionTools.filter((dim) =>
    dim.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools (e.g. 20KB, Passport)..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all shrink-0 ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tools Section */}
      {(activeCategory === "all" ||
        activeCategory === "resize" ||
        activeCategory === "compress" ||
        activeCategory === "signature" ||
        activeCategory === "convert") && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">General Tools</h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredTools.length} tools
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredTools.map((tool) => {
              const iconNode = (tool.icon && iconMap[tool.icon]) || (
                <HiOutlineWrenchScrewdriver className="w-5 h-5 text-indigo-600" />
              );

              return (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                    {iconNode}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {tool.description}
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Exact KB Compressors Section */}
      {(activeCategory === "all" || activeCategory === "kb") && (
        <section className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Exact File Size Compressors</h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredKBs.length} sizes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredKBs.map((kb) => (
              <Link
                key={kb.slug}
                href={`/resize-image-to-${kb.kb}kb`}
                className="group p-4 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100/50 text-center transition-all duration-300"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors mb-2">
                  <HiOutlineArrowDownRight className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {kb.kb} KB
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">Compressor</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Dimension Presets Section */}
      {(activeCategory === "all" || activeCategory === "dimension") && (
        <section className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Exact Dimension Tools</h2>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredDims.length} dimensions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredDims.map((dim) => {
              const href =
                dim.type === "signature"
                  ? `/signature-resizer-${dim.slug}`
                  : `/image-resizer-${dim.slug}`;

              return (
                <Link
                  key={dim.slug}
                  href={href}
                  className="group p-4 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100/50 text-center transition-all duration-300"
                >
                  <div className="w-9 h-9 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors mb-2">
                    {dim.type === "signature" ? (
                      <HiOutlinePencilSquare className="w-5 h-5" />
                    ) : (
                      <HiOutlinePhoto className="w-5 h-5" />
                    )}
                  </div>
                  <div className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {dim.width}×{dim.height}
                  </div>
                  <div className="text-[11px] text-gray-400 capitalize mt-0.5">{dim.type}</div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
