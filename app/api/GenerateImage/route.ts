// app/api/GenerateImage/route.ts
import { NextResponse } from "next/server";
import { createCanvas, registerFont } from "canvas";
import { SelectedEffect } from "@/components/types";
import path from "path";

// フォントの登録
registerFont(
  path.join(process.cwd(), "public", "Fonts", "NotoSansJP-Bold.ttf"),
  { family: "NotoSansJP-Bold" }
);

export async function POST(request: Request) {
  try {
    const { title, effects }: { title: string; effects: SelectedEffect[] } =
      await request.json();

    const titleFontSize = 18; // タイトルのフォントサイズを少し大きく
    const effectFontSize = 14; // 効果テキストのフォントサイズを調整
    const canvasPadding = 30; // キャンバスの余白を少し広げる
    const maxTitleWidth = 350;

    const tempCanvas = createCanvas(1, 1);
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `${titleFontSize}px 'NotoSansJP-Bold', sans-serif`;

    const lines = title.split("\n");
    let titleWidth = 0;
    let titleHeight = 0;

    lines.forEach((line) => {
      const lineWidth = tempCtx.measureText(line).width;
      titleWidth = Math.max(titleWidth, lineWidth);
      titleHeight += titleFontSize * 1.5;
    });

    const canvasWidth = Math.max(titleWidth + canvasPadding * 2, maxTitleWidth);
    const textHeight =
      effectFontSize * 1.5 * (effects.length + 1) + titleHeight;
    const canvasHeight = canvasPadding * 2 + textHeight;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("キャンバスコンテキストの取得に失敗しました");
    }

    // 改良した背景のグラデーション
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, "#e0ba7b");
    gradient.addColorStop(1, "#c8985e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 枠線を描画
    ctx.strokeStyle = "#9e6b20";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, canvasWidth - 20, canvasHeight - 20);

    // タイトルの描画
    ctx.font = `${titleFontSize}px 'NotoSansJP-Bold', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#4a1a06"; // テキストカラーを少し明るく

    let titleY = canvasPadding;
    lines.forEach((line) => {
      ctx.fillText(line, canvasWidth / 2, titleY);
      titleY += titleFontSize * 1.5;
    });

    // 効果の描画
    ctx.font = `${effectFontSize}px 'NotoSansJP-Bold', sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#4a1a06"; // テキストカラーを少し明るく

    effects.forEach((item: SelectedEffect, index: number) => {
      let effectText = `${item.effect}`;
      if (item.turns !== undefined) {
        effectText += item.turns === "∞" ? " (∞)" : ` (${item.turns}ターン)`;
      }
      ctx.fillText(
        effectText,
        canvasPadding + 10,
        canvasPadding + titleHeight + 20 + effectFontSize * 1.5 * index
      );
    });

    const imageData = canvas.toDataURL("image/png");
    console.log("画像が正常に生成されました");

    return NextResponse.json({ imageData });
  } catch (error) {
    console.error("GenerateImageでのエラー詳細:", error);
    return NextResponse.json(
      {
        error:
          "画像生成中のエラー: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
