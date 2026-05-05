import { prisma } from "@/lib/prisma";
import { requireExpertAuth } from "@/lib/auth";

export default async function handler(req, res) {
  await requireExpertAuth(req, res);
  const convos = await prisma.conversation.findMany({
    where: { status: { in: ["open", "awaiting_expert"] } },
    orderBy: { lastMessageAt: "desc" },
    include: { messages: { take: 1, orderBy: { createdAt: "desc" } } },
  });
  res.json(convos);
}
