"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Logo from "@/components/layout/Logo";

const GlobalSearch = dynamic(() => import("@/components/search/GlobalSearch"), {
  ssr: false,
});
import {
  HiOutlineClipboardDocumentList,
  HiOutlineBuildingLibrary,
  HiOutlineBuildingStorefront,
  HiOutlineTruck,
  HiOutlineMapPin,
  HiOutlinePhoto,
  HiOutlineCamera,
  HiOutlineIdentification,
  HiOutlineArrowDownRight,
  HiOutlinePencilSquare,
  HiOutlineCreditCard,
  HiOutlineArchiveBox,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArrowPath,
} from "react-icons/hi2";

const navItems = [
  {
    label: "Exam Tools",
    href: "/exams",
    children: [
      { label: "All Exam Presets", href: "/exams", icon: <HiOutlineClipboardDocumentList className="w-5 h-5 text-indigo-600" /> },
      { label: "Central Exams (UPSC, SSC)", href: "/exams/ssc", icon: <HiOutlineBuildingLibrary className="w-5 h-5 text-indigo-600" /> },
      { label: "Banking Exams (IBPS, SBI)", href: "/exams/banking", icon: <HiOutlineBuildingStorefront className="w-5 h-5 text-indigo-600" /> },
      { label: "Railway Exams (RRB)", href: "/exams/railway", icon: <HiOutlineTruck className="w-5 h-5 text-indigo-600" /> },
      { label: "State PSCs & Police", href: "/exams/state-psc", icon: <HiOutlineMapPin className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Image Tools",
    href: "/tools/image-resizer",
    children: [
      { label: "Image Resizer", href: "/tools/image-resizer", icon: <HiOutlinePhoto className="w-5 h-5 text-indigo-600" /> },
      { label: "Photo Resizer", href: "/tools/photo-resizer", icon: <HiOutlineCamera className="w-5 h-5 text-indigo-600" /> },
      { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", icon: <HiOutlineIdentification className="w-5 h-5 text-indigo-600" /> },
      { label: "Resize Image to 20KB", href: "/resize-image-to-20kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Resize Image to 50KB", href: "/resize-image-to-50kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Add Name & Date", href: "/add-name-and-date-to-photo", icon: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" /> },
      { label: "PAN Card Photo", href: "/pan-card-photo-resizer", icon: <HiOutlineCreditCard className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Signature",
    href: "/tools/signature-resizer",
    children: [
      { label: "Signature Resizer", href: "/tools/signature-resizer", icon: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" /> },
      { label: "Signature Compressor", href: "/tools/signature-compressor", icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" /> },
      { label: "Signature 140×60", href: "/signature-resizer-140x60", icon: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" /> },
      { label: "Signature 200×80", href: "/signature-resizer-200x80", icon: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" /> },
      { label: "Signature to JPG", href: "/tools/signature-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Compress",
    href: "/tools/image-compressor",
    children: [
      { label: "Image Compressor", href: "/tools/image-compressor", icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 20KB", href: "/resize-image-to-20kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 30KB", href: "/resize-image-to-30kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 50KB", href: "/resize-image-to-50kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 100KB", href: "/resize-image-to-100kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Convert",
    href: "/tools/image-to-jpg",
    children: [
      { label: "Image to JPG", href: "/tools/image-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "PNG to JPG", href: "/tools/png-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "WebP to JPG", href: "/tools/webp-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "JPG to PNG", href: "/tools/jpg-to-png", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "JPG to WebP", href: "/tools/jpg-to-webp", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "PNG to WebP", href: "/tools/png-to-webp", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "Signature to JPG", href: "/tools/signature-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav
              ref={dropdownRef}
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1 ${
                      activeDropdown === item.label
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 animate-slide-down z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className="text-base flex-shrink-0">{child.icon}</span>
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
                aria-label="Open search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </button>

              <Link
                href="/tools/image-resizer"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-indigo-200"
              >
                Upload Photo
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto animate-slide-down z-40">
            <nav className="p-4 space-y-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex-shrink-0">{child.icon}</span>
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Search overlay */}
      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
