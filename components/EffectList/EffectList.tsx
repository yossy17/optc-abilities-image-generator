// components/EffectList/EffectList.tsx
import { useEffect, useCallback } from "react";
import EffectSelector from "@/components/EffectSelector/EffectSelector";
import {
  EffectListProps,
  SelectedEffect,
  EffectDetails,
} from "@/components/types";
import { EffectCategories } from "@/app/data/EffectCategories";

export default function EffectList({
  selectedEffects,
  onEffectsChange,
}: EffectListProps) {
  const initializeEffects = useCallback(() => {
    const categories = Object.keys(EffectCategories);
    if (categories.length > 0) {
      const firstCategory = categories[0];
      const subCategories = Object.keys(EffectCategories[firstCategory]);
      if (subCategories.length > 0) {
        const firstSubCategory = subCategories[0];
        const effects: EffectDetails[] =
          EffectCategories[firstCategory][firstSubCategory];
        if (effects.length > 0) {
          const firstEffect = effects[0];
          return [
            {
              category: firstCategory,
              subCategory: firstSubCategory,
              effect: firstEffect.name,
              turns: firstEffect.turns ? 1 : undefined,
            },
          ] as SelectedEffect[];
        }
      }
    }
    return [] as SelectedEffect[];
  }, []);

  useEffect(() => {
    if (selectedEffects.length === 0) {
      const initialEffects = initializeEffects();
      if (initialEffects.length > 0) {
        onEffectsChange(initialEffects);
      }
    }
  }, [selectedEffects.length, initializeEffects, onEffectsChange]);

  const addEffect = useCallback(() => {
    const categories = Object.keys(EffectCategories);
    if (categories.length === 0) return;

    const firstCategory = categories[0];
    const subCategories = Object.keys(EffectCategories[firstCategory]);
    if (subCategories.length === 0) return;

    const firstSubCategory = subCategories[0];
    const effects: EffectDetails[] =
      EffectCategories[firstCategory][firstSubCategory];
    if (effects.length === 0) return;

    const firstEffect = effects[0];
    onEffectsChange((prevEffects) => [
      ...prevEffects,
      {
        category: firstCategory,
        subCategory: firstSubCategory,
        effect: firstEffect.name,
        turns: firstEffect.turns ? 1 : undefined,
      },
    ]);
  }, [onEffectsChange]);

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
      <button onClick={addEffect} className="addEffect">
        Add
      </button>
      <div className="effectList">
        {selectedEffects.map((selectedEffect, index) => (
          <EffectSelector
            key={index}
            selectedEffect={selectedEffect}
            updateEffect={(updatedEffect) => updateEffect(index, updatedEffect)}
            removeEffect={() => removeEffect(index)}
          />
        ))}
      </div>
    </>
  );
}
