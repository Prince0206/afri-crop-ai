"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw, Share2 } from "lucide-react";
import type { Advisory } from "@/lib/advisory";
import { useI18n } from "@/lib/i18n";

export interface DetectionResult {
  label: string;
  swahili: string;
  confidence: number;
  advisory?: Advisory;
}

interface ResultCardProps {
  results: DetectionResult[];
  onReset: () => void;
}

function severityColor(
  severity: "High" | "Medium" | "Low" | undefined,
): string {
  if (!severity || severity === "Low") return "emerald";
  if (severity === "Medium") return "amber";
  return "red";
}

function severityBadgeClasses(severity: "High" | "Medium" | "Low"): string {
  if (severity === "High")
    return "bg-red-500/20 text-red-300 border border-red-500/30";
  if (severity === "Medium")
    return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
}

function ConfidenceBar({ value, color }: { value: number; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  };
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorMap[color] ?? "bg-emerald-400"}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}

export default function ResultCard({ results, onReset }: ResultCardProps) {
  const { t } = useI18n();
  const top = results[0];
  const [showToast, setShowToast] = useState(false);

  if (!top) return null;

  const advisory = top.advisory ?? null;
  const severity = advisory?.severity;
  const color = severityColor(severity);
  const isHealthy = top.label === "Healthy";
  const pct = (top.confidence * 100).toFixed(1);
  const showLowConfidenceWarning = top.confidence < 0.6;

  const iconColor: Record<string, string> = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    red: "text-red-400",
  };

  const borderColor: Record<string, string> = {
    emerald: "border-emerald-400/30",
    amber: "border-amber-400/30",
    red: "border-red-400/30",
  };

  function handleShare() {
    if (!advisory) return;
    const symptoms =
      advisory.symptoms.length > 0
        ? `\nSymptoms:\n${advisory.symptoms.map((s) => `- ${s}`).join("\n")}`
        : "";
    const text = [
      `Diagnosis: ${top.label}`,
      `Confidence: ${pct}%`,
      `${advisory.title}`,
      `${advisory.summary}`,
      symptoms,
      `\nTreatment:\n${advisory.actions.map((a) => `- ${a}`).join("\n")}`,
      `\nPrevention:\n${advisory.prevention.map((p) => `- ${p}`).join("\n")}`,
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  }

  return (
    <div
      className={`w-full rounded-2xl glass border ${borderColor[color]} animate-fade-up`}
    >
      {/* Top diagnosis */}
      <div className="p-6 flex items-start gap-4">
        <div className="mt-0.5">
          {isHealthy ? (
            <CheckCircle2 className={`w-8 h-8 ${iconColor[color]}`} />
          ) : (
            <AlertTriangle className={`w-8 h-8 ${iconColor[color]}`} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-1">
            {t("result.primaryDiagnosis")}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-white truncate">
              {top.swahili}
            </h2>
            {severity && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${severityBadgeClasses(severity)}`}
              >
                {t(
                  severity === "High"
                    ? "result.severity.high"
                    : severity === "Medium"
                      ? "result.severity.medium"
                      : "result.severity.low",
                )}
              </span>
            )}
          </div>
          <p className="text-sm text-white/50 mt-0.5">{top.label}</p>
          <div className="mt-3 flex items-center gap-3">
            <ConfidenceBar value={top.confidence} color={color} />
            <span className="text-sm font-semibold text-white/80 tabular-nums whitespace-nowrap">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Low-confidence warning banner */}
      {showLowConfidenceWarning && (
        <div className="mx-6 mb-2 px-4 py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm">
          {t("result.lowConfidence")}
        </div>
      )}

      {/* Advisory */}
      {advisory && (
        <div className="border-t border-white/5 px-6 py-4 space-y-3">
          <p className="text-sm italic text-white/60">{advisory.summary}</p>

          {/* Symptoms — hidden for Healthy */}
          {!isHealthy && advisory.symptoms.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
                {t("result.symptoms")}
              </h3>
              <ul className="list-disc ml-5 space-y-1">
                {advisory.symptoms.map((s, i) => (
                  <li key={i} className="text-sm text-white/70">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatment (formerly Actions) */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
              {t("result.treatment")}
            </h3>
            <ul className="list-disc ml-5 space-y-1">
              {advisory.actions.map((a, i) => (
                <li key={i} className="text-sm text-white/70">
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">
              {t("result.prevention")}
            </h3>
            <ul className="list-disc ml-5 space-y-1">
              {advisory.prevention.map((p, i) => (
                <li key={i} className="text-sm text-white/70">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Other possibilities — collapsible */}
      {results.length > 1 && (
        <details className="border-t border-white/5 px-6 py-4">
          <summary className="text-[11px] uppercase tracking-wider text-white/30 cursor-pointer select-none">
            {t("result.otherPossibilities")}
          </summary>
          <div className="mt-3 space-y-3">
            {results.slice(1).map((r) => {
              const c = severityColor(r.advisory?.severity);
              return (
                <div key={r.label} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/70 truncate">
                      {r.swahili}{" "}
                      <span className="text-white/30">· {r.label}</span>
                    </p>
                  </div>
                  <div className="w-24">
                    <ConfidenceBar value={r.confidence} color={c} />
                  </div>
                  <span className="text-xs text-white/50 tabular-nums w-12 text-right">
                    {(r.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </details>
      )}

      {/* Actions */}
      <div className="border-t border-white/5 p-4 flex justify-center gap-3 flex-wrap">
        {advisory && (
          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="px-6 py-2.5 rounded-xl glass-strong text-sm font-medium text-white hover:bg-white/15 transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {t("result.share")}
            </button>
            {showToast && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
                {t("result.shareCopied")}
              </div>
            )}
          </div>
        )}
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl glass-strong text-sm font-medium text-white hover:bg-white/15 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {t("result.scanAnother")}
        </button>
      </div>
    </div>
  );
}
