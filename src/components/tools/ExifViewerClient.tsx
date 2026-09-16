"use client";

import { useState, useRef } from "react";
import ExifReader from "exifreader";
import {
  HiOutlineCloudArrowUp,
  HiOutlineTrash,
  HiOutlineArrowDownTray,
  HiOutlineInformationCircle,
  HiOutlineShieldCheck,
  HiOutlineCamera,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineHashtag,
} from "react-icons/hi2";
import { trackEvent } from "@/lib/gtag";

interface MetadataEntry {
  label: string;
  value: string;
}

export default function ExifViewerClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSpecs, setFileSpecs] = useState<MetadataEntry[]>([]);
  const [cameraSpecs, setCameraSpecs] = useState<MetadataEntry[]>([]);
  const [exifSpecs, setExifSpecs] = useState<MetadataEntry[]>([]);
  const [gpsSpecs, setGpsSpecs] = useState<MetadataEntry[]>([]);
  const [cleanDataUrl, setCleanDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    setIsProcessing(true);
    setCleanDataUrl(null);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    try {
      const img = new Image();
      img.src = url;
      await new Promise((r) => { img.onload = r; });

      // File Specs
      const basicSpecs: MetadataEntry[] = [
        { label: "File Name", value: selectedFile.name },
        { label: "File Size", value: `${Math.round(selectedFile.size / 1024)} KB (${selectedFile.size.toLocaleString()} bytes)` },
        { label: "File Format", value: selectedFile.type || "image/jpeg" },
        { label: "Pixel Dimensions", value: `${img.width} × ${img.height} px` },
        { label: "Aspect Ratio", value: `${(img.width / img.height).toFixed(2)} : 1` },
      ];
      setFileSpecs(basicSpecs);

      // Parse EXIF using ExifReader
      const arrayBuffer = await selectedFile.arrayBuffer();
      const tags = ExifReader.load(arrayBuffer, { expanded: true });

      const camList: MetadataEntry[] = [];
      const exifList: MetadataEntry[] = [];
      const gpsList: MetadataEntry[] = [];

      if (tags.exif) {
        if (tags.exif.Make) camList.push({ label: "Camera Make", value: tags.exif.Make.description });
        if (tags.exif.Model) camList.push({ label: "Camera Model", value: tags.exif.Model.description });
        if (tags.exif.Software) camList.push({ label: "Software / Firmware", value: tags.exif.Software.description });
        if (tags.exif.LensModel) camList.push({ label: "Lens Model", value: tags.exif.LensModel.description });

        if (tags.exif.ISOSpeedRatings) exifList.push({ label: "ISO Speed", value: tags.exif.ISOSpeedRatings.description });
        if (tags.exif.ExposureTime) exifList.push({ label: "Shutter Speed", value: `${tags.exif.ExposureTime.description} sec` });
        if (tags.exif.FNumber) exifList.push({ label: "Aperture (F-Stop)", value: tags.exif.FNumber.description });
        if (tags.exif.FocalLength) exifList.push({ label: "Focal Length", value: tags.exif.FocalLength.description });
        if (tags.exif.DateTimeOriginal) exifList.push({ label: "Date & Time Taken", value: tags.exif.DateTimeOriginal.description });
        if (tags.exif.Orientation) exifList.push({ label: "Image Orientation", value: tags.exif.Orientation.description });
      }

      if (tags.gps) {
        if (tags.gps.Latitude) gpsList.push({ label: "GPS Latitude", value: `${tags.gps.Latitude.toFixed(6)}°` });
        if (tags.gps.Longitude) gpsList.push({ label: "GPS Longitude", value: `${tags.gps.Longitude.toFixed(6)}°` });
        if (tags.gps.Altitude) gpsList.push({ label: "GPS Altitude", value: `${tags.gps.Altitude} m` });
      }

      setCameraSpecs(camList);
      setExifSpecs(exifList);
      setGpsSpecs(gpsList);

      // Create clean stripped image preview
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setCleanDataUrl(canvas.toDataURL(selectedFile.type || "image/jpeg", 0.92));
      }

      trackEvent("exif_viewed", {
        tool_name: "image-metadata",
        has_exif: exifList.length > 0,
        has_gps: gpsList.length > 0,
      });
    } catch (err) {
      console.warn("ExifReader notice:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50/80 rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <HiOutlineInformationCircle className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Upload Image to Inspect Metadata & Remove EXIF
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            View camera settings, date, dimensions, and GPS location. Strip sensitive metadata safely.
          </p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
            Select Photo File
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-xs sm:max-w-md">
              {file.name}
            </div>

            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
                setCleanDataUrl(null);
              }}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
            >
              <HiOutlineTrash className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Preview & Strip EXIF Action */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs font-bold text-slate-500 block mb-2">Photo Preview</span>
                {previewUrl && (
                  <div className="aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-2 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>

              {cleanDataUrl && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-center space-y-3">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold text-emerald-800">
                    <HiOutlineShieldCheck className="w-4 h-4" /> Clean Metadata Version Ready
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Download this version with all EXIF and location tags completely stripped for privacy.
                  </p>
                  <a
                    href={cleanDataUrl}
                    download={`${file.name.replace(/\.[^/.]+$/, "")}-no-exif.jpg`}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <HiOutlineArrowDownTray className="w-4 h-4" /> Download Cleaned Photo
                  </a>
                </div>
              )}
            </div>

            {/* Metadata Tables */}
            <div className="md:col-span-2 space-y-4">
              {/* File Specs */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <HiOutlineHashtag className="w-4 h-4 text-indigo-600" /> Basic File & Image Properties
                </h4>
                <div className="divide-y divide-slate-100 text-xs">
                  {fileSpecs.map((s, idx) => (
                    <div key={idx} className="py-2 flex justify-between gap-4">
                      <span className="font-semibold text-slate-500">{s.label}</span>
                      <span className="font-mono font-bold text-slate-800 text-right">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Camera Specs */}
              {cameraSpecs.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <HiOutlineCamera className="w-4 h-4 text-indigo-600" /> Camera & Hardware Information
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs">
                    {cameraSpecs.map((s, idx) => (
                      <div key={idx} className="py-2 flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">{s.label}</span>
                        <span className="font-mono font-bold text-slate-800 text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EXIF Capture Specs */}
              {exifSpecs.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <HiOutlineClock className="w-4 h-4 text-indigo-600" /> EXIF Shooting Settings
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs">
                    {exifSpecs.map((s, idx) => (
                      <div key={idx} className="py-2 flex justify-between gap-4">
                        <span className="font-semibold text-slate-500">{s.label}</span>
                        <span className="font-mono font-bold text-slate-800 text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GPS Location Specs */}
              {gpsSpecs.length > 0 && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 space-y-2">
                  <h4 className="text-xs font-extrabold text-rose-900 flex items-center gap-1.5">
                    <HiOutlineMapPin className="w-4 h-4 text-rose-600" /> GPS Location Metadata Found
                  </h4>
                  <div className="divide-y divide-rose-100 text-xs">
                    {gpsSpecs.map((s, idx) => (
                      <div key={idx} className="py-2 flex justify-between gap-4">
                        <span className="font-semibold text-rose-700">{s.label}</span>
                        <span className="font-mono font-bold text-rose-900 text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
