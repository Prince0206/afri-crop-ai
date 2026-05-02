import { HfInference } from "@huggingface/inference";
import { cassavaLabels } from "./labels";

const hf = new HfInference(process.env.HF_TOKEN);

const MODEL_ID = "nateraw/vit-base-beans";

export interface PredictionResult {
  label_en: string;
  label_sw: string;
  confidence: number;
  class_id: number;
}

export async function classifyCassava(
  imageBuffer: Buffer,
): Promise<PredictionResult[]> {
  const results = await hf.imageClassification({
    model: MODEL_ID,
    data: new Blob([imageBuffer]),
  });

  return results.map((r) => {
    const classId = parseInt(r.label.split("_").pop() ?? "4", 10);
    const labels = cassavaLabels[classId] ?? cassavaLabels[4];
    return {
      label_en: labels.en,
      label_sw: labels.sw,
      confidence: Math.round(r.score * 1000) / 1000,
      class_id: classId,
    };
  });
}
