// lib/notifications.ts
import twilio from "twilio";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_KEY!),
    ),
  });
}

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!,
);

export async function notifyFarmer(opts: {
  fcmToken?: string;
  phoneNumber?: string;
  message: string;
  conversationId: string;
}) {
  const { fcmToken, phoneNumber, message, conversationId } = opts;
  const deepLink = `${process.env.APP_URL}/history/${conversationId}`;

  // Try push first
  if (fcmToken) {
    try {
      await admin.messaging().send({
        token: fcmToken,
        notification: {
          title: "Expert replied to your scan",
          body: message.slice(0, 100),
        },
        data: { conversationId, deepLink },
      });
      return { channel: "push" };
    } catch (err) {
      console.warn("FCM failed, falling back to SMS", err);
    }
  }

  // SMS fallback
  if (phoneNumber) {
    await twilioClient.messages.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE!,
      body: `🌱 An expert replied to your crop scan. View: ${deepLink}`,
    });
    return { channel: "sms" };
  }

  throw new Error("No notification channel available");
}
