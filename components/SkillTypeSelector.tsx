// components/SkillTypeSelector.tsx
import { SkillType } from "@/components/types";

interface SkillTypeSelectorProps {
  currentSkillType: SkillType;
  onSkillTypeChange: (skillType: SkillType) => void;
}

export default function SkillTypeSelector({
  currentSkillType,
  onSkillTypeChange,
}: SkillTypeSelectorProps) {
  return (
    <div className="skill-type-selector">
      {["必殺技", "船長効果"].map((type) => (
        <button key={type} onClick={() => onSkillTypeChange(type as SkillType)}>
          {type}
        </button>
      ))}
    </div>
  );
}
