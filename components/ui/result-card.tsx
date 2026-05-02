"use client";

import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

export interface DetectionResult {
  label: string;
  swahili: string;
  confidence: number;
}

interface ResultCardProps {
  results: DetectionResult[];
  onReset: () => void;
}

function severityColor(label: string): string {
  if (label.toLowerCase().includes("healthy")) return "emerald";
  if (label.toLowerCase().includes("mosaic")) return "amber";
  return "red";
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
        style={{ width: `${(value * 100).toFixed(0)}%` }}
      />
    </div>
  );
}

export default function ResultCard({ results, onReset }: ResultCardProps) {
  const top = results[0];
  if (!top) return null;

  const color = severityColor(top.label);
  const isHealthy = color === "emerald";
  const pct = (top.confidence * 100).toFixed(1);

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
            Primary Diagnosis
          </p>
          <h2 className="text-xl font-bold text-white truncate">
            {top.swahili}
          </h2>
          <p className="text-sm text-white/50 mt-0.5">{top.label}</p>
          <div className="mt-3 flex items-center gap-3">
            <ConfidenceBar value={top.confidence} color={color} />
            <span className="text-sm font-semibold text-white/80 tabular-nums whitespace-nowrap">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* Secondary results */}
      {results.length > 1 && (
        <div className="border-t border-white/5 px-6 py-4 space-y-3">
          <p className="text-[11px] uppercase tracking-wider text-white/30">
            Other possibilities
          </p>
          {results.slice(1).map((r) => {
            const c = severityColor(r.label);
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
      )}

      {/* Action */}
      <div className="border-t border-white/5 p-4 flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl glass-strong text-sm font-medium text-white hover:bg-white/15 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Scan Another Leaf
        </button>
      </div>
    </div>
  );
}
