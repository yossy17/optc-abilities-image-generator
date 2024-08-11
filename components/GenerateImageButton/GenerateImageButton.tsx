// GenerateImageButton.tsx
import { useState } from "react";
import { GenerateImageButtonProps } from "@/components/types";
import Link from "next/link";
import TitleInput from "@/components/TitleInput/TitleInput";

export default function GenerateImageButton({
  selectedEffects,
}: GenerateImageButtonProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const generateImage = async () => {
    const finalTitle =
      title.trim() === "" ? "OPTC Abilities Image Generator" : title;

    if (selectedEffects.length === 0) {
      alert("効果を追加してください");
      return;
    }

    try {
      const response = await fetch("/api/GenerateImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: finalTitle, effects: selectedEffects }),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();

      // Base64データをBlobに変換
      const byteCharacters = atob(data.imageData.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // BlobからURLを生成
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`画像の生成中にエラーが発生しました: ${(error as Error).message}`);
    }
  };

  return (
    <div className="generateImage">
      <TitleInput title={title} onTitleChange={setTitle} />
      <button onClick={generateImage} className="createImage">
        Create
      </button>
      {imageUrl && (
        <div className="resultLink">
          <Link href={imageUrl} target="_blank" rel="noopener noreferrer">
            View image
          </Link>
        </div>
      )}
    </div>
  );
}
