"use client";

import { Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

// Supported locales with their native display names
const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "sw", label: "Kiswahili" },
  { value: "fr", label: "Français" },
];

export default function Header() {
  const { locale, setLocale, t } = useI18n();

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
            {t("app.subtitle")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language selector */}
        <div className="relative">
          <select
            aria-label={t("nav.selectLanguage")}
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className="
              appearance-none bg-white/5 border border-white/10 rounded-lg
              pl-3 pr-8 py-1.5 text-sm text-white/80
              hover:bg-white/10 hover:border-white/20
              focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50
              cursor-pointer transition-colors
            "
          >
            {LOCALE_OPTIONS.map(({ value, label }) => (
              <option
                key={value}
                value={value}
                className="bg-zinc-900 text-white"
              >
                {/* Checkmark prefix visually indicates the active locale */}
                {value === locale ? `✓ ${label}` : label}
              </option>
            ))}
          </select>
          {/* Dropdown chevron */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs"
          >
            ▾
          </span>
        </div>

        {/* Online status indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300/70">Model Online</span>
        </div>
      </div>
    </header>
  );
}
