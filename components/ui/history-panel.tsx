"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getHistory, clearHistory, ScanRecord } from "@/lib/history";

export default function HistoryPanel() {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  function refresh() {
    setRecords(getHistory());
  }

  function handleClear() {
    clearHistory();
    setRecords([]);
  }

  if (records.length === 0 && !open) return null;

  return (
    <section className="w-full max-w-md mx-auto mt-8">
      <button
        onClick={() => {
          if (!open) refresh();
          setOpen(!open);
        }}
        className="w-full flex items-center justify-between px-4 py-3
                   bg-white/60 dark:bg-white/5 backdrop-blur rounded-xl
                   border border-emerald-200 dark:border-emerald-800
                   text-sm font-medium text-emerald-800 dark:text-emerald-300
                   transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
      >
        <span>📋 Scan History ({records.length})</span>
        <span className="text-xs">{open ? "▲ Hide" : "▼ Show"}</span>
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {records.length > 1 && (
            <button
              onClick={handleClear}
              className="text-xs text-red-500 hover:text-red-700 underline ml-1"
            >
              Clear all history
            </button>
          )}

          {records.map((r) => (
            <div
              key={r.id}
              className="flex gap-3 p-3 rounded-xl bg-white/70 dark:bg-white/5
                         border border-gray-200 dark:border-gray-700"
            >
              <Image
                src={r.imageDataUrl}
                alt={r.label}
                width={64}
                height={64}
                unoptimized
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {r.label}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  {r.labelSw}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">
                    {(r.confidence * 100).toFixed(1)}%
                  </span>
                  <time className="text-xs text-gray-400">
                    {new Date(r.timestamp).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
