"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHANNEL_URL, trackWhatsAppClick } from "@/lib/whatsapp";

interface WhatsAppChannelCTAProps {
  toolName?: string;
  className?: string;
}

export default function WhatsAppChannelCTA({ toolName, className = "" }: WhatsAppChannelCTAProps) {
  const handleClick = () => {
    trackWhatsAppClick("tool_cta", {
      pageType: "tool_page",
      toolName: toolName || "image_tool",
    });
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white p-5 sm:p-6 border border-emerald-800/40 shadow-md ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-[#25D366]/15 border border-[#25D366]/30 rounded-xl text-[#25D366] shrink-0 mt-0.5">
            <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1.5 border border-emerald-500/30">
              WhatsApp Channel
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Get Job &amp; Exam Updates on WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">
              Get government job notifications, exam updates, admit cards, results, and useful application information.
            </p>
          </div>
        </div>

        <div className="shrink-0 pt-1 md:pt-0">
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-emerald-500/20 active:scale-[0.98] w-full md:w-auto"
            aria-label="Join WhatsApp Channel for Job & Exam Updates"
          >
            <WhatsAppIcon className="w-5 h-5 text-slate-950 shrink-0" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
}
