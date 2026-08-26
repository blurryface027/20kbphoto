"use client";

import React from "react";
import {
  HiOutlineArrowPath,
  HiOutlineArrowsRightLeft,
  HiOutlineArrowsUpDown,
  HiOutlineArrowUturnRight,
  HiOutlineArrowUturnLeft,
} from "react-icons/hi2";

interface RotateFlipControlsProps {
  rotation: number;
  onRotationChange: (deg: number) => void;
  flipHorizontal: boolean;
  onFlipHorizontalChange: (flip: boolean) => void;
  flipVertical: boolean;
  onFlipVerticalChange: (flip: boolean) => void;
  onReset: () => void;
}

export default function RotateFlipControls({
  rotation,
  onRotationChange,
  flipHorizontal,
  onFlipHorizontalChange,
  flipVertical,
  onFlipVerticalChange,
  onReset,
}: RotateFlipControlsProps) {
  const handleRotateStep = (step: number) => {
    const next = (rotation + step) % 360;
    onRotationChange(next < 0 ? next + 360 : next);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <HiOutlineArrowPath className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-900">Rotate & Flip Options</h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 transition-colors"
        >
          Reset Orientation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Quick Rotation Controls */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
            Rotate Image Angle
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRotateStep(-90)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all"
            >
              <HiOutlineArrowUturnLeft className="w-4 h-4" />
              -90° Left
            </button>

            <button
              type="button"
              onClick={() => handleRotateStep(90)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all"
            >
              <HiOutlineArrowUturnRight className="w-4 h-4" />
              +90° Right
            </button>

            <button
              type="button"
              onClick={() => handleRotateStep(180)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all"
            >
              <HiOutlineArrowPath className="w-4 h-4" />
              180° Flip
            </button>
          </div>

          {/* Slider angle */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
              <span>Fine Angle Slider</span>
              <span className="font-bold text-indigo-600">{rotation}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Section 2: Flip Mirror Controls */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
            Flip Image (Mirror)
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onFlipHorizontalChange(!flipHorizontal)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                flipHorizontal
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <HiOutlineArrowsRightLeft className="w-4 h-4" />
              Flip Horizontal
            </button>

            <button
              type="button"
              onClick={() => onFlipVerticalChange(!flipVertical)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all ${
                flipVertical
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <HiOutlineArrowsUpDown className="w-4 h-4" />
              Flip Vertical
            </button>
          </div>

          <p className="text-xs text-gray-500 pt-1">
            Mirror your photograph or signature horizontally or vertically for correct orientation in form portals.
          </p>
        </div>
      </div>
    </div>
  );
}
