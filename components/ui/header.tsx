"use client";

import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-6 py-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
          <Leaf className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            AfriCrop AI
          </h1>
          <p className="text-[11px] text-emerald-300/60 tracking-wide uppercase">
            Cassava Blight Detection
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-300/70">Model Online</span>
      </div>
    </header>
  );
}
