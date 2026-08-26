import Link from "next/link";
import {
  HiOutlineBuildingLibrary,
  HiOutlineBuildingStorefront,
  HiOutlineTruck,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineScale,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const categories = [
  { name: "Central Exams", slug: "ssc", icon: <HiOutlineBuildingLibrary className="w-5 h-5 text-indigo-600" />, count: 10, desc: "SSC CGL, CHSL, GD, UPSC" },
  { name: "Banking Exams", slug: "banking", icon: <HiOutlineBuildingStorefront className="w-5 h-5 text-indigo-600" />, count: 12, desc: "IBPS PO, SBI PO, RBI" },
  { name: "Railway Exams", slug: "railway", icon: <HiOutlineTruck className="w-5 h-5 text-indigo-600" />, count: 3, desc: "RRB NTPC, Group D, ALP" },
  { name: "State PSCs", slug: "state-psc", icon: <HiOutlineMapPin className="w-5 h-5 text-indigo-600" />, count: 29, desc: "UPPSC, BPSC, MPPSC" },
  { name: "Police Recruitments", slug: "police", icon: <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600" />, count: 24, desc: "State police exams" },
  { name: "Defence Exams", slug: "defence", icon: <HiOutlineAcademicCap className="w-5 h-5 text-indigo-600" />, count: 3, desc: "Agniveer, Navy, CRPF" },
  { name: "Teaching Eligibility", slug: "teaching", icon: <HiOutlineBookOpen className="w-5 h-5 text-indigo-600" />, count: 5, desc: "CTET, B.Ed, D.El.Ed" },
  { name: "Judicial Services", slug: "judicial", icon: <HiOutlineScale className="w-5 h-5 text-indigo-600" />, count: 10, desc: "High Court & Judicial" },
  { name: "Admissions (NTA)", slug: "admissions", icon: <HiOutlineUserGroup className="w-5 h-5 text-indigo-600" />, count: 5, desc: "NEET UG, JEE Main" },
  { name: "Other Authorities", slug: "others", icon: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" />, count: 5, desc: "India Post, PCC, PAN" },
];

export default function BrowseCategories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Browse by Exam Category</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Select your target exam portal category to view official presets
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/exams/${cat.slug}`}
              className="group text-center p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors">
                {cat.icon}
              </div>
              <div className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </div>
              <div className="text-[10px] sm:text-xs text-indigo-600 font-semibold mt-1">
                {cat.count}+ presets
              </div>
              <div className="text-[11px] text-gray-400 mt-1 hidden sm:block truncate">{cat.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
