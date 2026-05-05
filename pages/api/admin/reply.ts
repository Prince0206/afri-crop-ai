import { requireExpertAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  await requireExpertAuth(req, res);
  const { conversationId, content } = req.body;

  const msg = await prisma.chatMessage.create({
    data: { conversationId, sender: "expert", content },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { status: "open", lastMessageAt: new Date().toISOString() },
  });

  // Optional: push notify the user via FCM / WhatsApp
  res.json(msg);
}
