// components\EffectList\EffectList.tsx
import { useEffect, useCallback } from "react";
import EffectSelector from "@/components/EffectSelector/EffectSelector";
import {
  EffectListProps,
  SelectedEffect,
  EffectDetails,
} from "@/components/types";
import { EffectCategories } from "@/app/data/EffectCategories";

export default function EffectList({
  skillType,
  selectedEffects,
  onEffectsChange,
}: EffectListProps) {
  // 初期設定のロジックをuseCallbackに移動
  const initializeEffects = useCallback(() => {
    const categories = Object.keys(EffectCategories[skillType]);
    if (categories.length > 0) {
      const firstCategory = categories[0];
      const subCategories = Object.keys(
        EffectCategories[skillType][firstCategory]
      );
      if (subCategories.length > 0) {
        const firstSubCategory = subCategories[0];
        const effects: EffectDetails[] =
          EffectCategories[skillType][firstCategory][firstSubCategory];
        if (effects.length > 0) {
          const firstEffect = effects[0];
          return [
            {
              category: firstCategory,
              subCategory: firstSubCategory,
              effect: firstEffect.name,
              turns: firstEffect.hasTurns ? 1 : undefined,
            },
          ] as SelectedEffect[];
        }
      }
    }
    return [] as SelectedEffect[];
  }, [skillType]);

  // useEffect内で初期化ロジックを使用
  useEffect(() => {
    if (selectedEffects.length === 0) {
      const initialEffects = initializeEffects();
      if (initialEffects.length > 0) {
        onEffectsChange(initialEffects);
      }
    }
  }, [selectedEffects.length, initializeEffects, onEffectsChange]);

  const addEffect = useCallback(() => {
    const categories = Object.keys(EffectCategories[skillType]);
    if (categories.length === 0) return;

    const firstCategory = categories[0];
    const subCategories = Object.keys(
      EffectCategories[skillType][firstCategory]
    );
    if (subCategories.length === 0) return;

    const firstSubCategory = subCategories[0];
    const effects: EffectDetails[] =
      EffectCategories[skillType][firstCategory][firstSubCategory];
    if (effects.length === 0) return;

    const firstEffect = effects[0];
    onEffectsChange((prevEffects) => [
      ...prevEffects,
      {
        category: firstCategory,
        subCategory: firstSubCategory,
        effect: firstEffect.name,
        turns: firstEffect.hasTurns ? 1 : undefined,
      },
    ]);
  }, [skillType, onEffectsChange]);

  const removeEffect = useCallback(
    (index: number) => {
      onEffectsChange((prevEffects) =>
        prevEffects.filter((_, i) => i !== index)
      );
    },
    [onEffectsChange]
  );

  const updateEffect = useCallback(
    (index: number, updatedEffect: SelectedEffect) => {
      onEffectsChange((prevEffects) => {
        const newEffects = [...prevEffects];
        newEffects[index] = updatedEffect;
        return newEffects;
      });
    },
    [onEffectsChange]
  );

  return (
    <>
      {" "}
      <button onClick={addEffect} className="addEffect">
        Add Effect
      </button>
      <div className="effectList">
        {selectedEffects.map((selectedEffect, index) => (
          <EffectSelector
            key={index}
            skillType={skillType}
            selectedEffect={selectedEffect}
            updateEffect={(updatedEffect) => updateEffect(index, updatedEffect)}
            removeEffect={() => removeEffect(index)}
          />
        ))}
      </div>
    </>
  );
}
