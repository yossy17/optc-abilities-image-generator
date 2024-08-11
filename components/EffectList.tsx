// components/EffectList.tsx
import { useState, useEffect } from "react";
import EffectSelector from "@/components/EffectSelector";
import {
  SkillType,
  SelectedEffect,
  EffectCategories,
} from "@/components/types";

interface EffectListProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
  onEffectsChange: (effects: SelectedEffect[]) => void;
}

export default function EffectList({
  skillType,
  selectedEffects,
  onEffectsChange,
}: EffectListProps) {
  useEffect(() => {
    if (selectedEffects.length === 0) {
      const categories = Object.keys(EffectCategories[skillType]);
      if (categories.length > 0) {
        const firstCategory = categories[0];
        const effects = EffectCategories[skillType][firstCategory];
        if (effects.length > 0) {
          const firstEffect = effects[0];
          onEffectsChange([
            {
              category: firstCategory,
              effect: firstEffect.name,
              turns: firstEffect.hasTurns ? 1 : undefined,
            },
          ]);
        }
      }
    }
  }, [skillType, selectedEffects, onEffectsChange]);

  const addEffect = () => {
    const categories = Object.keys(EffectCategories[skillType]);
    if (categories.length === 0) return;

    const firstCategory = categories[0];
    const effects = EffectCategories[skillType][firstCategory];
    if (effects.length === 0) return;

    const firstEffect = effects[0];
    onEffectsChange([
      ...selectedEffects,
      {
        category: firstCategory,
        effect: firstEffect.name,
        turns: firstEffect.hasTurns ? 1 : undefined,
      },
    ]);
  };

  const removeEffect = (index: number) => {
    const newEffects = selectedEffects.filter((_, i) => i !== index);
    onEffectsChange(newEffects);
  };

  const updateEffect = (index: number, updatedEffect: SelectedEffect) => {
    const newEffects = [...selectedEffects];
    newEffects[index] = updatedEffect;
    onEffectsChange(newEffects);
  };

  return (
    <div className="effect-list">
      {selectedEffects.map((selectedEffect, index) => (
        <EffectSelector
          key={index}
          skillType={skillType}
          selectedEffect={selectedEffect}
          updateEffect={(updatedEffect) => updateEffect(index, updatedEffect)}
          removeEffect={() => removeEffect(index)}
        />
      ))}
      <button onClick={addEffect} className="add-effect">
        効果を追加
      </button>
    </div>
  );
}
