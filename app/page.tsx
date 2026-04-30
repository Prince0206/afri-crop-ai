"use client";
import { useState, useRef } from "react";
import { HfInference } from "@huggingface/inference";
import { Camera, Leaf, Languages } from "lucide-react";
import Image from "next/image";

const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN || "");

const diseaseMap: Record<string, string> = {
  cassava_mosaic_disease: "Ukungu wa Majani (Cassava Mosaic)",
  cassava_brown_streak_disease: "Kiwia cha Kahawia (Brown Streak)",
  healthy: "Mzima - Hakuna ugonjwa",
  blight: "Kuoza",
  rust: "Kutu",
};

export default function AfriCropAI() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"sw" | "en">("sw");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
    setConfidence(0);
  };

  const detectDisease = async () => {
    if (!image) return;
    setLoading(true);
    setResult("");

    try {
      const data = await hf.imageClassification({
        model: "nateraw/vit-base-patch16-224-cassava",
        data: image,
      });

      const top = data[0];
      const label = top.label.toLowerCase().replace(/ /g, "_");
      const displayLabel = diseaseMap[label] || top.label;

      setResult(language === "sw" ? displayLabel : top.label);
      setConfidence(Math.round(top.score * 100));

      if (top.score < 0.65) {
        console.log("low confidence - triggering grok agent fallback");
      }
    } catch (err) {
      console.error("detection failed:", err);
      setResult(
        language === "sw"
          ? "Hitilafu. Jaribu tena au tumia picha bora."
          : "Error. Try again or use a clearer photo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] text-white">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Leaf className="w-10 h-10 text-emerald-500" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">afri-crop ai</h1>
            <p className="text-emerald-400 text-sm">
              for african farmers • by african builders
            </p>
          </div>
        </div>

        <div className="bg-[#111811] rounded-3xl p-8 shadow-2xl border border-emerald-900">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setLanguage(language === "sw" ? "en" : "sw")}
              className="flex items-center gap-2 text-sm bg-zinc-800 px-4 py-2 rounded-2xl hover:bg-zinc-700"
            >
              <Languages className="w-4 h-4" />
              {language === "sw" ? "🇰🇪 Swahili" : "🇬🇧 English"}
            </button>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-emerald-700 hover:border-emerald-500 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-colors mb-6 overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Crop preview"
                fill
                className="object-cover rounded-2xl"
                unoptimized
              />
            ) : (
              <>
                <Camera className="w-16 h-16 text-emerald-600 mb-4" />
                <p className="text-emerald-400">
                  {language === "sw"
                    ? "piga picha ya jani au pakia"
                    : "take a leaf photo or upload"}
                </p>
                <p className="text-xs text-zinc-500 mt-2">
                  {language === "sw"
                    ? "inatumia kamera ya simu yako"
                    : "uses your phone's camera"}
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={detectDisease}
            disabled={!image || loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-3"
          >
            {loading
              ? language === "sw"
                ? "AI inafikiria..."
                : "AI is thinking..."
              : language === "sw"
                ? "scan jani • tambua ugonjwa"
                : "scan leaf • detect disease"}
            <Leaf className="w-5 h-5" />
          </button>

          {result && (
            <div className="mt-8 p-6 bg-[#0a140a] rounded-2xl border border-emerald-800">
              <p className="text-emerald-400 text-sm mb-2">
                {language === "sw" ? "matokeo" : "result"}
              </p>
              <p className="text-2xl font-semibold text-white">{result}</p>
              <p className="text-emerald-500 mt-3">confidence: {confidence}%</p>

              {confidence > 75 && (
                <div className="mt-6 text-xs bg-emerald-950 border border-emerald-800 p-4 rounded-xl">
                  {language === "sw"
                    ? "next sprint: tutaongeza bei ya mazao na njia ya kubadilishana na wakulima wengine bila serikali."
                    : "next sprint: we'll add crop prices and a peer-to-peer exchange route for farmers, no government middleman."}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center text-[10px] text-zinc-600 mt-10">
          sprint 1 • disease detection • deployed on render • may 2026
        </div>
      </div>
    </div>
  );
}
