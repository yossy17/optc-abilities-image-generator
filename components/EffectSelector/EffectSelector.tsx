// components/EffectSelector/EffectSelector.tsx
import { useState, useEffect } from "react";
import { EffectSelectorProps } from "@/components/types";
import { EffectCategories } from "@/app/data/EffectCategories";

export default function EffectSelector({
  selectedEffect,
  updateEffect,
  removeEffect,
}: EffectSelectorProps) {
  const [category, setCategory] = useState(selectedEffect.category);
  const [subCategory, setSubCategory] = useState(selectedEffect.subCategory);
  const [effect, setEffect] = useState(selectedEffect.effect);
  const [turns, setTurns] = useState(selectedEffect.turns);

  useEffect(() => {
    const categories = Object.keys(EffectCategories);
    if (categories.length > 0 && !categories.includes(category)) {
      const newCategory = categories[0];
      setCategory(newCategory);
      const subCategories = Object.keys(EffectCategories[newCategory] || {});
      if (subCategories.length > 0) {
        setSubCategory(subCategories[0]);
      }
    }
  }, [category]);

  useEffect(() => {
    const subCategories = Object.keys(EffectCategories[category] || {});
    if (subCategories.length > 0 && !subCategories.includes(subCategory)) {
      setSubCategory(subCategories[0]);
    }
  }, [category, subCategory]);

  useEffect(() => {
    const effects = EffectCategories[category]?.[subCategory] || [];
    const selectedEffectDetails = effects.find((eff) => eff.name === effect);

    if (selectedEffectDetails) {
      const newEffect = {
        category,
        subCategory,
        effect,
        turns: selectedEffectDetails.hasTurns
          ? turns === 21
            ? "∞"
            : turns
          : undefined,
      };

      if (JSON.stringify(newEffect) !== JSON.stringify(selectedEffect)) {
        updateEffect(newEffect);
      }
    } else if (effects.length > 0) {
      const firstEffect = effects[0];
      setEffect(firstEffect.name);
      setTurns(firstEffect.hasTurns ? 1 : undefined);
    }
  }, [category, subCategory, effect, turns, updateEffect, selectedEffect]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    const subCategories = Object.keys(EffectCategories[newCategory] || {});
    if (subCategories.length > 0) {
      const newSubCategory = subCategories[0];
      setSubCategory(newSubCategory);
      const effects = EffectCategories[newCategory]?.[newSubCategory] || [];
      if (effects.length > 0) {
        const firstEffect = effects[0];
        setEffect(firstEffect.name);
        setTurns(firstEffect.hasTurns ? 1 : undefined);
      }
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubCategory = e.target.value;
    setSubCategory(newSubCategory);
    const effects = EffectCategories[category]?.[newSubCategory] || [];
    if (effects.length > 0) {
      const firstEffect = effects[0];
      setEffect(firstEffect.name);
      setTurns(firstEffect.hasTurns ? 1 : undefined);
    }
  };

  const handleEffectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEffect = e.target.value;
    const selectedEffectDetails = EffectCategories[category]?.[
      subCategory
    ]?.find((eff) => eff.name === newEffect);
    setEffect(newEffect);
    if (selectedEffectDetails) {
      setTurns(selectedEffectDetails.hasTurns ? 1 : undefined);
    }
  };

  const handleTurnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setTurns(value === 21 ? "∞" : value);
  };

  return (
    <div className="effectBox">
      <div className="effectSelectorBox">
        <select
          value={category}
          onChange={handleCategoryChange}
          className="effectSelector"
        >
          {Object.keys(EffectCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={subCategory}
          onChange={handleSubCategoryChange}
          className="effectSelector"
        >
          {Object.keys(EffectCategories[category] || {}).map((subCat) => (
            <option key={subCat} value={subCat}>
              {subCat}
            </option>
          ))}
        </select>
        <select
          value={effect}
          onChange={handleEffectChange}
          className="effectSelector"
        >
          {(EffectCategories[category]?.[subCategory] || []).map((eff) => (
            <option key={eff.name} value={eff.name}>
              {eff.name}
            </option>
          ))}
        </select>
      </div>
      <div className="effectBoxContainer">
        {turns !== undefined && (
          <div className="turnsSelector">
            <input
              type="range"
              min="1"
              max="21"
              value={turns === "∞" ? 21 : turns}
              onChange={handleTurnsChange}
            />
            <span>{turns === "∞" ? "∞" : `${turns}ターン`}</span>
          </div>
        )}
        <button onClick={removeEffect} className="removeEffect">
          Del
        </button>
      </div>
    </div>
  );
}
