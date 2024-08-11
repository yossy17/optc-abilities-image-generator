// components/TitleInput/TitleInput.tsx
import React from "react";

interface TitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export default function TitleInput({ title, onTitleChange }: TitleInputProps) {
  return (
    <textarea
      value={title}
      onChange={(e) => onTitleChange(e.target.value)}
      placeholder="Title for Image"
      className="titleInput"
      rows={3} // 行数を設定。必要に応じて調整。
    />
  );
}
