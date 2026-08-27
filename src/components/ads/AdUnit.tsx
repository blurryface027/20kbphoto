"use client";

import { useEffect, useRef, useState } from "react";

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
  const insRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

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

  useEffect(() => {
    const insEl = insRef.current;
    if (!insEl) return;

    const checkFilledStatus = () => {
      const status = insEl.getAttribute("data-ad-status");
      const hasIframe = insEl.querySelector("iframe") !== null;
      const computedStyle = window.getComputedStyle(insEl);
      const isHidden = insEl.style.display === "none" || computedStyle.display === "none";
      const height = insEl.getBoundingClientRect().height;

      if (status === "filled" || (hasIframe && !isHidden && height > 0)) {
        setIsFilled(true);
      } else if (status === "unfilled" || isHidden) {
        setIsFilled(false);
      }
    };

    checkFilledStatus();

    const observer = new MutationObserver(() => {
      checkFilledStatus();
    });

    observer.observe(insEl, {
      attributes: true,
      attributeFilter: ["data-ad-status", "style", "data-adsbygoogle-status"],
      childList: true,
      subtree: true,
    });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        checkFilledStatus();
      });
      resizeObserver.observe(insEl);
    }

    return () => {
      observer.disconnect();
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`transition-all duration-300 ${
        isFilled
          ? `my-6 sm:my-8 flex flex-col items-center justify-center w-full max-w-full overflow-hidden ${className}`
          : "h-0 min-h-0 overflow-hidden opacity-0 pointer-events-none"
      }`}
    >
      {isFilled && label && (
        <span className="text-[11px] uppercase tracking-wider text-gray-400 mb-1.5 font-medium select-none">
          {label}
        </span>
      )}
      <div className="w-full flex items-center justify-center">
        <ins
          ref={insRef}
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

