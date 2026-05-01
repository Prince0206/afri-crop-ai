import { NextRequest, NextResponse } from "next/server";
import { classifyCassava } from "@/lib/classify";
import sharp from "sharp";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    const contentLength = parseInt(
      req.headers.get("content-length") ?? "0",
      10,
    );
    if (contentLength > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image exceeds 5 MB limit" },
        { status: 413 },
      );
    }

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Missing or invalid image file" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = await sharp(Buffer.from(arrayBuffer))
      .resize(224, 224, { fit: "cover" })
      .jpeg({ quality: 85 })
      .toBuffer();

    const predictions = await classifyCassava(buffer);

    return NextResponse.json({
      predictions,
      model: "nateraw/vit-base-beans",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Inference failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
