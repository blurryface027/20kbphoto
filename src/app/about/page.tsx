import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Link from "next/link";
import {
  HiOutlineShieldCheck as ShieldIcon,
  HiOutlineBolt as BoltIcon,
  HiOutlineUserGroup as UsersIcon,
  HiOutlineAcademicCap as CapIcon,
  HiOutlineLockClosed,
  HiOutlineCpuChip,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

export const metadata: Metadata = {
  title: "About Us - 20KB Photo Platform & Privacy Architecture",
  description:
    "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform engineered for Indian government exam candidates and job applicants.",
  alternates: { canonical: "https://20kbphoto.in/about/" },
  openGraph: {
    title: "About Us - 20KB Photo Platform & Privacy Architecture",
    description:
      "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform engineered for Indian government exam candidates and job applicants.",
    url: "https://20kbphoto.in/about/",
    siteName: "20KB Photo",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - 20KB Photo Platform & Privacy Architecture",
    description:
      "Learn about 20KB Photo, the 100% private, browser-based image and photo preparation platform engineered for Indian government exam candidates and job applicants.",
  },
};

const aboutFaqs = [
  {
    question: "How does 20KB Photo guarantee 100% client-side privacy?",
    answer: "Every operation—including cropping, resampling, resolution scaling, and binary-search file compression—executes exclusively in your browser's local memory via the HTML5 Canvas API and JavaScript TypedArrays. At no point are your images or metadata transmitted over the network or saved to external servers."
  },
  {
    question: "Why was 20KB Photo created?",
    answer: "Millions of Indian students apply for government recruitments (SSC, UPSC, Banking, Railways, Defence, State PSCs) every year. A major cause of form rejection or delayed submission is failure to meet strict photo/signature dimensions and file size bounds (such as under 20KB or 50KB). 20KB Photo provides accurate, instant presets to eliminate submission errors safely."
  },
  {
    question: "Does 20KB Photo charge any fees or place watermarks on images?",
    answer: "No. 20KB Photo is completely free to use. All output downloads are pristine, high-resolution, unwatermarked image files that strictly comply with official examination guidelines."
  },
  {
    question: "Can 20KB Photo work on mobile phones and low-bandwidth connections?",
    answer: "Yes. Because image processing runs directly on your device rather than uploading and downloading large files from a cloud server, our tools work smoothly even on 2G, 3G, or spotty 4G connections. Once the web page loads, processing requires zero network data."
  },
  {
    question: "How does the binary-search compression algorithm maintain image clarity?",
    answer: "Traditional image compressors use coarse quality reduction that often blurs fine details or over-compresses files. Our engine runs an iterative binary-search pass on the JPEG quantization tables, testing quality intervals (e.g. 0.85, 0.78, 0.72) in milliseconds to discover the exact maximum quality level that keeps your image just under the target KB threshold."
  },
  {
    question: "What image formats are supported for input and output?",
    answer: "We support input uploads in JPG, JPEG, PNG, WEBP, and modern iPhone HEIC/HEIF formats. The output files can be exported as standard JPG (recommended for 99% of government forms), PNG (for transparent signatures or high contrast certificates), and WEBP."
  },
  {
    question: "How often are exam presets and specifications updated?",
    answer: "Our editorial team continuously tracks official recruitment advertisements published by SSC, UPSC, State PSCs, Railway Recruitment Boards, and the National Testing Agency. Presets are updated within hours of any official notification release that modifies photo or signature specifications."
  },
  {
    question: "Can I use 20KB Photo offline once the web page has loaded?",
    answer: "Yes. Because our application leverages client-side JavaScript and browser Web APIs without any backend dependencies for image processing, you can disconnect your internet connection after opening the tool and continue resizing, cropping, and compressing photos completely offline."
  }
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About 20KB Photo",
    description: "100% private, browser-based image preparation platform for Indian government exam applicants.",
    publisher: {
      "@type": "Organization",
      name: "20KB Photo",
      url: "https://20kbphoto.in/"
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <ShieldIcon className="w-4 h-4" /> 100% Local Browser Processing
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Empowering Indian Applicants with Safe, Fast Photo Tools
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          20KB Photo was created with a clear mission: eliminate application form rejection caused by incorrect photo dimensions or file sizes, while guaranteeing 100% candidate privacy.
        </p>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Zero Server Uploads</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            All resizing and compression happens right on your device using client-side HTML5 Canvas technology.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <BoltIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Instant Speed</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Process photos and signatures in under 100ms without waiting for slow cloud servers or queues.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <CapIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">570+ Exam Presets</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Pre-configured specs for SSC, UPSC, IBPS, SBI, RRB NTPC, NEET, JEE, and State PSCs across 30 states.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <UsersIcon className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Always Free</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            No watermarks, no registrations, no hidden fees. Designed for everyday student convenience.
          </p>
        </div>
      </div>

      {/* Story section */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Why We Built 20KB Photo</h2>
        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
          <p>
            Every year, tens of millions of students and job aspirants across India fill out online application forms for central examinations (UPSC, SSC, Banking, Railways), state recruitment boards, admission tests (NEET, JEE), and police recruitments.
          </p>
          <p>
            One of the most frustrating obstacles applicants face is strict photo and signature submission requirements — such as requiring photos to be exactly <strong className="text-gray-900">200×230 px</strong> or <strong className="text-gray-900">275×354 px</strong> and between <strong className="text-gray-900">20 KB and 50 KB</strong>, or signatures to be <strong className="text-gray-900">140×60 px</strong> under <strong className="text-gray-900">20 KB</strong>.
          </p>
          <p>
            Existing online resizer tools often require uploading sensitive passport photographs and signatures to third-party web servers, creating severe privacy risks. 20KB Photo solves this by conducting 100% of image rendering, cropping, resizing, text overlaying, and binary search compression directly inside your device&apos;s browser memory.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href="/tools/"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
          >
            Explore All Tools
          </Link>
          <Link
            href="/exams/"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-all"
          >
            Browse Exam Presets
          </Link>
        </div>
      </div>

      {/* Technology & Privacy Architecture */}
      <section className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Client-Side Privacy Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <HiOutlineCpuChip className="w-5 h-5 text-indigo-600" />
              HTML5 Canvas Processing
            </h3>
            <p className="text-xs sm:text-sm">
              Image pixels are rendered onto an off-screen HTML5 Canvas directly in your computer or mobile RAM. The browser hardware accelerates the transformation without external dependencies.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <HiOutlineLockClosed className="w-5 h-5 text-indigo-600" />
              Zero-Log Data Isolation
            </h3>
            <p className="text-xs sm:text-sm">
              Because our web servers never receive the image payloads, there is zero data storage, no database records of your photo, and no possibility of data leaks or image misuse.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <HiOutlineCheckBadge className="w-5 h-5 text-indigo-600" />
              Binary-Search Compression
            </h3>
            <p className="text-xs sm:text-sm">
              Our algorithms run a fast binary search on JPEG/WebP quantization tables to find the exact highest image quality that stays strictly beneath your target KB ceiling (e.g. ≤20KB, ≤50KB).
            </p>
          </div>
        </div>
      </section>

      {/* Coverage & Exam Boards Section */}
      <section className="bg-gradient-to-br from-indigo-50/60 via-white to-gray-50 p-8 sm:p-10 rounded-3xl border border-indigo-100 shadow-xs space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
            All-India Examination Coverage
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Comprehensive Presets for Central & State Recruitment Portals
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our platform maintains verified, regularly audited dimension and file-size presets for every major recruitment and admission portal across the country:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Central Recruitment Boards</h3>
            <p className="text-gray-600 leading-relaxed">
              Staff Selection Commission (CGL, CHSL, MTS, GD, CPO), Union Public Service Commission (CSE, NDA, CDS, CAPF), and Railway Recruitment Boards (RRB NTPC, Group D, ALP).
            </p>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Banking & Financial Services</h3>
            <p className="text-gray-600 leading-relaxed">
              Institute of Banking Personnel Selection (IBPS PO, Clerk, SO, RRB), State Bank of India (SBI PO, Clerk), Reserve Bank of India (RBI Grade B, Assistant), and LIC.
            </p>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">State PSCs & Recruitment</h3>
            <p className="text-gray-600 leading-relaxed">
              UPPSC, BPSC, MPPSC, MPSC, RPSC, TNPSC, WBPSC, KPSC, OPSC, APPSC, TSPSC, and HPSC covering civil services, revenue, police, and clerical cadres across 30+ states.
            </p>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Entrance & Eligibility Tests</h3>
            <p className="text-gray-600 leading-relaxed">
              National Testing Agency (NEET UG, JEE Main, CUET, UGC NET, CSIR NET), CTET, State Teacher Eligibility Tests (TET), and university admissions.
            </p>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Defence & Paramilitary</h3>
            <p className="text-gray-600 leading-relaxed">
              Agniveer Army, Navy, Air Force recruitments, Central Armed Police Forces (BSF, CISF, CRPF, ITBP, SSB), and Indian Coast Guard (ICG).
            </p>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-gray-200/80 space-y-1.5 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm">Government Identity & Document Utilities</h3>
            <p className="text-gray-600 leading-relaxed">
              PAN Card photo & signature resizers, Passport size 4×6 print sheet generator, Name and Date photo stamping, and PDF document converters.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Assurance & Technical Integrity */}
      <section className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xs space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Our Quality Assurance & Notification Verification Standards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base">Direct Notification Verification</h3>
            <p>
              Every exam preset listed on 20KB Photo is manually extracted and verified directly from the official employment notifications published on recruitment authority portals (such as ssc.gov.in, upsc.gov.in, and ibps.in). We never rely on secondary blog aggregators or third-party estimates.
            </p>
            <p>
              When examination authorities release amendments or corrigenda—such as updates to accepted file formats, background color rules, or dimension tolerances—our research team audits and updates the corresponding presets to protect candidates from form rejection.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base">Client-Side Precision & Canvas Rendering</h3>
            <p>
              Unlike server-based image compressors that re-encode files using arbitrary lossy compression filters, our HTML5 Canvas rendering engine respects pixel aspect ratios, prevents image skewing, and applies multi-pass binary search quantization.
            </p>
            <p>
              This ensures that when an applicant selects a 20KB to 50KB range, the resulting file is guaranteed to stay within the exact byte boundary required by government upload validators while preserving maximum facial sharpness and signature stroke legibility.
            </p>
          </div>
        </div>
      </section>

      {/* About FAQs */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions About 20KB Photo
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Learn more about our mission, privacy safeguards, and technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutFaqs.map((faq, index) => (
            <details
              key={index}
              open={index === 0}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 p-5 transition-all [&[open]]:shadow-xs"
            >
              <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-indigo-600 transition-colors">
                <span>{faq.question}</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
