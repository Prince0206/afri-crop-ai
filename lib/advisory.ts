// lib/advisory.ts
import { set, get } from "idb-keyval";

export interface Advisory {
  title: string;
  summary: string;
  actions: string[];
  prevention: string[];
}

const advisoryData: Record<string, Advisory> = {
  Maize_leaf_blight: {
    title: "Maize Leaf Blight",
    summary: "A fungal disease causing elongated tan spots.",
    actions: [
      "Destroy infected residue after harvest.",
      "Apply Mancozeb fungicide at first symptoms.",
    ],
    prevention: ["Rotate crops two seasons.", "Avoid overhead irrigation."],
  },
  Tomato_early_blight: {
    title: "Tomato Early Blight",
    summary: "Concentric rings on leaves caused by Alternaria solani.",
    actions: ["Prune infected leaves.", "Use Copper sprays weekly."],
    prevention: [
      "Stake tomatoes to avoid soil contact.",
      "Improve air circulation around plants.",
    ],
  },
};

// Key used for caching in IndexedDB
const CACHE_KEY = "advisory_cache_v1";

/** Initialize or refresh the local cache once per session. */
export async function cacheAdvisoryData() {
  const existing = await get(CACHE_KEY);
  if (!existing) await set(CACHE_KEY, advisoryData);
}

/** Retrieve an advisory, even if offline. */
export async function getAdvisory(label: string): Promise<Advisory | null> {
  const cache = (await get(CACHE_KEY)) || advisoryData;
  return cache[label] ?? null;
}
