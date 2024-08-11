// components\types.ts
// SkillType: スキルの種類を表す型
export type SkillType = "Special" | "Captain";

// SelectedEffect: 選択された効果の詳細を表す型
export interface SelectedEffect {
  category: string;
  subCategory: string;
  effect: string;
  turns?: number | "完全解除";
}

// SkillTypeSelector: スキルの種類を選択するためのコンポーネントのプロパティ型
export interface SkillTypeSelectorProps {
  currentSkillType: SkillType;
  onSkillTypeChange: (skillType: SkillType) => void;
}

// EffectListProps: 選択された効果のリストを表示・編集するためのコンポーネントのプロパティ型
export interface EffectListProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
  onEffectsChange: (
    effects:
      | SelectedEffect[]
      | ((prevEffects: SelectedEffect[]) => SelectedEffect[])
  ) => void;
}

// EffectSelectorProps: 特定の効果を選択・編集するためのコンポーネントのプロパティ型
export interface EffectSelectorProps {
  skillType: SkillType;
  selectedEffect: SelectedEffect;
  updateEffect: (effect: SelectedEffect) => void;
  removeEffect: () => void;
}

// EffectDetails: 各効果の詳細を表す型
export interface EffectDetails {
  name: string;
  hasTurns: boolean;
  imageUrl?: string;
}

// SubCategory: サブカテゴリに属する効果のリストを表す型
export interface SubCategory {
  [key: string]: EffectDetails[];
}

// EffectCategory: カテゴリに属するサブカテゴリを表す型
export interface EffectCategory {
  [key: string]: SubCategory;
}

// GenerateImageButtonProps: 画像生成ボタンのコンポーネントのプロパティ型
export interface GenerateImageButtonProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
}

// Effect: 効果の基本的な詳細を表す型
export interface Effect {
  name: string;
  hasTurns: boolean;
  imageUrl?: string;
}
