"use client";

import React from "react";
import { trackEvent } from "@/lib/gtag";
import {
  HiOutlineArrowPath,
  HiOutlineArrowsRightLeft,
  HiOutlineArrowsUpDown,
  HiOutlineArrowUturnRight,
  HiOutlineArrowUturnLeft,
  HiOutlineCheck,
} from "react-icons/hi2";

interface RotateFlipControlsProps {
  rotation: number;
  onRotationChange: (deg: number) => void;
  flipHorizontal: boolean;
  onFlipHorizontalChange: (flip: boolean) => void;
  flipVertical: boolean;
  onFlipVerticalChange: (flip: boolean) => void;
  onReset: () => void;
  toolName?: string;
}

export default function RotateFlipControls({
  rotation,
  onRotationChange,
  flipHorizontal,
  onFlipHorizontalChange,
  flipVertical,
  onFlipVerticalChange,
  onReset,
  toolName = "rotate-image",
}: RotateFlipControlsProps) {
  const normalizedRotation = ((rotation % 360) + 360) % 360;

  const handleSelectAngle = (angle: number) => {
    trackEvent("image_rotate", {
      tool_name: toolName,
      rotation_angle: angle,
    });
    onRotationChange(angle);
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/40 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-sm">
            <HiOutlineArrowPath className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Rotate & Mirror Orientation
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Correct photograph angle or flip signature orientation for official form uploads
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition-all self-start sm:self-auto"
        >
          <HiOutlineArrowPath className="w-4 h-4" />
          Reset Orientation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Rotation Controls */}
        <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Rotate Image Orientation
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { angle: 0, label: "0° Normal", icon: HiOutlineArrowPath },
              { angle: 90, label: "+90° Right", icon: HiOutlineArrowUturnRight },
              { angle: 180, label: "180° Flip", icon: HiOutlineArrowPath },
              { angle: 270, label: "-90° Left", icon: HiOutlineArrowUturnLeft },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = normalizedRotation === item.angle;
              return (
                <button
                  key={item.angle}
                  type="button"
                  onClick={() => handleSelectAngle(item.angle)}
                  className={`py-3 px-2 rounded-xl text-xs font-extrabold border transition-all flex flex-col items-center justify-center gap-1.5 ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 font-medium pt-1">
            Rotate photo in 90-degree steps for official passport and portal uploads.
          </p>
        </div>

        {/* Section 2: Flip Mirror Controls */}
        <div className="space-y-3 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Flip Image (Mirror)
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                const nextVal = !flipHorizontal;
                if (nextVal) {
                  trackEvent("image_flip", {
                    tool_name: toolName,
                    flip_direction: "horizontal",
                  });
                }
                onFlipHorizontalChange(nextVal);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                flipHorizontal
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              <HiOutlineArrowsRightLeft className="w-4 h-4" />
              <span>Flip Horizontal</span>
              {flipHorizontal && <HiOutlineCheck className="w-4 h-4 ml-auto text-white" />}
            </button>

            <button
              type="button"
              onClick={() => {
                const nextVal = !flipVertical;
                if (nextVal) {
                  trackEvent("image_flip", {
                    tool_name: toolName,
                    flip_direction: "vertical",
                  });
                }
                onFlipVerticalChange(nextVal);
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                flipVertical
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              <HiOutlineArrowsUpDown className="w-4 h-4" />
              <span>Flip Vertical</span>
              {flipVertical && <HiOutlineCheck className="w-4 h-4 ml-auto text-white" />}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-medium pt-1">
            Mirror photograph or signature horizontally or vertically for correct alignment.
          </p>
        </div>
      </div>
    </div>
  );
}
