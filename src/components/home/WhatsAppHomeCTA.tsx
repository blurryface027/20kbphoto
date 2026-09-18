"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHANNEL_URL, trackWhatsAppClick } from "@/lib/whatsapp";
import { HiOutlineBellAlert, HiOutlineCheckCircle } from "react-icons/hi2";

export default function WhatsAppHomeCTA() {
  const handleClick = () => {
    trackWhatsAppClick("homepage_cta", { pageType: "homepage" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 lg:p-10 border border-emerald-800/40 shadow-xl">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
          {/* Left copy section */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3.5">
              <HiOutlineBellAlert className="w-4 h-4 text-[#25D366]" />
              <span>Official 20KB Photo Channel</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
              Get Job &amp; Exam Updates on WhatsApp
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              Stay updated with the latest government jobs, exam notifications, admit cards, results, and useful application tips.
            </p>

            <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="w-4 h-4 text-[#25D366]" />
                Daily Job Alerts
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="w-4 h-4 text-[#25D366]" />
                Exam Date Updates
              </span>
              <span className="flex items-center gap-1.5">
                <HiOutlineCheckCircle className="w-4 h-4 text-[#25D366]" />
                100% Free &amp; Spam Free
              </span>
            </div>
          </div>

          {/* Right CTA button section */}
          <div className="flex-shrink-0">
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold sm:font-extrabold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:shadow-emerald-500/20 active:scale-[0.98] w-full sm:w-auto"
              aria-label="Get Job & Exam Updates on WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6 text-slate-950 flex-shrink-0" />
              <span>Get Job &amp; Exam Updates on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
