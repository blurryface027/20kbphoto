"use client";

import { useState } from "react";
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
  HiOutlineGlobeAsiaAustralia,
  HiOutlineChevronRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

interface StateGroup {
  name: string;
  code: string;
  slug: string;
  count: number;
  featuredExams: string[];
  region: "North" | "South" | "East" | "West" | "Central" | "North-East";
}

const indianStates: StateGroup[] = [
  { name: "Uttar Pradesh", code: "UP", slug: "uttar-pradesh", count: 19, featuredExams: ["UPPSC PCS", "UP Police", "UPSSSC PET", "UP TGT"], region: "North" },
  { name: "Rajasthan", code: "RJ", slug: "rajasthan", count: 17, featuredExams: ["RPSC RAS", "Raj Patwari", "Raj Police", "REET"], region: "North" },
  { name: "Bihar", code: "BR", slug: "bihar", count: 16, featuredExams: ["BPSC TRE", "BSSC Inter", "Bihar Police", "STET"], region: "East" },
  { name: "Madhya Pradesh", code: "MP", slug: "madhya-pradesh", count: 14, featuredExams: ["MPPSC", "MPESB Patwari", "MP Police", "MP TET"], region: "Central" },
  { name: "Odisha", code: "OR", slug: "odisha", count: 14, featuredExams: ["OPSC OCS", "OSSC CGL", "Odisha Police", "OTET"], region: "East" },
  { name: "Maharashtra", code: "MH", slug: "maharashtra", count: 13, featuredExams: ["MPSC", "Talathi", "Maha Police", "Maha TET"], region: "West" },
  { name: "Haryana", code: "HR", slug: "haryana", count: 13, featuredExams: ["HPSC HCS", "HSSC CET", "Haryana Police", "HTET"], region: "North" },
  { name: "Tamil Nadu", code: "TN", slug: "tamil-nadu", count: 13, featuredExams: ["TNPSC Group 4", "TNUSRB", "TRB", "TNTET"], region: "South" },
  { name: "West Bengal", code: "WB", slug: "west-bengal", count: 12, featuredExams: ["WBCS", "WBPSC Clerkship", "WB Police", "WBTET"], region: "East" },
  { name: "Uttarakhand", code: "UK", slug: "uttarakhand", count: 12, featuredExams: ["UKPSC PCS", "UKSSSC", "UK Police", "UTET"], region: "North" },
  { name: "Karnataka", code: "KA", slug: "karnataka", count: 12, featuredExams: ["KPSC KAS", "KEA FDA/SDA", "KSP Police", "KTET"], region: "South" },
  { name: "Punjab", code: "PB", slug: "punjab", count: 11, featuredExams: ["PPSC PCS", "PSSSB Patwari", "Punjab Police", "PSTET"], region: "North" },
  { name: "Jharkhand", code: "JH", slug: "jharkhand", count: 11, featuredExams: ["JPSC", "JSSC CGL", "Jharkhand Police", "JTET"], region: "East" },
  { name: "Kerala", code: "KL", slug: "kerala", count: 11, featuredExams: ["Kerala PSC Thulasi", "KAS", "Kerala Police", "KTET"], region: "South" },
  { name: "Andhra Pradesh", code: "AP", slug: "andhra-pradesh", count: 11, featuredExams: ["APPSC Group 1", "AP Police", "AP TET", "AP DSC"], region: "South" },
  { name: "Himachal Pradesh", code: "HP", slug: "himachal-pradesh", count: 10, featuredExams: ["HPAS", "HPPSC", "HP Police", "HP TET"], region: "North" },
  { name: "Chhattisgarh", code: "CG", slug: "chhattisgarh", count: 10, featuredExams: ["CGPSC", "CG Vyapam", "CG Police", "CG TET"], region: "Central" },
  { name: "Telangana", code: "TS", slug: "telangana", count: 10, featuredExams: ["TSPSC Group 1", "TS Police", "TS TET", "TS DSC"], region: "South" },
  { name: "Assam", code: "AS", slug: "assam", count: 6, featuredExams: ["APSC CCE", "ADRE", "Assam Police", "Assam TET"], region: "North-East" },
  { name: "Tripura", code: "TR", slug: "tripura", count: 3, featuredExams: ["TPSC", "Tripura Police", "Tripura TET"], region: "North-East" },
  { name: "Meghalaya", code: "ML", slug: "meghalaya", count: 2, featuredExams: ["Meghalaya PSC", "Meghalaya Police"], region: "North-East" },
  { name: "Nagaland", code: "NL", slug: "nagaland", count: 2, featuredExams: ["Nagaland PSC", "Nagaland Police"], region: "North-East" },
  { name: "Mizoram", code: "MZ", slug: "mizoram", count: 2, featuredExams: ["Mizoram PSC", "Mizoram TET"], region: "North-East" },
  { name: "Gujarat", code: "GJ", slug: "gujarat", count: 1, featuredExams: ["GPSC", "Gujarat Police"], region: "West" },
  { name: "Manipur", code: "MN", slug: "manipur", count: 1, featuredExams: ["Manipur PSC"], region: "North-East" },
  { name: "Arunachal Pradesh", code: "AR", slug: "arunachal-pradesh", count: 1, featuredExams: ["APPSC Arunachal"], region: "North-East" },
  { name: "Sikkim", code: "SK", slug: "sikkim", count: 1, featuredExams: ["Sikkim PSC"], region: "North-East" },
  { name: "Delhi", code: "DL", slug: "delhi", count: 6, featuredExams: ["DSSSB PRT/TGT/PGT", "Delhi Police"], region: "North" },
  { name: "Jammu & Kashmir", code: "JK", slug: "jammu-kashmir", count: 3, featuredExams: ["JKPSC", "JKSSB", "J&K Police"], region: "North" },
  { name: "Goa", code: "GA", slug: "goa", count: 2, featuredExams: ["Goa PSC", "Goa Police"], region: "West" },
];

const centralCategories = [
  { name: "Staff Selection Commission", code: "SSC", slug: "ssc", icon: <HiOutlineBuildingLibrary className="w-5 h-5 text-indigo-600" />, count: 32, desc: "CGL, CHSL, MTS, GD, CPO, JE, Stenographer, Selection Posts" },
  { name: "Union Public Service Commission", code: "UPSC", slug: "upsc", icon: <HiOutlineBuildingLibrary className="w-5 h-5 text-indigo-600" />, count: 25, desc: "CSE (IAS/IFS), NDA, CDS, CAPF, ESE, CMS, EPFO, Geo-Scientist" },
  { name: "Banking & Financial Services", code: "Bank", slug: "banking", icon: <HiOutlineBuildingStorefront className="w-5 h-5 text-indigo-600" />, count: 48, desc: "IBPS PO/Clerk/SO, SBI PO/Clerk/CBO, RBI Grade B, SEBI, LIC" },
  { name: "Railway Recruitment Board", code: "RRB", slug: "railway", icon: <HiOutlineTruck className="w-5 h-5 text-indigo-600" />, count: 25, desc: "RRB NTPC, Group D, ALP, Technician, JE, RPF Constable/SI" },
  { name: "Defence & Paramilitary Forces", code: "Defence", slug: "defence", icon: <HiOutlineAcademicCap className="w-5 h-5 text-indigo-600" />, count: 45, desc: "Agniveer Army/Navy/AirForce, BSF, CRPF, CISF, ITBP, SSB, ICG" },
  { name: "Teaching & Eligibility Tests", code: "TET", slug: "teaching", icon: <HiOutlineBookOpen className="w-5 h-5 text-indigo-600" />, count: 38, desc: "CTET, UGC NET, CSIR NET, KVS, NVS, DSSSB, EMRS, State TETs" },
  { name: "NTA & University Entrance", code: "NTA", slug: "admissions", icon: <HiOutlineUserGroup className="w-5 h-5 text-indigo-600" />, count: 30, desc: "NEET UG/PG, JEE Main/Adv, CUET UG/PG, GATE, CLAT, NIFT, NID" },
  { name: "Judicial & Legal Services", code: "Law", slug: "judicial", icon: <HiOutlineScale className="w-5 h-5 text-indigo-600" />, count: 22, desc: "State High Courts, Civil Judge, APP, Supreme Court Law Clerk" },
  { name: "Police & Security Exams", code: "Police", slug: "police", icon: <HiOutlineShieldCheck className="w-5 h-5 text-indigo-600" />, count: 35, desc: "State Police Constable, Sub-Inspector, Excise, Forest Guard" },
  { name: "Central Govt & Other PSUs", code: "Govt", slug: "others", icon: <HiOutlineDocumentText className="w-5 h-5 text-indigo-600" />, count: 50, desc: "India Post GDS, FCI, ESIC, ISRO, DRDO, BARC, Coal India" },
];

export default function StatewiseExamsSection() {
  const [activeTab, setActiveTab] = useState<"all-india" | "statewise">("statewise");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "North", "South", "East", "West", "Central", "North-East"];

  const filteredStates = selectedRegion === "All"
    ? indianStates
    : indianStates.filter(s => s.region === selectedRegion);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3">
            <HiOutlineSparkles className="w-4 h-4 text-indigo-600" />
            573+ Official Indian Exam Presets
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore <span className="text-indigo-600">All-India</span> & <span className="text-indigo-600">State-Wise</span> Exam Presets
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Instant photo and signature resizers pre-configured with official pixel dimensions, file size limits (KB), and background rules for central & state recruitment portals across India.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab("statewise")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                activeTab === "statewise"
                  ? "bg-white text-indigo-600 shadow-md shadow-indigo-100/50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <HiOutlineMapPin className="w-4 h-4 text-indigo-600" />
              State-Wise Exams ({indianStates.reduce((sum, s) => sum + s.count, 0)}+ Presets)
            </button>
            <button
              onClick={() => setActiveTab("all-india")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                activeTab === "all-india"
                  ? "bg-white text-indigo-600 shadow-md shadow-indigo-100/50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <HiOutlineGlobeAsiaAustralia className="w-4 h-4 text-indigo-600" />
              All-India Central Exams (SSC, UPSC, Bank, RRB)
            </button>
          </div>
        </div>

        {/* TAB 1: STATE-WISE EXAMS */}
        {activeTab === "statewise" && (
          <div className="space-y-6">
            {/* Region Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Filter Region:</span>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                    selectedRegion === region
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {region} {region !== "All" && `Region`}
                </button>
              ))}
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStates.map((state) => (
                <Link
                  key={state.slug}
                  href={`/exams/state/${state.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-xs sm:text-sm shrink-0 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors shadow-xs">
                          {state.code}
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {state.name}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                        {state.count} Presets
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {state.featuredExams.map((ex) => (
                        <span
                          key={ex}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200/60"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                    <span>View {state.name} Presets</span>
                    <HiOutlineChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ALL-INDIA CENTRAL EXAMS */}
        {activeTab === "all-india" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {centralCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/exams/${cat.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-mono uppercase">{cat.code}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                      {cat.count}+ Presets
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <span>Browse {cat.code} Presets</span>
                  <HiOutlineChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-200 text-sm"
          >
            Search All 573+ Exam Presets Index
            <HiOutlineChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
