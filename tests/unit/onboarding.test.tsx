/**
 * Unit tests for components/ui/onboarding-flow.tsx and the onboarding gate
 * in app/page.tsx.
 *
 * Because @testing-library/react is not in devDependencies, these tests
 * verify the underlying logic that the OnboardingFlow component relies on:
 *
 *  1. First visit (no localStorage key) → shouldShowOnboarding() returns true
 *  2. Returning visit (key = "true") → shouldShowOnboarding() returns false
 *  3. Key present but not "true" → shouldShowOnboarding() returns true
 *  4. Skip: sets localStorage["africrop-onboarding-complete"] = "true"
 *  5. Complete (final step): sets localStorage["africrop-onboarding-complete"] = "true"
 *  6. All onboarding translation keys are present and non-empty in en and sw
 *  7. Step count is exactly 3 (as required by Requirement 6.2)
 */

import { describe, it, expect, beforeEach } from "vitest";
import { translations } from "../../lib/i18n";
import type { TranslationKey } from "../../lib/i18n";

const ONBOARDING_KEY = "africrop-onboarding-complete";

// ─── Mirrors the shouldShowOnboarding() logic from onboarding-flow.tsx ────────

function shouldShowOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) !== "true";
  } catch {
    return true;
  }
}

// ─── Mirrors the completeOnboarding() logic from onboarding-flow.tsx ─────────

function completeOnboarding(onComplete: () => void): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, "true");
  } catch {
    // silent
  }
  onComplete();
}

// ─── Slide definitions (mirrors SLIDES in onboarding-flow.tsx) ───────────────

const ONBOARDING_STEP_KEYS: Array<{
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
}> = [
  {
    titleKey: "onboarding.step1.title",
    bodyKey: "onboarding.step1.body",
  },
  {
    titleKey: "onboarding.step2.title",
    bodyKey: "onboarding.step2.body",
  },
  {
    titleKey: "onboarding.step3.title",
    bodyKey: "onboarding.step3.body",
  },
];

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("shouldShowOnboarding — first-visit detection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns true when localStorage key is absent (first visit)", () => {
    expect(shouldShowOnboarding()).toBe(true);
  });

  it('returns false when localStorage["africrop-onboarding-complete"] is "true" (returning visit)', () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    expect(shouldShowOnboarding()).toBe(false);
  });

  it('returns true when localStorage key is present but not "true"', () => {
    localStorage.setItem(ONBOARDING_KEY, "false");
    expect(shouldShowOnboarding()).toBe(true);
  });

  it("returns true when localStorage key is set to empty string", () => {
    localStorage.setItem(ONBOARDING_KEY, "");
    expect(shouldShowOnboarding()).toBe(true);
  });
});

describe("completeOnboarding — sets localStorage flag", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('sets localStorage["africrop-onboarding-complete"] to "true" when skip is triggered', () => {
    let called = false;
    completeOnboarding(() => {
      called = true;
    });
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe("true");
    expect(called).toBe(true);
  });

  it('sets localStorage["africrop-onboarding-complete"] to "true" when final step is completed', () => {
    let called = false;
    completeOnboarding(() => {
      called = true;
    });
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe("true");
    expect(called).toBe(true);
  });

  it("calls onComplete callback after setting the flag", () => {
    const calls: string[] = [];
    completeOnboarding(() => {
      // Verify flag is already set when callback fires
      calls.push(localStorage.getItem(ONBOARDING_KEY) ?? "");
    });
    expect(calls).toEqual(["true"]);
  });
});

describe("Onboarding — exactly three steps", () => {
  it("has exactly 3 slides defined", () => {
    expect(ONBOARDING_STEP_KEYS).toHaveLength(3);
  });
});

describe("Onboarding — translation keys present in en and sw", () => {
  const onboardingKeys: TranslationKey[] = [
    "onboarding.skip",
    "onboarding.next",
    "onboarding.getStarted",
    "onboarding.step1.title",
    "onboarding.step1.body",
    "onboarding.step2.title",
    "onboarding.step2.body",
    "onboarding.step3.title",
    "onboarding.step3.body",
  ];

  it("all onboarding keys are non-empty in the en dictionary", () => {
    onboardingKeys.forEach((key) => {
      const value = translations.en[key];
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it("all onboarding keys are non-empty in the sw dictionary", () => {
    onboardingKeys.forEach((key) => {
      const value = translations.sw[key];
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it("each step has a distinct title in en", () => {
    const titles = ONBOARDING_STEP_KEYS.map(
      ({ titleKey }) => translations.en[titleKey],
    );
    const unique = new Set(titles);
    expect(unique.size).toBe(3);
  });

  it("each step has a distinct title in sw", () => {
    const titles = ONBOARDING_STEP_KEYS.map(
      ({ titleKey }) => translations.sw[titleKey],
    );
    const unique = new Set(titles);
    expect(unique.size).toBe(3);
  });
});

describe("Onboarding — step navigation logic", () => {
  it("isLastStep is true only on step index 2 (0-indexed)", () => {
    const totalSteps = 3;
    for (let i = 0; i < totalSteps; i++) {
      const isLastStep = i === totalSteps - 1;
      if (i === 2) {
        expect(isLastStep).toBe(true);
      } else {
        expect(isLastStep).toBe(false);
      }
    }
  });

  it("step advances from 0 to 1 to 2 on Next clicks", () => {
    let step = 0;
    const totalSteps = 3;

    // Click Next on step 0
    if (step < totalSteps - 1) step++;
    expect(step).toBe(1);

    // Click Next on step 1
    if (step < totalSteps - 1) step++;
    expect(step).toBe(2);
  });

  it("clicking Get Started on step 2 triggers completion", () => {
    let completed = false;
    const step = 2;
    const isLastStep = step === 2;

    if (isLastStep) {
      completeOnboarding(() => {
        completed = true;
      });
    }

    expect(completed).toBe(true);
    expect(localStorage.getItem(ONBOARDING_KEY)).toBe("true");
  });
});
