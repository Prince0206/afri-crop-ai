// pages/api/conversations/[id]/reply.ts (additions)
import { notifyFarmer } from "@/lib/notifications";

// ...after saving expert response:
await notifyFarmer({
  fcmToken: conversation.notificationToken,
  phoneNumber: conversation.phoneNumber,
  message: expertResponse,
  conversationId: conversation.id,
});
