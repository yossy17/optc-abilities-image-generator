// app\layout.tsx
import type { Metadata } from "next";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts";
import "@/public/Styles/globals.css";

export const metadata: Metadata = {
  title: "スキル画像ジェネレーター",
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
