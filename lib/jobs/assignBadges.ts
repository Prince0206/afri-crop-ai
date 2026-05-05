// lib/jobs/assignBadges.ts
import { prisma } from "@/lib/prisma";

export async function assignBadges() {
  const experts = await prisma.expert.findMany();
  for (const e of experts) {
    const badges: string[] = [];
    if (e.verified) badges.push("verified");
    if (e.avgRating >= 4.5 && e.totalReviews >= 10) badges.push("top_rated");
    if (e.avgResponseMinutes && e.avgResponseMinutes < 30)
      badges.push("fast_responder");
    await prisma.expert.update({ where: { id: e.id }, data: { badges } });
  }
}
