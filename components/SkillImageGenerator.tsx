// components/SkillImageGenerator.tsx
import SkillTypeSelector from "@/components/SkillTypeSelector";
import EffectList from "@/components/EffectList";
import GenerateImageButton from "@/components/GenerateImageButton";
import { SkillType, SelectedEffect } from "@/components/types";

interface SkillImageGeneratorProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
  onSkillTypeChange: (skillType: SkillType) => void;
  onEffectsChange: (effects: SelectedEffect[]) => void;
}

export default function SkillImageGenerator({
  skillType,
  selectedEffects,
  onSkillTypeChange,
  onEffectsChange,
}: SkillImageGeneratorProps) {
  return (
    <div className="skill-image-generator">
      <SkillTypeSelector
        currentSkillType={skillType}
        onSkillTypeChange={onSkillTypeChange}
      />
      <EffectList
        skillType={skillType}
        selectedEffects={selectedEffects}
        onEffectsChange={onEffectsChange}
      />
      <GenerateImageButton
        skillType={skillType}
        selectedEffects={selectedEffects}
      />
    </div>
  );
}
