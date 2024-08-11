// app/page.tsx
"use client";

import { useState } from "react";
import SkillImageGenerator from "@/components/SkillImageGenerator";
import { SkillType, SelectedEffect } from "@/components/types";

export default function Home() {
  const [skillType, setSkillType] = useState<SkillType>("Special");
  const [selectedEffects, setSelectedEffects] = useState<SelectedEffect[]>([]);

  const handleSkillTypeChange = (newSkillType: SkillType) => {
    setSkillType(newSkillType);
    setSelectedEffects([]); // Reset selected effects when skill type changes
  };

  return (
    <main className="container">
      <h1>OPTC Abilities Image Generator</h1>
      <SkillImageGenerator
        skillType={skillType}
        selectedEffects={selectedEffects}
        onSkillTypeChange={handleSkillTypeChange}
        onEffectsChange={setSelectedEffects}
      />
    </main>
  );
}
