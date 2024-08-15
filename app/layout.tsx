// app/layout.tsx
import type { Metadata } from "next";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts";
import "@/public/Styles/app.css";

export const metadata: Metadata = {
  title: "OPTC Gimmick List Generator",
  description: "トレクルのギミック表を画像として生成するします。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${PixelMplus10Regular.className}`}>{children}</body>
    </html>
  );
}
