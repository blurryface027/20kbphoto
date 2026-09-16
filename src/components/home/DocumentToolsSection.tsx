import Link from "next/link";
import {
  HiOutlineDocumentText,
  HiOutlineDocumentCheck,
  HiOutlineSparkles,
  HiOutlineEyeSlash,
  HiOutlineArchiveBox,
  HiOutlineSquare2Stack,
  HiOutlineUser,
  HiOutlineArrowUpRight,
  HiOutlineInformationCircle,
  HiOutlineArrowPath,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";

const documentAndUniqueTools = [
  {
    name: "JPG to PDF Converter",
    href: "/tools/jpg-to-pdf",
    icon: <HiOutlineDocumentText className="w-6 h-6 text-indigo-600" />,
    desc: "Convert one or multiple JPG images into a formatted PDF document.",
    badge: "Popular PDF",
  },
  {
    name: "Background Remover",
    href: "/tools/background-remover",
    icon: <HiOutlineSparkles className="w-6 h-6 text-indigo-600" />,
    desc: "Remove image background instantly with transparent PNG export.",
    badge: "Instant PNG",
  },
  {
    name: "PDF to JPG / Image",
    href: "/tools/pdf-to-jpg",
    icon: <HiOutlineDocumentCheck className="w-6 h-6 text-indigo-600" />,
    desc: "Convert PDF pages into high quality JPG or PNG images with ZIP download.",
    badge: "PDF Converter",
  },
  {
    name: "Online Document Scanner",
    href: "/tools/document-scanner",
    icon: <HiOutlineDocumentCheck className="w-6 h-6 text-indigo-600" />,
    desc: "Scan document photos with B&W & grayscale filters & export to PDF.",
    badge: "Scan & Enhance",
  },
  {
    name: "Blur Image / Face Blur",
    href: "/tools/blur-image",
    icon: <HiOutlineEyeSlash className="w-6 h-6 text-indigo-600" />,
    desc: "Blur sensitive details, text, roll numbers, or faces in your photos.",
    badge: "Privacy Tool",
  },
  {
    name: "Bulk Image Compressor",
    href: "/tools/bulk-image-compressor",
    icon: <HiOutlineArchiveBox className="w-6 h-6 text-indigo-600" />,
    desc: "Compress multiple images to exact KB size (20KB, 50KB) in batch.",
    badge: "Batch ZIP",
  },
  {
    name: "Passport Photo Maker",
    href: "/tools/passport-photo-maker",
    icon: <HiOutlineUser className="w-6 h-6 text-indigo-600" />,
    desc: "Create passport size photos & 4x6 inch 6-photo printable sheets.",
    badge: "Print Sheet",
  },
  {
    name: "Image Format Converter",
    href: "/tools/image-format-converter",
    icon: <HiOutlineArrowPath className="w-6 h-6 text-indigo-600" />,
    desc: "Convert JPG to PNG, PNG to JPG, WebP to JPG seamlessly.",
    badge: "Format Convert",
  },
  {
    name: "Image Upscaler",
    href: "/tools/image-upscaler",
    icon: <HiOutlineArrowUpRight className="w-6 h-6 text-indigo-600" />,
    desc: "Upscale photo resolution by 2x or 4x with clarity & edge sharpening.",
    badge: "High Res",
  },
  {
    name: "EXIF / Metadata Viewer",
    href: "/tools/image-metadata",
    icon: <HiOutlineInformationCircle className="w-6 h-6 text-indigo-600" />,
    desc: "Inspect file specs, camera info, GPS location, and strip metadata.",
    badge: "Clean EXIF",
  },
  {
    name: "Image Stitcher",
    href: "/tools/image-stitcher",
    icon: <HiOutlineSquare2Stack className="w-6 h-6 text-indigo-600" />,
    desc: "Combine multiple photos vertically or horizontally into one image.",
    badge: "Combine Photos",
  },
  {
    name: "Bulk Image Resizer",
    href: "/tools/bulk-image-resizer",
    icon: <HiOutlineAdjustmentsHorizontal className="w-6 h-6 text-indigo-600" />,
    desc: "Batch resize multiple images simultaneously with ZIP export.",
    badge: "Batch Resize",
  },
];

export default function DocumentToolsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full mb-3">
            ✨ Complete Document & Image Suite
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Free Online Image & Document Tools
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Professional browser tools for PDF conversion, background removal, document scanning, batch compression, and photo privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {documentAndUniqueTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col justify-between p-5 bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-100/60 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors duration-300">
                  {tool.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 px-2.5 py-1 rounded-full border border-slate-200/60 transition-colors">
                  {tool.badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                <span>Use Tool Now</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all"
          >
            Explore All Tools Directory →
          </Link>
        </div>
      </div>
    </section>
  );
}
