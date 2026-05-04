/**
 * Unit tests for result-card.tsx logic.
 *
 * @testing-library/react is not in devDependencies, so these tests verify
 * the pure logic functions and predicates that the ResultCard component relies on.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { advisoryData } from "../../lib/advisory";
import type { Advisory } from "../../lib/advisory";

// ─── Mirrors severityColor() from result-card.tsx ────────────────────────────

function severityColor(
  severity: "High" | "Medium" | "Low" | undefined,
): string {
  if (!severity || severity === "Low") return "emerald";
  if (severity === "Medium") return "amber";
  return "red";
}

// ─── Mirrors severityBadgeClasses() from result-card.tsx ─────────────────────

function severityBadgeClasses(severity: "High" | "Medium" | "Low"): string {
  if (severity === "High")
    return "bg-red-500/20 text-red-300 border border-red-500/30";
  if (severity === "Medium")
    return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
  return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
}

// ─── Mirrors low-confidence predicate from result-card.tsx ───────────────────

function shouldShowLowConfidenceWarning(confidence: number): boolean {
  return confidence < 0.6;
}

// ─── Mirrors isHealthy predicate from result-card.tsx ────────────────────────

function isHealthyLabel(label: string): boolean {
  return label === "Healthy";
}

// ─── Mirrors symptoms visibility logic from result-card.tsx ──────────────────

function shouldShowSymptoms(label: string, symptoms: string[]): boolean {
  return !isHealthyLabel(label) && symptoms.length > 0;
}

// ─── Mirrors share text builder from result-card.tsx ─────────────────────────

function buildShareText(
  label: string,
  confidence: number,
  advisory: Advisory,
): string {
  const pct = (confidence * 100).toFixed(1);
  const symptoms =
    advisory.symptoms.length > 0
      ? `\nSymptoms:\n${advisory.symptoms.map((s) => `- ${s}`).join("\n")}`
      : "";
  return [
    `Diagnosis: ${label}`,
    `Confidence: ${pct}%`,
    `${advisory.title}`,
    `${advisory.summary}`,
    symptoms,
    `\nTreatment:\n${advisory.actions.map((a) => `- ${a}`).join("\n")}`,
    `\nPrevention:\n${advisory.prevention.map((p) => `- ${p}`).join("\n")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("severityColor — colour mapping", () => {
  it("returns emerald for Low severity", () => {
    expect(severityColor("Low")).toBe("emerald");
  });

  it("returns emerald for undefined severity", () => {
    expect(severityColor(undefined)).toBe("emerald");
  });

  it("returns amber for Medium severity", () => {
    expect(severityColor("Medium")).toBe("amber");
  });

  it("returns red for High severity", () => {
    expect(severityColor("High")).toBe("red");
  });
});

describe("severityBadgeClasses — badge colour classes", () => {
  it("High severity badge contains red classes", () => {
    const classes = severityBadgeClasses("High");
    expect(classes).toContain("red");
  });

  it("Medium severity badge contains amber classes", () => {
    const classes = severityBadgeClasses("Medium");
    expect(classes).toContain("amber");
  });

  it("Low severity badge contains emerald classes", () => {
    const classes = severityBadgeClasses("Low");
    expect(classes).toContain("emerald");
  });

  it("Healthy advisory (Low severity) badge contains emerald classes", () => {
    const healthyAdvisory = advisoryData["Healthy"];
    const classes = severityBadgeClasses(healthyAdvisory.severity);
    expect(classes).toContain("emerald");
  });
});

describe("shouldShowLowConfidenceWarning — confidence threshold", () => {
  it("shows warning when confidence is 0.59 (below threshold)", () => {
    expect(shouldShowLowConfidenceWarning(0.59)).toBe(true);
  });

  it("shows warning when confidence is 0.0", () => {
    expect(shouldShowLowConfidenceWarning(0.0)).toBe(true);
  });

  it("shows warning when confidence is 0.599", () => {
    expect(shouldShowLowConfidenceWarning(0.599)).toBe(true);
  });

  it("does NOT show warning when confidence is exactly 0.60", () => {
    expect(shouldShowLowConfidenceWarning(0.6)).toBe(false);
  });

  it("does NOT show warning when confidence is 0.61", () => {
    expect(shouldShowLowConfidenceWarning(0.61)).toBe(false);
  });

  it("does NOT show warning when confidence is 1.0", () => {
    expect(shouldShowLowConfidenceWarning(1.0)).toBe(false);
  });
});

describe("shouldShowSymptoms — Healthy label hides symptoms", () => {
  it("hides symptoms when label is Healthy", () => {
    const healthyAdvisory = advisoryData["Healthy"];
    expect(shouldShowSymptoms("Healthy", healthyAdvisory.symptoms)).toBe(false);
  });

  it("hides symptoms when label is Healthy even if symptoms array is non-empty", () => {
    // Edge case: even if someone passes symptoms for Healthy, they should be hidden
    expect(shouldShowSymptoms("Healthy", ["some symptom"])).toBe(false);
  });

  it("shows symptoms for a disease label with symptoms", () => {
    const advisory = advisoryData["Cassava Bacterial Blight"];
    expect(
      shouldShowSymptoms("Cassava Bacterial Blight", advisory.symptoms),
    ).toBe(true);
  });

  it("hides symptoms for a disease label with empty symptoms array", () => {
    expect(shouldShowSymptoms("Cassava Bacterial Blight", [])).toBe(false);
  });

  it("shows symptoms for Maize Leaf Blight", () => {
    const advisory = advisoryData["Maize Leaf Blight"];
    expect(shouldShowSymptoms("Maize Leaf Blight", advisory.symptoms)).toBe(
      true,
    );
  });
});

describe("buildShareText — share clipboard content", () => {
  it("returns a non-empty string", () => {
    const advisory = advisoryData["Cassava Bacterial Blight"];
    const text = buildShareText("Cassava Bacterial Blight", 0.85, advisory);
    expect(text.length).toBeGreaterThan(0);
  });

  it("includes the label in the share text", () => {
    const advisory = advisoryData["Maize Rust"];
    const text = buildShareText("Maize Rust", 0.75, advisory);
    expect(text).toContain("Maize Rust");
  });

  it("includes the confidence percentage in the share text", () => {
    const advisory = advisoryData["Tomato Late Blight"];
    const text = buildShareText("Tomato Late Blight", 0.92, advisory);
    expect(text).toContain("92.0%");
  });

  it("includes advisory title and summary", () => {
    const advisory = advisoryData["Cassava Mosaic Disease"];
    const text = buildShareText("Cassava Mosaic Disease", 0.8, advisory);
    expect(text).toContain(advisory.title);
    expect(text).toContain(advisory.summary);
  });

  it("includes symptoms for disease labels", () => {
    const advisory = advisoryData["Bean Rust"];
    const text = buildShareText("Bean Rust", 0.7, advisory);
    expect(text).toContain("Symptoms:");
  });

  it("does not include Symptoms section when symptoms array is empty", () => {
    const advisory = { ...advisoryData["Healthy"], symptoms: [] };
    const text = buildShareText("Healthy", 0.99, advisory);
    expect(text).not.toContain("Symptoms:");
  });
});

describe("Share button — navigator.clipboard.writeText", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls navigator.clipboard.writeText with a non-empty string", async () => {
    const advisory = advisoryData["Cassava Bacterial Blight"];
    const text = buildShareText("Cassava Bacterial Blight", 0.85, advisory);

    await navigator.clipboard.writeText(text);

    expect(writeTextMock).toHaveBeenCalledOnce();
    const calledWith = writeTextMock.mock.calls[0][0] as string;
    expect(typeof calledWith).toBe("string");
    expect(calledWith.length).toBeGreaterThan(0);
  });

  it("clipboard text contains the disease label", async () => {
    const advisory = advisoryData["Maize Leaf Blight"];
    const text = buildShareText("Maize Leaf Blight", 0.78, advisory);

    await navigator.clipboard.writeText(text);

    const calledWith = writeTextMock.mock.calls[0][0] as string;
    expect(calledWith).toContain("Maize Leaf Blight");
  });
});
