// lib/history.ts

export interface ScanRecord {
  id: string;
  imageDataUrl: string;
  label: string;
  labelSw: string;
  confidence: number;
  timestamp: number;
}

const STORAGE_KEY = "africrop-history";
const MAX_RECORDS = 50;

export function getHistory(): ScanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScanRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveScan(record: ScanRecord): void {
  const history = [record, ...getHistory()].slice(0, MAX_RECORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
