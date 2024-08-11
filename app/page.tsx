// app/page.tsx
"use client";

import { useState } from "react";
import SkillImageGenerator from "@/components/SkillImageGenerator";
import { SkillType, SelectedEffect } from "@/components/types";

export default function Home() {
  const [skillType, setSkillType] = useState<SkillType>("必殺技");
  const [selectedEffects, setSelectedEffects] = useState<SelectedEffect[]>([]);

  const handleSkillTypeChange = (newSkillType: SkillType) => {
    setSkillType(newSkillType);
    setSelectedEffects([]); // Reset selected effects when skill type changes
  };

  return (
    <main className="container">
      <h1>スキル画像ジェネレーター</h1>
      <SkillImageGenerator
        skillType={skillType}
        selectedEffects={selectedEffects}
        onSkillTypeChange={handleSkillTypeChange}
        onEffectsChange={setSelectedEffects}
      />
    </main>
  );
}
