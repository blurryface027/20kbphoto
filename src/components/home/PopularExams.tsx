import Link from "next/link";

const exams = [
  { name: "SSC CGL", slug: "ssc-cgl", code: "SS", photo: "275x354px", size: "20-50KB", format: "jpg" },
  { name: "SSC CHSL", slug: "ssc-chsl", code: "SS", photo: "200x240px", size: "20-50KB", format: "jpg" },
  { name: "SSC GD", slug: "ssc-gd", code: "SS", photo: "200x240px", size: "20-50KB", format: "jpg" },
  { name: "UPSC CSE", slug: "upsc-cse", code: "UP", photo: "400x400px", size: "20-300KB", format: "jpg" },
  { name: "NEET UG", slug: "neet-ug", code: "NE", photo: "275x354px", size: "10-200KB", format: "jpg" },
  { name: "JEE Main", slug: "jee-main", code: "JE", photo: "275x354px", size: "10-200KB", format: "jpg" },
  { name: "IBPS PO", slug: "ibps-po", code: "IB", photo: "200x230px", size: "20-50KB", format: "jpg" },
  { name: "SBI PO", slug: "sbi-po", code: "SB", photo: "200x230px", size: "20-50KB", format: "jpg" },
  { name: "SBI Clerk", slug: "sbi-clerk", code: "SB", photo: "200x230px", size: "20-50KB", format: "jpg" },
  { name: "RBI Grade B", slug: "rbi-grade-b", code: "RB", photo: "200x230px", size: "20-50KB", format: "jpg" },
  { name: "RRB NTPC", slug: "rrb-ntpc", code: "RR", photo: "320x240px", size: "30-70KB", format: "jpg" },
  { name: "India Post GDS", slug: "india-post-gds", code: "PO", photo: "320x400px", size: "30-100KB", format: "jpg" },
];

export default function PopularExams() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Popular Exam Resizers</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Auto-configured photo & signature presets for India&apos;s top government exams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {exams.map((exam) => (
            <Link
              key={exam.slug}
              href={`/exams/${exam.slug}`}
              className="related-tool-card group relative bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-[#1B2CC1]/0 group-hover:from-indigo-50/50 group-hover:to-[#1B2CC1]/10 transition-all duration-300 rounded-2xl pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs sm:text-sm group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors shrink-0">
                    {exam.code}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                      {exam.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">
                      {exam.photo}
                    </p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-1">
                  <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              <div className="relative z-10 flex flex-wrap gap-1.5 w-full">
                <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                  {exam.size}
                </span>
                <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-100 uppercase">
                  {exam.format}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-200 text-sm"
          >
            Explore All 100+ Exam Presets
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
