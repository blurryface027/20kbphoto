import {
  HiOutlineBanknotes,
  HiOutlineShieldCheck,
  HiOutlineBolt,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineArchiveBox,
  HiOutlineDevicePhoneMobile,
  HiOutlineUser,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineBanknotes className="w-5 h-5 text-indigo-600" />,
    title: "100% Free",
    desc: "No hidden charges, no watermarks, no signups. Every tool is completely free.",
  },
  {
    icon: <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600" />,
    title: "100% Private & Browser-Based",
    desc: "Your photos and signatures are processed locally inside your browser. Nothing is uploaded.",
  },
  {
    icon: <HiOutlineBolt className="w-5 h-5 text-indigo-600" />,
    title: "Instant Processing",
    desc: "Get results in milliseconds with browser HTMLCanvas API. No server processing delays.",
  },
  {
    icon: <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-indigo-600" />,
    title: "Exact Pixel Dimensions",
    desc: "Resize to exact dimensions like 275×354 px, 140×60 px, 200×230 px, or custom size.",
  },
  {
    icon: <HiOutlineArchiveBox className="w-5 h-5 text-indigo-600" />,
    title: "Exact KB Target Compression",
    desc: "Compress to exact file size limits like 20-50 KB, 10-20 KB, or custom target size.",
  },
  {
    icon: <HiOutlineDevicePhoneMobile className="w-5 h-5 text-indigo-600" />,
    title: "Mobile Friendly",
    desc: "Works perfectly on mobile devices. Snap a photo and resize it on your phone instantly.",
  },
  {
    icon: <HiOutlineUser className="w-5 h-5 text-indigo-600" />,
    title: "No Account Needed",
    desc: "No signup forms. Just upload your image, adjust specs, and download.",
  },
  {
    icon: <HiOutlineCheckBadge className="w-5 h-5 text-indigo-600" />,
    title: "100+ Exam Presets",
    desc: "UPSC, SSC, IBPS, RRB, NEET, JEE — pre-configured with exact official specifications.",
  },
];

export default function WhyUseSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Why Use 20KB Photo?
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Built specifically for Indian government exam applicants & form submissions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1">{f.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Privacy Trust Bar */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-xs">
            <HiOutlineShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-900">
              Privacy First: Your photos are processed locally in your browser and never uploaded to any server.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
