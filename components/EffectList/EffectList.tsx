// components/EffectList.tsx
import { useEffect } from "react";
import EffectSelector from "@/components/EffectSelector/EffectSelector";
import {
  SkillType,
  SelectedEffect,
  EffectCategories,
} from "@/components/types";
import { PixelMplus10Regular } from "@/public/Fonts/Fonts"; // フォントをインポート

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
        const subCategories = Object.keys(
          EffectCategories[skillType][firstCategory]
        );
        if (subCategories.length > 0) {
          const firstSubCategory = subCategories[0];
          const effects =
            EffectCategories[skillType][firstCategory][firstSubCategory];
          if (effects.length > 0) {
            const firstEffect = effects[0];
            onEffectsChange([
              {
                category: firstCategory,
                subCategory: firstSubCategory,
                effect: firstEffect.name,
                turns: firstEffect.hasTurns ? 1 : undefined,
              },
            ]);
          }
        }
      }
    }
  }, [skillType, selectedEffects, onEffectsChange]);

  const addEffect = () => {
    const categories = Object.keys(EffectCategories[skillType]);
    if (categories.length === 0) return;

    const firstCategory = categories[0];
    const subCategories = Object.keys(
      EffectCategories[skillType][firstCategory]
    );
    if (subCategories.length === 0) return;

    const firstSubCategory = subCategories[0];
    const effects =
      EffectCategories[skillType][firstCategory][firstSubCategory];
    if (effects.length === 0) return;

    const firstEffect = effects[0];
    onEffectsChange([
      ...selectedEffects,
      {
        category: firstCategory,
        subCategory: firstSubCategory,
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
    <div className={`effect-list ${PixelMplus10Regular.className}`}>
      {" "}
      {/* フォントクラスを追加 */}
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
