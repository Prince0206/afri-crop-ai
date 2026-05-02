"use client";

import { useState, useCallback } from "react";
import Header from "@/components/ui/header";
import UploadZone from "@/components/ui/upload-zone";
import ResultCard, { DetectionResult } from "@/components/ui/result-card";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<DetectionResult[] | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (selected: File) => {
    setFile(selected);
    setResults(null);
    setError(null);

    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);
    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image", selected);

      const res = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Server error ${res.status}`);
      }

      const data = await res.json();
      setResults(data.results);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Detection failed";
      setError(msg);
    } finally {
      setProcessing(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setResults(null);
    setError(null);
  }, [preview]);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col items-center px-4 sm:px-6 pb-12">
        <div className="w-full max-w-md mt-6 sm:mt-12 space-y-6">
          {/* Tagline */}
          {!preview && (
            <div className="text-center animate-fade-up">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Diagnose your cassava
                <span className="text-emerald-400"> instantly</span>
              </h2>
              <p className="text-sm text-white/40 mt-2 max-w-xs mx-auto">
                Snap a photo of any cassava leaf and our AI identifies blight,
                mosaic, and other diseases in seconds.
              </p>
            </div>
          )}

          {/* Upload */}
          <UploadZone
            onFileSelected={handleFileSelected}
            isProcessing={processing}
            preview={preview}
            onClear={handleClear}
          />

          {/* Error */}
          {error && (
            <div className="w-full rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300 animate-fade-up">
              {error}
            </div>
          )}

          {/* Results */}
          {results && <ResultCard results={results} onReset={handleClear} />}

          {/* Footer */}
          <p className="text-center text-[11px] text-white/20 pt-4">
            Powered by Hugging Face · Built for African farmers
          </p>
        </div>
      </div>
    </main>
  );
}
