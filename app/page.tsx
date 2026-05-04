"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "@/components/ui/header";
import UploadZone from "@/components/ui/upload-zone";
import ResultCard, {
  DetectionResult as CardDetectionResult,
} from "@/components/ui/result-card";
import HistoryPanel from "@/components/ui/history-panel";
import OnboardingFlow, {
  shouldShowOnboarding,
} from "@/components/ui/onboarding-flow";
import { saveScan } from "@/lib/history";
import { cacheAdvisoryData, getAdvisory } from "@/lib/advisory";

export default function Home() {
  // Onboarding: null = not yet determined (SSR-safe), true = show, false = skip
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    // Determine onboarding state on the client after mount
    setShowOnboarding(shouldShowOnboarding());
    cacheAdvisoryData();
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<CardDetectionResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState(0);

  const handleFile = useCallback((selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setFile(null);
    setPreview(null);
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

      const raw = await res.json();

      const mapped: CardDetectionResult[] = (
        Array.isArray(raw) ? raw : [raw]
      ).map((r: any) => {
        const label = r.label;
        const advisory = getAdvisory(label);
        return {
          label,
          swahili: r.labelSw ?? r.swahili ?? "",
          confidence: r.confidence,
          advisory, // 🚀 attach advisory data
        };
      });

      {
        !navigator.onLine && (
          <p className="text-center text-xs text-gray-500">
            Offline mode — using cached advisories.
          </p>
        );
      }

      setResult(mapped);

      if (preview) {
        const top = mapped[0];
        saveScan({
          id: crypto.randomUUID(),
          imageDataUrl: preview,
          label: top.label,
          labelSw: top.swahili,
          confidence: top.confidence,
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
      {/* First-run onboarding overlay */}
      {showOnboarding === true && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      <Header />

      <div className="max-w-md mx-auto px-4 py-10 space-y-6">
        <UploadZone
          onFileSelected={handleFile}
          preview={preview}
          isProcessing={loading}
          onClear={handleClear}
        />

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

        {/* automatically passes advisory into ResultCard */}
        {result && <ResultCard results={result} onReset={handleClear} />}

        <HistoryPanel key={historyKey} />
      </div>
    </main>
  );
}
