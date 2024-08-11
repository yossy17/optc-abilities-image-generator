// components\SkillTypeSelector\SkillTypeSelector.tsx
import { SkillType, SkillTypeSelectorProps } from "@/components/types";

export default function SkillTypeSelector({
  currentSkillType,
  onSkillTypeChange,
}: SkillTypeSelectorProps) {
  return (
    <div className="skillSelector">
      {["Special", "Captain"].map((type) => (
        <button
          key={type}
          className={`skillSelectorButton ${currentSkillType === type ? "active" : ""}`}
          onClick={() => onSkillTypeChange(type as SkillType)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
