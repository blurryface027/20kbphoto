"use client";

import React, { useState } from "react";

interface NameDateOverlayProps {
  name: string;
  onNameChange: (name: string) => void;
  date: string;
  onDateChange: (date: string) => void;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  position: string;
  onPositionChange: (position: string) => void;
}

export default function NameDateOverlay({
  name,
  onNameChange,
  date,
  onDateChange,
  enabled,
  onEnabledChange,
  position,
  onPositionChange,
}: NameDateOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleEnabled = () => {
    const newState = !enabled;
    onEnabledChange(newState);
    if (newState) setIsExpanded(true);
  };

  return (
    <div className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      {/* Header / Toggle */}
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={(e) => {
              e.stopPropagation();
              toggleEnabled();
            }}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              enabled ? 'bg-accent' : 'bg-gray-200'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <div>
            <h3 className="text-sm font-semibold text-primary">Add Name & Date Overlay</h3>
            <p className="text-xs text-gray-500">Print text directly on your photo</p>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Collapsible Content */}
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-5 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          
          <div>
            <label htmlFor="overlay-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="overlay-name"
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. John Doe"
              disabled={!enabled}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          <div>
            <label htmlFor="overlay-date" className="block text-sm font-medium text-gray-700 mb-1">
              Date (DD/MM/YYYY)
            </label>
            <input
              id="overlay-date"
              type="text"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              placeholder="e.g. 26/08/2026"
              disabled={!enabled}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="overlay-position" className="block text-sm font-medium text-gray-700 mb-1">
              Text Position
            </label>
            <select
              id="overlay-position"
              value={position}
              onChange={(e) => onPositionChange(e.target.value)}
              disabled={!enabled}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent sm:text-sm border p-2 disabled:bg-gray-50 disabled:text-gray-400"
            >
              <option value="bottom-center">Bottom Center (Standard)</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="top-center">Top Center</option>
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
            </select>
          </div>
          
        </div>
      </div>
    </div>
  );
}
