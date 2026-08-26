"use client";

import React from "react";

interface ValidationBadgesProps {
  checks: {
    dimensions: boolean;
    fileSize: boolean;
    format: boolean;
  };
  details: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
  requirements?: {
    width: number;
    height: number;
    minKB: number;
    maxKB: number;
    format: string;
  };
}

const formatSize = (bytes: number) => {
  return (bytes / 1024).toFixed(2) + " KB";
};

export default function ValidationBadges({
  checks,
  details,
  requirements,
}: ValidationBadgesProps) {
  
  const CheckIcon = () => (
    <svg className="w-5 h-5 text-success mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const CrossIcon = () => (
    <svg className="w-5 h-5 text-error mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const Badge = ({ success, label, info }: { success: boolean, label: string, info: React.ReactNode }) => (
    <div className={`flex items-center p-3 rounded-lg border ${success ? 'bg-success/5 border-success/20' : 'bg-error/5 border-error/20'}`}>
      {success ? <CheckIcon /> : <CrossIcon />}
      <div className="flex flex-col">
        <span className={`text-sm font-semibold ${success ? 'text-success' : 'text-error'}`}>
          {label}
        </span>
        <span className="text-xs text-gray-600">{info}</span>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-surface p-4 rounded-xl shadow-sm border border-border">
      <h3 className="text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Validation Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Badge 
          success={checks.dimensions} 
          label={checks.dimensions ? "Dimensions Matched" : "Invalid Dimensions"}
          info={
            requirements ? (
              <>Actual: {details.width}×{details.height}px (Req: {requirements.width}×{requirements.height}px)</>
            ) : (
              <>{details.width} × {details.height} px</>
            )
          } 
        />
        
        <Badge 
          success={checks.fileSize} 
          label={checks.fileSize ? "File Size Matched" : "Invalid File Size"}
          info={
            requirements ? (
              <>Actual: {formatSize(details.size)} (Req: {requirements.minKB}-{requirements.maxKB}KB)</>
            ) : (
              <>{formatSize(details.size)}</>
            )
          } 
        />
        
        <Badge 
          success={checks.format} 
          label={checks.format ? "Format Matched" : "Invalid Format"}
          info={
            requirements ? (
              <>Actual: {details.format} (Req: {requirements.format})</>
            ) : (
              <>{details.format}</>
            )
          } 
        />
        
      </div>
    </div>
  );
}
