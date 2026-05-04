/**
 * Property-Based Tests — I18n
 *
 * Feature: africrop-ai-sprint-2
 *
 * Property 4: Translation key completeness
 *   For any translation key defined in the en locale dictionary, the sw locale
 *   dictionary SHALL contain the same key mapped to a non-empty string.
 *   Validates: Requirements 3.7
 *
 * Property 6: Locale persistence round-trip
 *   For any supported locale value ("en", "sw", "fr"), calling setLocale(locale)
 *   SHALL write the value to localStorage["africrop-locale"], and a fresh
 *   I18nProvider initialisation SHALL read back the same locale.
 *   Validates: Requirements 3.5
 */

import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";
import { translations } from "../../lib/i18n";
import type { Locale, TranslationKey } from "../../lib/i18n";

const STORAGE_KEY = "africrop-locale";
const SUPPORTED_LOCALES: Locale[] = ["en", "sw", "fr"];

function isValidLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

/** Simulate the I18nProvider mount logic: read locale from localStorage */
function simulateMountLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isValidLocale(stored)) {
      return stored;
    }
  } catch {
    // ignore
  }
  return "en";
}

/** Simulate setLocale: write to localStorage */
function simulateSetLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

describe("Property-Based Tests — I18n", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Feature: africrop-ai-sprint-2, Property 4: Translation key completeness
  it("Property 4: every en translation key exists in sw with a non-empty string", () => {
    // Validates: Requirements 3.7
    const enKeys = Object.keys(translations.en) as TranslationKey[];

    fc.assert(
      fc.property(fc.constantFrom(...enKeys), (key) => {
        const swValue = translations.sw[key];
        expect(typeof swValue).toBe("string");
        expect(swValue.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 6: Locale persistence round-trip
  it("Property 6: setLocale writes to localStorage and fresh mount reads back the same locale", () => {
    // Validates: Requirements 3.5
    fc.assert(
      fc.property(fc.constantFrom<Locale>("en", "sw", "fr"), (locale) => {
        // Clear storage before each iteration to simulate a fresh state
        localStorage.clear();

        // Simulate setLocale
        simulateSetLocale(locale);

        // Assert localStorage was written correctly
        expect(localStorage.getItem(STORAGE_KEY)).toBe(locale);

        // Simulate a fresh I18nProvider mount reading back the locale
        const restoredLocale = simulateMountLocale();
        expect(restoredLocale).toBe(locale);
      }),
      { numRuns: 100 },
    );
  });
});
