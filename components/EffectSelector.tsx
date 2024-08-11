// components/EffectSelector.tsx
import { useState, useEffect } from "react";
import {
  SkillType,
  SelectedEffect,
  EffectCategories,
  EffectDetails,
} from "@/components/types";

interface EffectSelectorProps {
  skillType: SkillType;
  selectedEffect: SelectedEffect;
  updateEffect: (effect: SelectedEffect) => void;
  removeEffect: () => void;
}

export default function EffectSelector({
  skillType,
  selectedEffect,
  updateEffect,
  removeEffect,
}: EffectSelectorProps) {
  const [category, setCategory] = useState(selectedEffect.category);
  const [effect, setEffect] = useState(selectedEffect.effect);
  const [turns, setTurns] = useState(selectedEffect.turns);

  useEffect(() => {
    // スキルタイプが変更されたときにカテゴリーをリセット
    const categories = Object.keys(EffectCategories[skillType]);
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [skillType, category]);

  useEffect(() => {
    const effects = EffectCategories[skillType][category] || [];
    const selectedEffectDetails = effects.find((eff) => eff.name === effect);
    if (selectedEffectDetails) {
      updateEffect({
        category,
        effect,
        turns: selectedEffectDetails.hasTurns ? turns ?? 1 : undefined,
      });
    } else if (effects.length > 0) {
      // 現在の効果が新しいカテゴリーに存在しない場合、最初の効果を選択
      const firstEffect = effects[0];
      setEffect(firstEffect.name);
      setTurns(firstEffect.hasTurns ? 1 : undefined);
    }
  }, [category, effect, turns, skillType, updateEffect]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    const effects = EffectCategories[skillType][newCategory] || [];
    if (effects.length > 0) {
      const firstEffect = effects[0];
      setEffect(firstEffect.name);
      setTurns(firstEffect.hasTurns ? 1 : undefined);
    }
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEffect = e.target.value;
    const selectedEffectDetails = EffectCategories[skillType][category]?.find(
      (eff) => eff.name === newEffect
    );
    setEffect(newEffect);
    if (selectedEffectDetails) {
      setTurns(selectedEffectDetails.hasTurns ? 1 : undefined);
    }
  };

  const handleTurnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setTurns(value);
  };

  return (
    <div className="effect-selector">
      <select value={category} onChange={handleCategoryChange}>
        {Object.keys(EffectCategories[skillType]).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select value={effect} onChange={handleEffectChange}>
        {(EffectCategories[skillType][category] || []).map((eff) => (
          <option key={eff.name} value={eff.name}>
            {eff.name}
          </option>
        ))}
      </select>
      {turns !== undefined && (
        <div className="turns-selector">
          <input
            type="range"
            min="1"
            max="20"
            value={turns}
            onChange={handleTurnsChange}
          />
          <span>{turns}ターン</span>
        </div>
      )}
      <button onClick={removeEffect} className="remove-effect">
        削除
      </button>
    </div>
  );
}
