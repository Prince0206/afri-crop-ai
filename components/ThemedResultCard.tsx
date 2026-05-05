"use client";
import { useCropTheme } from "@/lib/useCropTheme";

export default function ThemedResultCard({
  data,
  crop,
}: {
  data: any;
  crop: string;
}) {
  const theme = useCropTheme(crop);

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${theme.gradient[0]}, ${theme.gradient[1]})`,
      }}
      className="p-6 rounded-2xl shadow-lg mb-4 flex flex-col animate-fade-up"
    >
      <div className="flex gap-4 items-center mb-3">
        <div className="w-20 h-20 flex items-center justify-center text-5xl">
          {theme.icon}
        </div>
        <h2 className="text-2xl font-bold" style={{ color: theme.primary }}>
          {data.title}
        </h2>
      </div>
      <p className="text-gray-700 mb-3">{data.summary}</p>
      <ul className="text-gray-800 list-disc pl-5">
        {data.actions.map((a: string, i: number) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}
