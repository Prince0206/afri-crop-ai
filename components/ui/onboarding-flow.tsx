"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const ONBOARDING_KEY = "africrop-onboarding-complete";

export interface OnboardingFlowProps {
  onComplete: () => void;
}

interface Slide {
  titleKey:
    | "onboarding.step1.title"
    | "onboarding.step2.title"
    | "onboarding.step3.title";
  bodyKey:
    | "onboarding.step1.body"
    | "onboarding.step2.body"
    | "onboarding.step3.body";
  icon: string;
}

const SLIDES: Slide[] = [
  {
    titleKey: "onboarding.step1.title",
    bodyKey: "onboarding.step1.body",
    icon: "🌿",
  },
  {
    titleKey: "onboarding.step2.title",
    bodyKey: "onboarding.step2.body",
    icon: "📷",
  },
  {
    titleKey: "onboarding.step3.title",
    bodyKey: "onboarding.step3.body",
    icon: "📊",
  },
];

function completeOnboarding(onComplete: () => void): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, "true");
  } catch {
    // localStorage unavailable (e.g. private browsing) — fail silently
  }
  onComplete();
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  const isLastStep = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  function handleNext() {
    if (isLastStep) {
      completeOnboarding(onComplete);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleSkip() {
    completeOnboarding(onComplete);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("onboarding.step1.title")}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950/95 backdrop-blur-sm px-6"
    >
      {/* Skip button — visible on all steps */}
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={handleSkip}
          aria-label={t("onboarding.skip")}
          className="text-sm text-white/50 hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 rounded px-2 py-1"
        >
          {t("onboarding.skip")}
        </button>
      </div>

      {/* Slide content */}
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        {/* Step indicator dots */}
        <div className="flex gap-2" aria-hidden="true">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step ? "bg-emerald-400" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="text-6xl" aria-hidden="true">
          {slide.icon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">{t(slide.titleKey)}</h2>

        {/* Body */}
        <p className="text-base text-white/70 leading-relaxed">
          {t(slide.bodyKey)}
        </p>

        {/* Navigation button */}
        <button
          type="button"
          onClick={handleNext}
          className="mt-4 w-full py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          {isLastStep ? t("onboarding.getStarted") : t("onboarding.next")}
        </button>
      </div>
    </div>
  );
}

/**
 * Returns true if the onboarding flow should be shown (first visit).
 * Safe to call on the client only.
 */
export function shouldShowOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) !== "true";
  } catch {
    return true;
  }
}
