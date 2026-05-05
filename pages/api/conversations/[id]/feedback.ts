// pages/api/conversations/[id]/feedback.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();
  const { id } = req.query;
  const { rating, feedback, helpful } = req.body;

  const updated = await db.conversation.update({
    where: { id: id as string },
    data: { rating, feedback, helpful, status: "resolved" },
  });

  // Bump expert's avg rating
  if (updated.expertId) {
    await recalcExpertRating(updated.expertId);
  }

  res.json({ ok: true });
}

async function recalcExpertRating(expertId: string) {
  const ratings = await db.conversation.findMany({
    where: { expertId, rating: { not: null } },
    select: { rating: true },
  });
  const avg =
    ratings.reduce((s, r) => s + (r.rating || 0), 0) / (ratings.length || 1);
  await db.expert.update({
    where: { id: expertId },
    data: { avgRating: avg, totalReviews: ratings.length },
  });
}
