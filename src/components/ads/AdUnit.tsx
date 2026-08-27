"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdUnitProps {
  client?: string;
  slot?: string;
  format?: string;
  responsive?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

export default function AdUnit({
  client = "ca-pub-2237662953479277",
  slot,
  format = "auto",
  responsive = "true",
  className = "",
  style = { display: "block" },
  label = "Advertisement",
}: AdUnitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (initializedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initializedRef.current = true;
      }
    } catch (err) {
      // Catch duplicate push or script initialization errors gracefully
      console.warn("AdSense push notice:", err);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`my-8 flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {label && (
        <span className="text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium select-none">
          {label}
        </span>
      )}
      <div className="w-full min-h-[100px] md:min-h-[250px] flex items-center justify-center bg-gray-50/60 rounded-xl border border-gray-100 p-2">
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    </div>
  );
}
