// app/api/generate-image/route.ts
import { NextResponse } from "next/server";
import { createCanvas } from "canvas"; // registerFont を削除
import path from "path";

// 必要な型定義をインポートまたはインラインで定義
type SkillType = "必殺技" | "船長効果";

interface SelectedEffect {
  category: string;
  effect: string;
  turns?: number;
}

export async function POST(request: Request) {
  try {
    const {
      skillType,
      effects,
    }: { skillType: SkillType; effects: SelectedEffect[] } =
      await request.json();
    console.log("Received skillType:", skillType);
    console.log("Received effects:", effects);

    const canvas = createCanvas(300, 200);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, 300, 200);

    ctx.font = "16px sans-serif"; // フォント指定をデフォルトに変更
    ctx.fillStyle = "#000000";
    ctx.fillText(`${skillType}:`, 10, 30);
    effects.forEach((item: SelectedEffect, index: number) => {
      let effectText = `• ${item.effect}`;
      if (item.turns !== undefined) {
        effectText += ` (${item.turns}ターン)`;
      }
      console.log(`Drawing: ${effectText}`);
      ctx.fillText(effectText, 20, 55 + index * 25);
    });

    const imageData = canvas.toDataURL("image/png");
    console.log("Image generated successfully");

    return NextResponse.json({ imageUrl: imageData });
  } catch (error) {
    console.error("Detailed error in generate-image:", error);
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
