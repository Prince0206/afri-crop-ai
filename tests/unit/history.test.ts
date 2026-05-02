import { describe, it, expect, beforeEach } from "vitest";
import { saveScan, getHistory, clearHistory, ScanRecord } from "@/lib/history";

function makeScan(overrides: Partial<ScanRecord> = {}): ScanRecord {
  return {
    id: crypto.randomUUID(),
    imageDataUrl: "data:image/png;base64,abc",
    label: "Healthy",
    labelSw: "Afya njema",
    confidence: 0.95,
    timestamp: Date.now(),
    ...overrides,
  };
}

describe("scan history", () => {
  beforeEach(() => clearHistory());

  it("starts empty", () => {
    expect(getHistory()).toEqual([]);
  });

  it("saves and retrieves a scan", () => {
    const scan = makeScan();
    saveScan(scan);
    const history = getHistory();
    expect(history).toHaveLength(1);
    expect(history[0].label).toBe("Healthy");
  });

  it("newest scan appears first", () => {
    saveScan(makeScan({ label: "Old" }));
    saveScan(makeScan({ label: "New" }));
    expect(getHistory()[0].label).toBe("New");
  });

  it("caps at 50 records", () => {
    for (let i = 0; i < 55; i++) saveScan(makeScan());
    expect(getHistory()).toHaveLength(50);
  });

  it("clearHistory empties storage", () => {
    saveScan(makeScan());
    clearHistory();
    expect(getHistory()).toEqual([]);
  });
});
