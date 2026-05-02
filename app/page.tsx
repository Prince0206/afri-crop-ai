"use client";

import { useState, useCallback } from "react";
import Header from "@/components/ui/header";
import UploadZone from "@/components/ui/upload-zone";
import ResultCard from "@/components/ui/result-card";
import HistoryPanel from "@/components/ui/history-panel";
import { saveScan } from "@/lib/history";

interface DetectionResult {
  label: string;
  labelSw: string;
  confidence: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);

  const handleFile = useCallback((selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  }, []);

  async function handleDetect() {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Detection failed (${res.status})`);
      }

      const data: DetectionResult = await res.json();
      setResult(data);

      if (preview) {
        saveScan({
          id: crypto.randomUUID(),
          imageDataUrl: preview,
          label: data.label,
          labelSw: data.labelSw,
          confidence: data.confidence,
          timestamp: Date.now(),
        });
        setHistoryKey((k) => k + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      <Header />

      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <UploadZone onFileSelected={handleFile} preview={preview} />

        {file && (
          <button
            onClick={handleDetect}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-emerald-600 hover:bg-emerald-700
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? "Analyzing…" : "Detect Blight"}
          </button>
        )}

        {error && (
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {result && <ResultCard {...result} />}

        <HistoryPanel key={historyKey} />
      </div>
    </main>
  );
}
