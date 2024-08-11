import { NextResponse } from "next/server";
import { createCanvas } from "canvas";
import { SelectedEffect, SkillType } from "@/components/types";

export async function POST(request: Request) {
  try {
    const {
      skillType,
      effects,
    }: { skillType: SkillType; effects: SelectedEffect[] } =
      await request.json();
    console.log("Received skillType:", skillType);
    console.log("Received effects:", effects);

    // フォントサイズと行間の設定
    const fontSize = 16;
    const lineHeight = 1.5;
    const canvasPadding = 20;

    // 高さを自動調整するための計算
    const canvasWidth = 500;
    const textHeight = fontSize * lineHeight * (effects.length + 1);
    const canvasHeight = canvasPadding * 2 + textHeight;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    // 背景色の設定
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // フォントの設定
    ctx.font = `${fontSize}px 'Noto Sans JP', sans-serif`; // Noto Sans JPを指定
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";

    // テキストの描画
    ctx.fillText(`${skillType}:`, canvasPadding, canvasPadding);

    effects.forEach((item: SelectedEffect, index: number) => {
      let effectText = `• ${item.effect}`;
      if (item.turns !== undefined) {
        effectText +=
          item.turns === "完全解除" ? " (完全解除)" : ` (${item.turns}ターン)`;
      }
      console.log(`Drawing: ${effectText}`);
      ctx.fillText(
        effectText,
        canvasPadding,
        canvasPadding + fontSize * lineHeight * (index + 1)
      );
    });

    const imageData = canvas.toDataURL("image/png");
    console.log("Image generated successfully");

    return NextResponse.json({ imageUrl: imageData });
  } catch (error) {
    console.error("Detailed error in GenerateImage:", error);
    return NextResponse.json(
      {
        error:
          "Error generating image: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
