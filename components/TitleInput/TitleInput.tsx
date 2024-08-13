// components/TitleInput/TitleInput.tsx
import React from "react";

interface TitleInputProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, onTitleChange }) => {
  return (
    <div className="titleInput">
      <textarea
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="Title"
        className="titleInputField"
      />
    </div>
  );
};

export default TitleInput;
