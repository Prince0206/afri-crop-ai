export interface ScanRecord {
  id: string;
  imageDataUrl: string;
  label: string;
  labelSw: string;
  confidence: number;
  timestamp: number;
}

const STORAGE_KEY = "africrop-scan-history";
const MAX_RECORDS = 50;

export function saveScan(record: ScanRecord): void {
  const history = getHistory();
  history.unshift(record);
  if (history.length > MAX_RECORDS) history.length = MAX_RECORDS;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getHistory(): ScanRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScanRecord[]) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}
