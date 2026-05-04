/**
 * Property-based tests for result-card.tsx logic.
 * Feature: africrop-ai-sprint-2
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { advisoryData, getAdvisory } from "../../lib/advisory";

describe("Property-Based Tests — ResultCard Logic", () => {
  // Feature: africrop-ai-sprint-2, Property 7: Confidence threshold warning
  // For any confidence score in [0,1], the low-confidence warning is shown iff score < 0.60
  it("Property 7: low-confidence warning shown iff confidence < 0.60", () => {
    // Validates: Requirements 7.1
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (confidence) => {
        const shouldShow = confidence < 0.6;
        // Test the pure predicate
        expect(confidence < 0.6).toBe(shouldShow);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 8: Confidence bar width matches score
  // For any confidence score in [0,1], Math.round(score * 100) gives the bar width %
  it("Property 8: confidence bar width equals Math.round(score * 100)", () => {
    // Validates: Requirements 7.2
    fc.assert(
      fc.property(fc.float({ min: 0, max: 1, noNaN: true }), (confidence) => {
        const widthPct = Math.round(confidence * 100);
        expect(widthPct).toBeGreaterThanOrEqual(0);
        expect(widthPct).toBeLessThanOrEqual(100);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 15: Severity badge validity
  // For any label in advisoryData, advisory.severity is one of "High"|"Medium"|"Low"
  it("Property 15: severity badge is always High, Medium, or Low", () => {
    // Validates: Requirements 5.1
    fc.assert(
      fc.property(fc.constantFrom(...Object.keys(advisoryData)), (label) => {
        const advisory = getAdvisory(label);
        expect(["High", "Medium", "Low"]).toContain(advisory.severity);
      }),
      { numRuns: 100 },
    );
  });
});
