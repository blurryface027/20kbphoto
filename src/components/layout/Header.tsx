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
  HiOutlineDocumentText,
  HiOutlineDocumentCheck,
  HiOutlineSparkles,
  HiOutlineScissors,
  HiOutlineEyeSlash,
  HiOutlineSquare2Stack,
  HiOutlineBookOpen,
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
    label: "Document & PDF",
    href: "/tools/jpg-to-pdf",
    children: [
      { label: "JPG to PDF", href: "/tools/jpg-to-pdf", icon: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" /> },
      { label: "PDF to JPG", href: "/tools/pdf-to-jpg", icon: <HiOutlineDocumentCheck className="w-5 h-5 text-indigo-600" /> },
      { label: "Image to PDF", href: "/tools/image-to-pdf", icon: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" /> },
      { label: "PDF to Image", href: "/tools/pdf-to-image", icon: <HiOutlineDocumentCheck className="w-5 h-5 text-indigo-600" /> },
      { label: "Document Scanner", href: "/tools/document-scanner", icon: <HiOutlineDocumentCheck className="w-5 h-5 text-indigo-600" /> },
      { label: "Photos to PDF", href: "/tools/photos-to-pdf", icon: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Image Tools",
    href: "/tools/image-resizer",
    children: [
      { label: "Image Resizer", href: "/tools/image-resizer", icon: <HiOutlinePhoto className="w-5 h-5 text-indigo-600" /> },
      { label: "Background Remover", href: "/tools/background-remover", icon: <HiOutlineSparkles className="w-5 h-5 text-indigo-600" /> },
      { label: "Image Cropper", href: "/tools/image-cropper", icon: <HiOutlineScissors className="w-5 h-5 text-indigo-600" /> },
      { label: "Blur Image / Face Blur", href: "/tools/blur-image", icon: <HiOutlineEyeSlash className="w-5 h-5 text-indigo-600" /> },
      { label: "Image Stitcher", href: "/tools/image-stitcher", icon: <HiOutlineSquare2Stack className="w-5 h-5 text-indigo-600" /> },
      { label: "Passport Photo Maker", href: "/tools/passport-photo-maker", icon: <HiOutlineIdentification className="w-5 h-5 text-indigo-600" /> },
      { label: "EXIF / Metadata Viewer", href: "/tools/image-metadata", icon: <HiOutlinePhoto className="w-5 h-5 text-indigo-600" /> },
      { label: "Image Format Converter", href: "/tools/image-format-converter", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
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
    label: "Compress & Bulk",
    href: "/tools/image-compressor",
    children: [
      { label: "Image Compressor", href: "/tools/image-compressor", icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" /> },
      { label: "Bulk Image Compressor", href: "/tools/bulk-image-compressor", icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" /> },
      { label: "Bulk Image Resizer", href: "/tools/bulk-image-resizer", icon: <HiOutlineSquare2Stack className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 20KB", href: "/resize-image-to-20kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 50KB", href: "/resize-image-to-50kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
      { label: "Compress to 100KB", href: "/resize-image-to-100kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" /> },
    ],
  },
  {
    label: "Convert",
    href: "/tools/image-to-jpg",
    children: [
      { label: "Image Format Converter", href: "/tools/image-format-converter", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "Image to JPG", href: "/tools/image-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "PNG to JPG", href: "/tools/png-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "WebP to JPG", href: "/tools/webp-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "JPG to PNG", href: "/tools/jpg-to-png", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "JPG to WebP", href: "/tools/jpg-to-webp", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
      { label: "PNG to WebP", href: "/tools/png-to-webp", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" /> },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="nav-dropdown-group relative"
                >
                  <button
                    type="button"
                    className="nav-dropdown-btn px-2.5 py-2 xl:px-3 xl:py-2 text-[13px] xl:text-sm font-semibold rounded-xl transition-all duration-150 flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <svg
                      className="nav-dropdown-arrow w-3.5 h-3.5 shrink-0 text-gray-400 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu - pure CSS hover with zero delay, zero JS race conditions */}
                  <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-64 z-50 invisible opacity-0 translate-y-1 pointer-events-none transition-all duration-150 ease-out">
                    {/* Invisible bridge to catch the cursor across any gap */}
                    <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" />
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-colors"
                        >
                          <span className="text-base flex-shrink-0">{child.icon}</span>
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Link
                href="/blog"
                className="px-2.5 py-2 xl:px-3 xl:py-2 text-[13px] xl:text-sm font-semibold text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Blog
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 xl:px-2.5 xl:py-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-1.5 text-xs xl:text-sm font-semibold shrink-0 cursor-pointer"
                aria-label="Open search"
              >
                <svg className="w-4 h-4 xl:w-5 xl:h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden xl:inline">Search</span>
              </button>

              <Link
                href="/tools/image-resizer"
                className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 xl:px-4 xl:py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs xl:text-sm transition-all shadow-md shadow-indigo-200 whitespace-nowrap shrink-0"
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
              <div>
                <div className="px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Blog & Guides
                </div>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <HiOutlineBookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <span>Blog & Articles</span>
                </Link>
              </div>
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
