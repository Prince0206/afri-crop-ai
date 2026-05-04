import { describe, it, expect } from "vitest";
import {
  advisoryData,
  getAdvisory,
  DEFAULT_ADVISORY,
} from "../../lib/advisory";

const REQUIRED_LABELS = [
  "Cassava Bacterial Blight",
  "Cassava Brown Streak Disease",
  "Cassava Green Mottle",
  "Cassava Mosaic Disease",
  "Maize Leaf Blight",
  "Maize Gray Leaf Spot",
  "Maize Rust",
  "Maize Stalk Rot",
  "Bean Angular Leaf Spot",
  "Bean Rust",
  "Tomato Early Blight",
  "Tomato Late Blight",
  "Healthy",
];

describe("advisoryData completeness", () => {
  it("contains all 13 required disease labels", () => {
    REQUIRED_LABELS.forEach((label) => {
      expect(advisoryData).toHaveProperty(label);
    });
  });
});

describe("getAdvisory — known labels", () => {
  it("returns the correct advisory for a known label", () => {
    const advisory = getAdvisory("Cassava Bacterial Blight");
    expect(advisory.title).toBe("Cassava Bacterial Blight");
  });

  it("returns the correct advisory for Maize Leaf Blight", () => {
    const advisory = getAdvisory("Maize Leaf Blight");
    expect(advisory.title).toBe("Maize Leaf Blight");
  });

  it("returns the correct advisory for Tomato Late Blight", () => {
    const advisory = getAdvisory("Tomato Late Blight");
    expect(advisory.title).toBe("Tomato Late Blight");
  });
});

describe("getAdvisory — unknown labels", () => {
  it("returns DEFAULT_ADVISORY for an unrecognised label", () => {
    const advisory = getAdvisory("Completely Unknown Disease XYZ");
    expect(advisory).not.toBeNull();
    expect(advisory).not.toBeUndefined();
    expect(advisory).toBe(DEFAULT_ADVISORY);
  });

  it("returns DEFAULT_ADVISORY for an empty string", () => {
    const advisory = getAdvisory("");
    expect(advisory).toBe(DEFAULT_ADVISORY);
  });
});

describe("getAdvisory — locale sw", () => {
  it("returns Swahili title for a known label when locale is sw", () => {
    const advisory = getAdvisory("Cassava Bacterial Blight", "sw");
    expect(advisory.title).toBe("Ugonjwa wa Bakteria wa Muhogo");
  });

  it("returns Swahili title for Maize Rust when locale is sw", () => {
    const advisory = getAdvisory("Maize Rust", "sw");
    expect(advisory.title).toBe("Kutu ya Mahindi");
  });

  it("returns DEFAULT_ADVISORY (non-null) for unknown label with locale sw", () => {
    const advisory = getAdvisory("Not A Real Disease", "sw");
    expect(advisory).not.toBeNull();
    expect(advisory).not.toBeUndefined();
  });

  it("does not mutate the original advisory when returning sw locale", () => {
    const original = advisoryData["Cassava Bacterial Blight"];
    const originalTitle = original.title;
    getAdvisory("Cassava Bacterial Blight", "sw");
    expect(original.title).toBe(originalTitle);
  });
});

describe("advisory data structural integrity", () => {
  const diseaseLabels = REQUIRED_LABELS.filter((l) => l !== "Healthy");

  it("every non-Healthy advisory has symptoms.length >= 2", () => {
    diseaseLabels.forEach((label) => {
      const advisory = advisoryData[label];
      expect(advisory.symptoms.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("every advisory has actions.length >= 2", () => {
    REQUIRED_LABELS.forEach((label) => {
      const advisory = advisoryData[label];
      expect(advisory.actions.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("every advisory has prevention.length >= 2", () => {
    REQUIRED_LABELS.forEach((label) => {
      const advisory = advisoryData[label];
      expect(advisory.prevention.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("every advisory has a non-empty title and summary", () => {
    REQUIRED_LABELS.forEach((label) => {
      const advisory = advisoryData[label];
      expect(advisory.title.length).toBeGreaterThan(0);
      expect(advisory.summary.length).toBeGreaterThan(0);
    });
  });

  it("every advisory has a valid severity value", () => {
    REQUIRED_LABELS.forEach((label) => {
      const advisory = advisoryData[label];
      expect(["High", "Medium", "Low"]).toContain(advisory.severity);
    });
  });
});
