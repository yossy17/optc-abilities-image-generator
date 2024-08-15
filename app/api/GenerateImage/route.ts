// app/api/GenerateImage/route.ts
import { NextResponse } from "next/server";
import { createCanvas, registerFont, loadImage } from "canvas";
import { SelectedEffect } from "@/components/types";
import path from "path";
import fs from "fs/promises";

// フォントの登録
registerFont(
  path.join(process.cwd(), "public", "Fonts", "NotoSansJP-Bold.ttf"),
  { family: "NotoSansJP-Bold" }
);

export async function POST(request: Request) {
  try {
    const { title, effects }: { title: string; effects: SelectedEffect[] } =
      await request.json();

    console.log("Received title:", title);
    console.log("Received effects:", effects);
    console.log(
      "Received effects with full details:",
      JSON.stringify(effects, null, 2)
    );

    const titleFontSize = 18;
    const effectFontSize = 14;
    const canvasPadding = 30;
    const maxTitleWidth = 350;
    const iconSize = 20;
    const iconMargin = 5;

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

    // 背景のグラデーション
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
    ctx.fillStyle = "#4a1a06";

    let titleY = canvasPadding;
    lines.forEach((line) => {
      ctx.fillText(line, canvasWidth / 2, titleY);
      titleY += titleFontSize * 1.5;
    });

    // 効果の描画
    ctx.font = `${effectFontSize}px 'NotoSansJP-Bold', sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#4a1a06";

    for (let i = 0; i < effects.length; i++) {
      const item = effects[i];
      const y =
        canvasPadding +
        titleHeight +
        20 +
        (effectFontSize + iconMargin) * 1.5 * i;

      if (item.imageUrl) {
        try {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "Images",
            "Icon",
            item.imageUrl
          );
          console.log("Attempting to load image from path:", imagePath);

          const imageBuffer = await fs.readFile(imagePath);
          const image = await loadImage(imageBuffer);

          console.log("Image loaded successfully:", imagePath);

          ctx.drawImage(
            image,
            canvasPadding + 10,
            y - iconSize / 2,
            iconSize,
            iconSize
          );
        } catch (error) {
          console.error(
            `画像の読み込みに失敗しました: ${item.imageUrl}`,
            error
          );
          if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
          }
        }
      } else {
        console.log("No imageUrl for effect:", item.effect);
      }

      let effectText = `${item.effect}`;
      if (item.turns !== undefined) {
        effectText += ` (${item.turns}T)`;
      }
      ctx.fillText(effectText, canvasPadding + 10 + iconSize + iconMargin, y);
    }

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
