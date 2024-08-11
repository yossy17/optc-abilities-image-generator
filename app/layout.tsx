// app\layout.tsx
import type { Metadata } from "next";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts";
import "@/public/Styles/app.css";

export const metadata: Metadata = {
  title: "OPTC Abilities Image Generator",
  description: "ゲームのスキル性能を画像として生成するアプリケーション",
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
