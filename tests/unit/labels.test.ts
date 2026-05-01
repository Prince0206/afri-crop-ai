import { describe, it, expect } from "vitest";
import { cassavaLabels } from "../../lib/labels";

describe("cassavaLabels", () => {
  it("contains all 5 classes", () => {
    expect(Object.keys(cassavaLabels)).toHaveLength(5);
  });

  it("every entry has en and sw keys", () => {
    Object.values(cassavaLabels).forEach((label) => {
      expect(label).toHaveProperty("en");
      expect(label).toHaveProperty("sw");
      expect(label.en.length).toBeGreaterThan(0);
      expect(label.sw.length).toBeGreaterThan(0);
    });
  });

  it("class 4 is healthy", () => {
    expect(cassavaLabels[4].en).toBe("Healthy");
    expect(cassavaLabels[4].sw).toBe("Mzima");
  });
});
