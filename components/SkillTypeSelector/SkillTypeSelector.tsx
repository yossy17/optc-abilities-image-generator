// components\SkillTypeSelector\SkillTypeSelector.tsx
import { SkillType } from "@/components/types";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts";

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
      {["Special", "Captain"].map((type) => (
        <button
          key={type}
          onClick={() => onSkillTypeChange(type as SkillType)}
          className={`${PixelMplus10Regular.className}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
