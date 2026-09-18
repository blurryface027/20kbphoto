"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_CHANNEL_URL, trackWhatsAppClick } from "@/lib/whatsapp";
import { HiXMark, HiOutlineBell } from "react-icons/hi2";

const DISMISSAL_KEY = "wa_channel_popup_dismissed_at";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function WhatsAppFloatingPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    try {
      // 1. Check localStorage for 7-day dismissal window
      const dismissedAt = localStorage.getItem(DISMISSAL_KEY);
      if (dismissedAt) {
        const timePassed = Date.now() - parseInt(dismissedAt, 10);
        if (timePassed < SEVEN_DAYS_MS) {
          return;
        }
      }

      // 2. Check sessionStorage for session dismissal fallback
      const sessionDismissed = sessionStorage.getItem("wa_popup_dismissed");
      if (sessionDismissed === "true") {
        return;
      }
    } catch {
      // Ignore storage error in private mode / restricted environments
    }

    // Generous 6-second delay so visitors can focus on their photo-resizing task uninterrupted
    const timer = setTimeout(() => {
      setVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSAL_KEY, Date.now().toString());
      sessionStorage.setItem("wa_popup_dismissed", "true");
    } catch {
      // Ignore storage error
    }
  };

  const handleJoin = () => {
    trackWhatsAppClick("popup", { pageType: pathname || "global" });
    handleDismiss();
  };

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] max-w-[340px] sm:max-w-[360px] animate-slide-up"
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
      role="dialog"
      aria-label="WhatsApp Channel Notification"
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white border border-emerald-500/30 shadow-2xl p-4 sm:p-5 glass-dark">
        {/* Subtle accent glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#25D366]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close WhatsApp notification"
        >
          <HiXMark className="w-5 h-5" />
        </button>

        {/* Card Header & Content */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-[#25D366] text-slate-950 rounded-xl shrink-0 shadow-md">
            <WhatsAppIcon className="w-6 h-6 text-slate-950" />
          </div>

          <div className="pr-6">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mb-0.5">
              <HiOutlineBell className="w-3.5 h-3.5" />
              <span>Job &amp; Exam Alerts</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              Get Job &amp; Exam Updates on WhatsApp
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Stay updated with government jobs, exam notifications, and application updates.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <button
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 transition-colors font-medium"
          >
            Not now
          </button>
          
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleJoin}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95"
            aria-label="Join WhatsApp Channel"
          >
            <WhatsAppIcon className="w-4 h-4 text-slate-950" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
}
