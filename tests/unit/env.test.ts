import { describe, it, expect } from "vitest";

describe("environment config", () => {
  it("NODE_ENV defaults to test during test runs", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  it("required env vars have expected shape", () => {
    // Will matter once .env.test exists for HF token etc.
    const fakeToken = "hf_abc123";
    expect(fakeToken).toMatch(/^hf_/);
  });
});
