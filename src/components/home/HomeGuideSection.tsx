import React from "react";
import Link from "next/link";

const topExamSpecs = [
  { authority: "Staff Selection Commission (SSC)", photoSpec: "200×230 px (20–50 KB)", sigSpec: "140×60 px (10–20 KB)", format: "JPG/JPEG", link: "/exams/ssc/" },
  { authority: "Union Public Service Commission (UPSC)", photoSpec: "350×350 to 1000×1000 px (20–300 KB)", sigSpec: "350×350 to 1000×1000 px (20–300 KB)", format: "JPG", link: "/exams/upsc/" },
  { authority: "Institute of Banking Personnel (IBPS)", photoSpec: "200×230 px (20–50 KB)", sigSpec: "140×60 px (10–20 KB)", format: "JPG/JPEG", link: "/exams/banking/" },
  { authority: "State Bank of India (SBI)", photoSpec: "200×230 px (20–50 KB)", sigSpec: "140×60 px (10–20 KB)", format: "JPG/JPEG", link: "/exams/sbi-po/" },
  { authority: "Railway Recruitment Board (RRB)", photoSpec: "320×240 px (30–70 KB)", sigSpec: "160×80 px (15–40 KB)", format: "JPG", link: "/exams/railway/" },
  { authority: "National Testing Agency (NEET / JEE)", photoSpec: "100×100 to 400×400 px (10–200 KB)", sigSpec: "100×100 to 200×200 px (4–30 KB)", format: "JPG", link: "/exams/admissions/" },
];

export default function HomeGuideSection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
            Official Application Standards Guide
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Complete Photo & Signature Guidelines for Indian Competitive Exams
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Every year, thousands of online application forms for central and state government recruitments are rejected due to improperly formatted photos and signatures. Here is everything you need to know to ensure 100% portal acceptance.
          </p>
        </div>

        {/* Specifications Matrix Table */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base">
              Key Examination Board Document Specifications at a Glance
            </h3>
            <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-full text-indigo-200">
              Verified Notification Rules
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-bold">
                  <th className="py-3 px-4">Examination Authority</th>
                  <th className="py-3 px-4">Official Photo Specifications</th>
                  <th className="py-3 px-4">Official Signature Specifications</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Tool Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                {topExamSpecs.map((spec) => (
                  <tr key={spec.authority} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{spec.authority}</td>
                    <td className="py-3 px-4 text-indigo-600 font-semibold">{spec.photoSpec}</td>
                    <td className="py-3 px-4 text-slate-700">{spec.sigSpec}</td>
                    <td className="py-3 px-4 font-mono">{spec.format}</td>
                    <td className="py-3 px-4">
                      <Link href={spec.link} className="text-indigo-600 hover:text-indigo-800 font-bold text-xs underline">
                        View Preset &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Pillars of Portal Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-3">
            <h3 className="font-extrabold text-base text-gray-900">
              1. Pixel Dimensions & Aspect Ratios
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm">
              Government portals validate uploaded image dimensions programmatically during form submission. Standard passport photos measure 3.5 cm × 4.5 cm (equivalent to roughly 200×230 px to 275×354 px). Signatures require a wider aspect ratio (3.5 cm × 1.5 cm or 140×60 px). Uploading an uncropped square photo when a rectangular ratio is expected causes image stretching and rejection.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-3">
            <h3 className="font-extrabold text-base text-gray-900">
              2. Strict Kilobyte (KB) Limits
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm">
              Server upload gateways enforce hard file-size boundaries—typically between 20 KB and 50 KB for photos and 10 KB to 20 KB for signatures. Files even 1 KB above the maximum or below the minimum trigger instant upload errors. Our binary-search compression engine calculates optimal quantization to hit your target KB precisely.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 space-y-3">
            <h3 className="font-extrabold text-base text-gray-900">
              3. Background, Lighting & Handwriting
            </h3>
            <p className="leading-relaxed text-xs sm:text-sm">
              Photos must feature a clean, plain white or light background with 70% to 80% facial coverage. Caps, dark glasses, heavy shadows, and tilted angles are prohibited. Signatures must be written in running cursive handwriting using a black or blue ballpoint pen. Signatures in capital letters are disqualified across all government bodies.
            </p>
          </div>
        </div>

        {/* Rejection Checklist & Best Practices */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">
              Candidate Pre-Submission Checklist: Avoid Form Rejection
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Verify these critical items before submitting your documents on official candidate registration portals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
              <strong className="block text-indigo-300 font-bold text-sm">Recent Photo</strong>
              <p className="text-slate-200">Taken within the last 3 months to match current biometric identity.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
              <strong className="block text-indigo-300 font-bold text-sm">Cursive Signature</strong>
              <p className="text-slate-200">Never sign in CAPITAL or BLOCK letters. Always sign in natural flowing handwriting.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
              <strong className="block text-indigo-300 font-bold text-sm">Correct Extension</strong>
              <p className="text-slate-200">Ensure the file ends with .jpg or .jpeg. Portals will not accept .webp, .png, or .heic directly.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
              <strong className="block text-indigo-300 font-bold text-sm">High Contrast</strong>
              <p className="text-slate-200">Sign on unruled plain white sheet without notebook lines or paper creases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
