// app/page.tsx
"use client";

import { useState } from "react";
import SkillTypeSelector from "@/components/SkillTypeSelector/SkillTypeSelector";
import EffectList from "@/components/EffectList/EffectList";
import GenerateImageButton from "@/components/GenerateImageButton/GenerateImageButton";
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
      <h1 className="title">OPTC Abilities Image Generator</h1>
      <div className="abilitiesImageGenerator">
        <SkillTypeSelector
          currentSkillType={skillType}
          onSkillTypeChange={handleSkillTypeChange}
        />
        <EffectList
          skillType={skillType}
          selectedEffects={selectedEffects}
          onEffectsChange={setSelectedEffects}
        />
        <GenerateImageButton
          skillType={skillType}
          selectedEffects={selectedEffects}
        />
      </div>
    </main>
  );
}
