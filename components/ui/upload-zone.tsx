"use client";

import { useCallback, useRef, useState } from "react";
import { Camera, Upload, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
  preview: string | null;
  onClear: () => void;
}

export default function UploadZone({
  onFileSelected,
  isProcessing,
  preview,
  onClear,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !file.type.startsWith("image/")) return;
      onFileSelected(file);
    },
    [onFileSelected],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  if (preview) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden glass animate-fade-up">
        <Image
          src={preview}
          alt="Crop preview"
          width={400}
          height={400}
          unoptimized
          className="..."
        />
        {!isProcessing && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        )}
        {isProcessing && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            <p className="text-sm text-emerald-200 font-medium">
              Analyzing leaf…
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`
        w-full rounded-2xl border-2 border-dashed p-8 sm:p-12
        flex flex-col items-center justify-center gap-5
        transition-all duration-300 cursor-pointer
        ${
          dragOver
            ? "border-emerald-400 bg-emerald-400/10 scale-[1.02]"
            : "border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.03]"
        }
      `}
      onClick={() => inputRef.current?.click()}
    >
      <div className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center animate-pulse-ring">
        <Upload className="w-7 h-7 text-emerald-400" />
      </div>

      <div className="text-center">
        <p className="text-base font-semibold text-white/90">
          Drop a leaf photo here
        </p>
        <p className="text-sm text-white/40 mt-1">
          JPG, PNG or WebP — max 10 MB
        </p>
      </div>

      <div className="flex items-center gap-3 mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}
          className="px-5 py-2.5 rounded-xl glass-strong text-sm font-medium text-white hover:bg-white/15 transition-colors flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Browse
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            cameraRef.current?.click();
          }}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-bold text-emerald-950 transition-colors flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Camera
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
