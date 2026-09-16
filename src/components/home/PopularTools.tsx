import Link from "next/link";
import {
  HiOutlineArrowDownRight,
  HiOutlineArchiveBox,
  HiOutlinePencilSquare,
  HiOutlineArrowPath,
  HiOutlineUser,
  HiOutlineAdjustmentsHorizontal,
} from "react-icons/hi2";

const tools = [
  { name: "Resize Image to 20KB", href: "/resize-image-to-20kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" />, desc: "Compress any image to exactly 20KB" },
  { name: "Resize Image to 50KB", href: "/resize-image-to-50kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" />, desc: "Compress any image to exactly 50KB" },
  { name: "Resize Image to 100KB", href: "/resize-image-to-100kb", icon: <HiOutlineArrowDownRight className="w-5 h-5 text-indigo-600" />, desc: "Compress any image to exactly 100KB" },
  { name: "Image Compressor", href: "/tools/image-compressor", icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" />, desc: "Reduce file size to any target KB" },
  { name: "Signature Resizer", href: "/tools/signature-resizer", icon: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" />, desc: "Resize signatures to exact dimensions" },
  { name: "Image to JPG", href: "/tools/image-to-jpg", icon: <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" />, desc: "Convert PNG, WebP to JPG format" },
  { name: "Passport Photo Maker", href: "/tools/passport-photo-maker", icon: <HiOutlineUser className="w-5 h-5 text-indigo-600" />, desc: "Create perfect passport photos" },
  { name: "Add Name & Date", href: "/add-name-and-date-to-photo", icon: <HiOutlinePencilSquare className="w-5 h-5 text-indigo-600" />, desc: "Add name and date to your photo" },
  { name: "Signature 140×60", href: "/signature-resizer-140x60", icon: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" />, desc: "Resize signature to 140x60 pixels" },
];

export default function PopularTools() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Popular Image & Signature Tools</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Quick-access browser tools for photo, signature & document processing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors">
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.desc}</div>
              </div>
              <svg className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all tools
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
