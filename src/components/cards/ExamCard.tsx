import Link from "next/link";

interface ExamCardProps {
  name: string;
  slug: string;
  category: string;
  photo: { width: number; height: number; minKB: number; maxKB: number; format: string };
  signature: { width: number; height: number; minKB: number; maxKB: number; format: string };
  verificationStatus: string;
}

export default function ExamCard({
  name,
  slug,
  category,
  photo,
  signature,
}: ExamCardProps) {
  const code = name.slice(0, 2).toUpperCase();

  return (
    <Link
      href={`/exams/${slug}`}
      className="related-tool-card group relative bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between gap-3 overflow-hidden h-full"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 140px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-[#1B2CC1]/0 group-hover:from-indigo-50/50 group-hover:to-[#1B2CC1]/10 transition-all duration-300 rounded-2xl pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs sm:text-sm group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors shrink-0">
            {code}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
              {name}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">
              Photo: {photo.width}x{photo.height}px
            </p>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-1">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-1.5 w-full mt-1">
        <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
          Photo: {photo.minKB}-{photo.maxKB}KB
        </span>
        <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
          Sig: {signature.minKB}-{signature.maxKB}KB
        </span>
        <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100 uppercase">
          {photo.format}
        </span>
      </div>
    </Link>
  );
}
