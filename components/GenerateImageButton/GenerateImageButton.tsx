import { useState } from "react";
import { GenerateImageButtonProps } from "@/components/types";

export default function GenerateImageButton({
  skillType,
  selectedEffects,
}: GenerateImageButtonProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateImage = async () => {
    if (selectedEffects.length === 0) {
      alert("効果を追加してください");
      return;
    }

    try {
      const response = await fetch("/api/GenerateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillType, effects: selectedEffects }),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert("画像生成に失敗しました");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`画像の生成中にエラーが発生しました: ${(error as Error).message}`);
    }
  };

  return (
    <div className="generateImage">
      <button onClick={generateImage} className="createImage">
        画像生成
      </button>
      {imageUrl && (
        <div className="resultLink">
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            生成された画像を表示
          </a>
        </div>
      )}
    </div>
  );
}
