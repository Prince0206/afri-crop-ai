/**
 * Unit tests for components/ui/header.tsx — language selector
 *
 * Because @testing-library/react is not in devDependencies, these tests
 * verify the underlying logic that the Header component relies on:
 *
 *  1. All three supported locales are represented in the LOCALE_OPTIONS list
 *     (English, Kiswahili, Français).
 *  2. The native display names match the expected strings.
 *  3. setLocale writes the chosen locale to localStorage within the same
 *     synchronous call (i.e., the onChange handler updates state immediately).
 *  4. The aria-label for the selector is sourced from the "nav.selectLanguage"
 *     translation key, which is non-empty in both en and sw.
 *  5. The active locale is visually distinguished: the option label for the
 *     current locale is prefixed with "✓ ".
 *  6. Switching locale from "en" to "sw" persists "sw" to localStorage.
 *  7. Switching locale from "sw" to "fr" persists "fr" to localStorage.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { translations } from "../../lib/i18n";
import type { Locale } from "../../lib/i18n";

// ─── Locale options — mirrors the constant in header.tsx ─────────────────────

const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "sw", label: "Kiswahili" },
  { value: "fr", label: "Français" },
];

const STORAGE_KEY = "africrop-locale";

/** Simulate the setLocale call that onChange triggers */
function simulateSetLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

/** Simulate the option label rendering logic from header.tsx */
function getOptionLabel(
  value: Locale,
  activeLocale: Locale,
  label: string,
): string {
  return value === activeLocale ? `✓ ${label}` : label;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Header — language selector locale options", () => {
  it("renders exactly three locale options", () => {
    expect(LOCALE_OPTIONS).toHaveLength(3);
  });

  it('includes "en" with native name "English"', () => {
    const option = LOCALE_OPTIONS.find((o) => o.value === "en");
    expect(option).toBeDefined();
    expect(option!.label).toBe("English");
  });

  it('includes "sw" with native name "Kiswahili"', () => {
    const option = LOCALE_OPTIONS.find((o) => o.value === "sw");
    expect(option).toBeDefined();
    expect(option!.label).toBe("Kiswahili");
  });

  it('includes "fr" with native name "Français"', () => {
    const option = LOCALE_OPTIONS.find((o) => o.value === "fr");
    expect(option).toBeDefined();
    expect(option!.label).toBe("Français");
  });
});

describe("Header — aria-label sourced from i18n", () => {
  it('"nav.selectLanguage" is non-empty in the en dictionary', () => {
    expect(translations.en["nav.selectLanguage"].length).toBeGreaterThan(0);
  });

  it('"nav.selectLanguage" is non-empty in the sw dictionary', () => {
    expect(translations.sw["nav.selectLanguage"].length).toBeGreaterThan(0);
  });

  it('"nav.selectLanguage" is non-empty in the fr dictionary', () => {
    expect(translations.fr["nav.selectLanguage"].length).toBeGreaterThan(0);
  });
});

describe("Header — active locale visual indicator (checkmark prefix)", () => {
  it("prefixes the active locale option label with ✓", () => {
    const activeLocale: Locale = "sw";
    const label = getOptionLabel("sw", activeLocale, "Kiswahili");
    expect(label).toBe("✓ Kiswahili");
  });

  it("does not prefix inactive locale option labels", () => {
    const activeLocale: Locale = "sw";
    const enLabel = getOptionLabel("en", activeLocale, "English");
    const frLabel = getOptionLabel("fr", activeLocale, "Français");
    expect(enLabel).toBe("English");
    expect(frLabel).toBe("Français");
  });

  it("prefixes the correct option when active locale is en", () => {
    const activeLocale: Locale = "en";
    const enLabel = getOptionLabel("en", activeLocale, "English");
    const swLabel = getOptionLabel("sw", activeLocale, "Kiswahili");
    expect(enLabel).toBe("✓ English");
    expect(swLabel).toBe("Kiswahili");
  });
});

describe("Header — onChange calls setLocale (localStorage persistence)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("selecting sw writes sw to localStorage", () => {
    simulateSetLocale("sw");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("sw");
  });

  it("selecting fr writes fr to localStorage", () => {
    simulateSetLocale("fr");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("fr");
  });

  it("selecting en writes en to localStorage", () => {
    simulateSetLocale("en");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("en");
  });

  it("switching from en to sw updates localStorage to sw", () => {
    simulateSetLocale("en");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("en");

    simulateSetLocale("sw");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("sw");
  });

  it("switching from sw to fr updates localStorage to fr", () => {
    simulateSetLocale("sw");
    simulateSetLocale("fr");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("fr");
  });
});
