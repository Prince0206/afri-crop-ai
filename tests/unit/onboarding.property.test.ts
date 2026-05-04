/**
 * Property-Based Tests — Onboarding Flow
 *
 * Feature: africrop-ai-sprint-2, Property 14: Onboarding locale rendering
 *
 * For any supported locale, the OnboardingFlow component SHALL render all
 * visible text strings using translations from that locale's dictionary
 * (no English strings appear when locale is `sw`).
 *
 * Validates: Requirements 6.6
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { translations } from "../../lib/i18n";
import type { Locale, TranslationKey } from "../../lib/i18n";

// ─── Onboarding translation keys used by OnboardingFlow ──────────────────────

const ONBOARDING_VISIBLE_KEYS: TranslationKey[] = [
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

/**
 * Simulate what the OnboardingFlow component does: for a given locale,
 * call t(key) for each visible key and collect the rendered strings.
 *
 * This mirrors the useI18n() t() implementation:
 *   return translations[locale][key] ?? key
 */
function simulateRender(locale: Locale): Record<TranslationKey, string> {
  const dict = translations[locale];
  const result: Partial<Record<TranslationKey, string>> = {};
  for (const key of ONBOARDING_VISIBLE_KEYS) {
    result[key] = dict[key] ?? key;
  }
  return result as Record<TranslationKey, string>;
}

// ─── Property 14 ──────────────────────────────────────────────────────────────

describe("Property-Based Tests — Onboarding locale rendering", () => {
  // Feature: africrop-ai-sprint-2, Property 14: Onboarding locale rendering
  it("Property 14: for any supported locale, all visible onboarding strings come from that locale's dictionary", () => {
    // Validates: Requirements 6.6
    fc.assert(
      fc.property(fc.constantFrom<Locale>("en", "sw"), (locale) => {
        const rendered = simulateRender(locale);
        const localDict = translations[locale];

        for (const key of ONBOARDING_VISIBLE_KEYS) {
          const renderedValue = rendered[key];
          const expectedValue = localDict[key];

          // The rendered string must match the locale's dictionary value
          expect(renderedValue).toBe(expectedValue);

          // The rendered string must be non-empty (no missing translations)
          expect(renderedValue.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  it("Property 14 (sw-specific): when locale is sw, no visible onboarding string equals its English counterpart", () => {
    // Validates: Requirements 6.6 — Swahili strings must differ from English
    // (all sw onboarding translations are distinct from en)
    fc.assert(
      fc.property(fc.constantFrom<Locale>("sw"), (locale) => {
        const swRendered = simulateRender(locale);

        for (const key of ONBOARDING_VISIBLE_KEYS) {
          const swValue = swRendered[key];
          const enValue = translations.en[key];

          // Swahili translations must differ from English
          expect(swValue).not.toBe(enValue);
        }
      }),
      { numRuns: 100 },
    );
  });

  it("Property 14 (all locales): rendered strings are always non-empty for all supported locales", () => {
    // Validates: Requirements 6.6 — no locale produces empty strings
    fc.assert(
      fc.property(fc.constantFrom<Locale>("en", "sw", "fr"), (locale) => {
        const rendered = simulateRender(locale);

        for (const key of ONBOARDING_VISIBLE_KEYS) {
          expect(rendered[key].length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });
});
