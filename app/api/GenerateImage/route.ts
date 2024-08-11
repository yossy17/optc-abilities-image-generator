import { NextResponse } from "next/server";
import { createCanvas } from "canvas";
import { SelectedEffect, SkillType } from "@/components/types";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const {
      skillType,
      effects,
    }: { skillType: SkillType; effects: SelectedEffect[] } =
      await request.json();
    console.log("Received skillType:", skillType);
    console.log("Received effects:", effects);

    const fontSize = 16;
    const lineHeight = 1.5;
    const canvasPadding = 20;
    const canvasWidth = 500;
    const textHeight = fontSize * lineHeight * (effects.length + 1);
    const canvasHeight = canvasPadding * 2 + textHeight;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, canvasPadding, canvasWidth, textHeight);

    ctx.font = `${fontSize}px 'Noto Sans JP', sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";

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

    const imagesDir = path.join(process.cwd(), "public", "images");

    // ディレクトリが存在しない場合に作成
    await mkdir(imagesDir, { recursive: true });

    const imagePath = path.join(imagesDir, `image_${Date.now()}.png`);
    await writeFile(imagePath, canvas.toBuffer());

    const imageUrl = `/images/${path.basename(imagePath)}`;
    console.log("Image generated successfully");

    // 5分後に画像を削除するタスクを設定
    setTimeout(
      async () => {
        try {
          await unlink(imagePath);
          console.log("Image deleted successfully");
        } catch (err) {
          console.error("Error deleting image:", err);
        }
      },
      5 * 60 * 1000
    ); // 5分後

    return NextResponse.json({ imageUrl });
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
