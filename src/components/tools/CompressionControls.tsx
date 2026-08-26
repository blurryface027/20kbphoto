"use client";

import React from "react";

interface CompressionControlsProps {
  targetKB?: number;
  onTargetKBChange?: (kb: number) => void;
  targetWidth?: number;
  onTargetWidthChange?: (w: number) => void;
  targetHeight?: number;
  onTargetHeightChange?: (h: number) => void;
  format?: string;
  onFormatChange?: (f: string) => void;
  minKB?: number;
  maxKB?: number;
  showDimensions?: boolean;
  showFormat?: boolean;
  showCompression?: boolean;
  presetKBs?: number[];
  locked?: boolean;
}

export default function CompressionControls({
  targetKB = 50,
  onTargetKBChange,
  targetWidth,
  onTargetWidthChange,
  targetHeight,
  onTargetHeightChange,
  format = "JPEG",
  onFormatChange,
  minKB,
  maxKB,
  showDimensions = true,
  showFormat = true,
  presetKBs = [20, 30, 50, 100],
  locked = false,
}: CompressionControlsProps) {
  
  return (
    <div className="w-full bg-surface border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Compression Settings</h3>
        {locked && (
          <div className="flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Locked for Exam Requirement
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* File Size Controls */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Target File Size (KB)</label>
          <div className="flex flex-wrap gap-2">
            {presetKBs.map(kb => (
              <button
                key={kb}
                type="button"
                disabled={locked}
                onClick={() => onTargetKBChange?.(kb)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  targetKB === kb 
                    ? 'bg-accent text-white font-medium' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {kb} KB
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              disabled={locked}
              value={targetKB}
              onChange={(e) => onTargetKBChange?.(Number(e.target.value))}
              className={`block w-24 rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 ${
                locked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
              }`}
              min={1}
            />
            <span className="text-sm text-gray-500">KB</span>
          </div>
          {(minKB || maxKB) && (
            <p className="text-xs text-gray-500">
              Required range: {minKB || 0} KB - {maxKB || 'Any'} KB
            </p>
          )}
        </div>

        <div className="space-y-4">
          {/* Dimension Controls */}
          {showDimensions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (px)</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">W:</span>
                  <input
                    type="number"
                    disabled={locked}
                    value={targetWidth || ''}
                    onChange={(e) => onTargetWidthChange?.(Number(e.target.value))}
                    placeholder="Auto"
                    className={`block w-20 rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 ${
                      locked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                    }`}
                  />
                </div>
                <span className="text-gray-400">×</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">H:</span>
                  <input
                    type="number"
                    disabled={locked}
                    value={targetHeight || ''}
                    onChange={(e) => onTargetHeightChange?.(Number(e.target.value))}
                    placeholder="Auto"
                    className={`block w-20 rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 ${
                      locked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Format Controls */}
          {showFormat && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                disabled={locked}
                value={format}
                onChange={(e) => onFormatChange?.(e.target.value)}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 ${
                  locked ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
                }`}
              >
                <option value="JPEG">JPEG (.jpg)</option>
                <option value="PNG">PNG (.png)</option>
                <option value="WEBP">WebP (.webp)</option>
              </select>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
