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

    const settings = {
      titleFontSize: 16,
      effectFontSize: 12,
      canvasPadding: 30,
      maxTitleWidth: 300,
      iconSize: 16,
      iconMargin: 3,
      borderWidth: 2,
      gradientStart: "#e0ba7b",
      gradientEnd: "#c8985e",
      borderColor: "#9e6b20",
      textColor: "#4a1a06",
      bottomMargin: 30, // 下部の余白は維持
    };

    const {
      titleFontSize,
      effectFontSize,
      canvasPadding,
      maxTitleWidth,
      iconSize,
      iconMargin,
      borderWidth,
      gradientStart,
      gradientEnd,
      borderColor,
      textColor,
      bottomMargin,
    } = settings;

    // タイトルのサイズ計算
    const tempCanvas = createCanvas(1, 1);
    const tempCtx = tempCanvas.getContext("2d");
    tempCtx.font = `${titleFontSize}px 'NotoSansJP-Bold', sans-serif`;

    const lines = title.split("\n");
    let titleWidth = 0;
    let titleHeight = 0;

    lines.forEach((line) => {
      const lineWidth = tempCtx.measureText(line).width;
      titleWidth = Math.max(titleWidth, lineWidth);
      titleHeight += titleFontSize * 1.2; // 行間
    });

    const textHeight = effectFontSize * 1.5 * effects.length + titleHeight;
    const canvasWidth = Math.max(titleWidth + canvasPadding * 2, maxTitleWidth);
    const canvasHeight = canvasPadding + textHeight + bottomMargin;

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("キャンバスコンテキストの取得に失敗しました");
    }

    // 背景のグラデーション
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 枠線を描画
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(5, 5, canvasWidth - 10, canvasHeight - 10);

    // タイトルの描画
    ctx.font = `${titleFontSize}px 'NotoSansJP-Bold', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = textColor;

    let titleY = canvasPadding;
    lines.forEach((line) => {
      ctx.fillText(line, canvasWidth / 2, titleY);
      titleY += titleFontSize * 1.2;
    });

    // 効果の描画
    ctx.font = `${effectFontSize}px 'NotoSansJP-Bold', sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;

    for (let i = 0; i < effects.length; i++) {
      const item = effects[i];
      const y = titleY + 10 + (iconSize + iconMargin) * i;

      if (item.imageUrl) {
        try {
          const imagePath = path.join(
            process.cwd(),
            "public",
            "Images",
            "Icon",
            item.imageUrl
          );
          const imageBuffer = await fs.readFile(imagePath);
          const image = await loadImage(imageBuffer);

          ctx.drawImage(
            image,
            canvasPadding + 5,
            y - iconSize / 2,
            iconSize,
            iconSize
          );
        } catch (error) {
          console.error(
            `画像の読み込みに失敗しました: ${item.imageUrl}`,
            error
          );
        }
      }

      let effectText = `${item.effect}`;
      if (item.turns !== undefined) {
        effectText += ` ${item.turns}T`;
      }
      ctx.fillText(effectText, canvasPadding + 5 + iconSize + iconMargin, y);
    }

    const imageData = canvas.toDataURL("image/png");
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
