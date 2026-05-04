import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  advisoryData,
  getAdvisory,
  DEFAULT_ADVISORY,
  Advisory,
} from "../../lib/advisory";

const allLabels = Object.keys(advisoryData);
const diseaseLabels = allLabels.filter((l) => l !== "Healthy");

// Arbitrary that generates a valid Advisory object for Property 2
const advisoryArb: fc.Arbitrary<Advisory> = fc.record({
  title: fc.string({ minLength: 1 }),
  summary: fc.string({ minLength: 1 }),
  symptoms: fc.array(fc.string({ minLength: 1 })),
  actions: fc.array(fc.string({ minLength: 1 })),
  prevention: fc.array(fc.string({ minLength: 1 })),
  titleSw: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  summarySw: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  symptomsSw: fc.option(fc.array(fc.string({ minLength: 1 })), {
    nil: undefined,
  }),
  actionsSw: fc.option(fc.array(fc.string({ minLength: 1 })), {
    nil: undefined,
  }),
  preventionSw: fc.option(fc.array(fc.string({ minLength: 1 })), {
    nil: undefined,
  }),
  severity: fc.constantFrom("High" as const, "Medium" as const, "Low" as const),
});

describe("Property-Based Tests — Advisory Engine", () => {
  // Feature: africrop-ai-sprint-2, Property 1: Advisory structural completeness
  it("Property 1: getAdvisory returns structurally complete advisory for any known label", () => {
    // Validates: Requirements 1.2
    fc.assert(
      fc.property(fc.constantFrom(...allLabels), (label) => {
        const advisory = getAdvisory(label);

        // title and summary must be non-empty strings
        expect(typeof advisory.title).toBe("string");
        expect(advisory.title.length).toBeGreaterThan(0);
        expect(typeof advisory.summary).toBe("string");
        expect(advisory.summary.length).toBeGreaterThan(0);

        // actions and prevention must have at least 2 items for all entries
        expect(advisory.actions.length).toBeGreaterThanOrEqual(2);
        expect(advisory.prevention.length).toBeGreaterThanOrEqual(2);

        // symptoms must have at least 2 items for non-Healthy entries
        if (label !== "Healthy") {
          expect(advisory.symptoms.length).toBeGreaterThanOrEqual(2);
        }
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 2: Advisory serialisation round-trip
  it("Property 2: JSON serialisation round-trip produces deeply equal Advisory", () => {
    // Validates: Requirements 1.6
    fc.assert(
      fc.property(advisoryArb, (advisory) => {
        const serialised = JSON.stringify(advisory);
        const deserialised = JSON.parse(serialised) as Advisory;
        expect(deserialised).toEqual(advisory);
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 3: Unknown label returns non-null default
  it("Property 3: getAdvisory returns non-null Advisory for any unknown label", () => {
    // Validates: Requirements 1.3
    fc.assert(
      fc.property(fc.string(), (label) => {
        // Only test labels that are NOT in advisoryData
        if (allLabels.includes(label)) return;

        const advisory = getAdvisory(label);
        expect(advisory).not.toBeNull();
        expect(advisory).not.toBeUndefined();
        expect(typeof advisory.title).toBe("string");
        expect(typeof advisory.summary).toBe("string");
      }),
      { numRuns: 100 },
    );
  });

  // Feature: africrop-ai-sprint-2, Property 5: Swahili advisory field completeness
  it("Property 5: every disease advisory record has complete Swahili fields", () => {
    // Validates: Requirements 3.3
    fc.assert(
      fc.property(fc.constantFrom(...diseaseLabels), (label) => {
        const advisory = advisoryData[label];

        // titleSw must be non-empty
        expect(advisory.titleSw).toBeDefined();
        expect(typeof advisory.titleSw).toBe("string");
        expect((advisory.titleSw as string).length).toBeGreaterThan(0);

        // summarySw must be non-empty
        expect(advisory.summarySw).toBeDefined();
        expect(typeof advisory.summarySw).toBe("string");
        expect((advisory.summarySw as string).length).toBeGreaterThan(0);

        // symptomsSw must have at least 2 items
        expect(advisory.symptomsSw).toBeDefined();
        expect(Array.isArray(advisory.symptomsSw)).toBe(true);
        expect((advisory.symptomsSw as string[]).length).toBeGreaterThanOrEqual(
          2,
        );

        // actionsSw must have at least 2 items
        expect(advisory.actionsSw).toBeDefined();
        expect(Array.isArray(advisory.actionsSw)).toBe(true);
        expect((advisory.actionsSw as string[]).length).toBeGreaterThanOrEqual(
          2,
        );

        // preventionSw must have at least 2 items
        expect(advisory.preventionSw).toBeDefined();
        expect(Array.isArray(advisory.preventionSw)).toBe(true);
        expect(
          (advisory.preventionSw as string[]).length,
        ).toBeGreaterThanOrEqual(2);
      }),
      { numRuns: 100 },
    );
  });
});
