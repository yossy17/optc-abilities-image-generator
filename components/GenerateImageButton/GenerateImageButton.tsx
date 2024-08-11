// components\GenerateImageButton\GenerateImageButton.tsx
import { useState } from "react";
import Image from "next/image";
import { SkillType, SelectedEffect } from "@/components/types";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts"; // フォントをインポート

interface GenerateImageButtonProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
}

export default function GenerateImageButton({
  skillType,
  selectedEffects,
}: GenerateImageButtonProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  const generateImage = async () => {
    if (selectedEffects.length === 0) {
      alert("効果を追加してください");
      return;
    }

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillType, effects: selectedEffects }),
      });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`画像の生成中にエラーが発生しました: ${(error as Error).message}`);
    }
  };

  return (
    <div className={`${PixelMplus10Regular.className}`}>
      {" "}
      {/* フォントクラスを適用 */}
      <button onClick={generateImage} className="generate-image">
        画像生成
      </button>
      {imageUrl && (
        <div className="generated-image">
          <Image
            src={imageUrl}
            alt="Generated Skill Image"
            width={300}
            height={200}
          />
        </div>
      )}
    </div>
  );
}
