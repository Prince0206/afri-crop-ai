// pages/api/conversations/[id]/reply.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // adjust import if your prisma client lives elsewhere
import { notifyFarmer } from "@/lib/notifications";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const { expertResponse } = req.body;

    // Fetch the conversation from DB
    const conversation = await prisma.conversation.findUnique({
      where: { id: String(id) },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // ...after saving expert response (you may want to persist expertResponse here too)
    await notifyFarmer({
      fcmToken: conversation.notificationToken,
      phoneNumber: conversation.phoneNumber,
      message: expertResponse,
      conversationId: conversation.id,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
