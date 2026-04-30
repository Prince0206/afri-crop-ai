import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AfriCrop AI",
  description: "AI-powered crop advisory for African subsistence farmers",
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
