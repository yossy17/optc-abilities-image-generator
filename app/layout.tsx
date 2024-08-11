import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/public/Styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
