import React from "react";

interface WeforAdsInContentProps {
  className?: string;
}

export default function WeforAdsInContent({ className = "" }: WeforAdsInContentProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-8 overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 select-none font-medium">
        Advertisement
      </span>
      <div className="w-full max-w-[300px] min-h-[250px] flex items-center justify-center overflow-x-hidden">
        <div data-wfa-ad="wfa_1228_incontent_banner" data-wfa-size="300x250"></div>
      </div>
    </div>
  );
}
