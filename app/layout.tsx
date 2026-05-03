import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfriCrop AI",
  description: "AI-powered crop advisory for African subsistence farmers",
  manifest: "/manifest.json",
  themeColor: "#059669",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AfriCrop AI",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
