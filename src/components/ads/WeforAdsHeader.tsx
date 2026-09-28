import React from "react";

interface WeforAdsHeaderProps {
  className?: string;
}

export default function WeforAdsHeader({ className = "" }: WeforAdsHeaderProps) {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 overflow-hidden ${className}`}>
      <span className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 select-none font-medium">
        Advertisement
      </span>
      <div className="w-full max-w-[728px] min-h-[50px] sm:min-h-[90px] flex items-center justify-center overflow-x-hidden">
        <div data-wfa-ad="wfa_1228_header_leaderboard" data-wfa-size="728x90"></div>
      </div>
    </div>
  );
}
