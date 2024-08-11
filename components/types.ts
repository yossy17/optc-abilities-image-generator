// components\types.ts
// SkillType: スキルの種類を表す型
export type SkillType = "Special" | "Captain";

// SelectedEffect: 選択された効果の詳細を表す型
export interface SelectedEffect {
  category: string; // 効果のカテゴリ
  subCategory: string; // 効果のサブカテゴリ
  effect: string; // 効果の名前
  turns?: number | "完全解除"; // 効果が続くターン数（オプション）
}

// SkillTypeSelector
export interface SkillTypeSelectorProps {
  currentSkillType: SkillType;
  onSkillTypeChange: (skillType: SkillType) => void;
}

// EffectDetails
export interface EffectListProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
  onEffectsChange: (
    effects:
      | SelectedEffect[]
      | ((prevEffects: SelectedEffect[]) => SelectedEffect[])
  ) => void;
}

// EffectSelector
export interface EffectSelectorProps {
  skillType: SkillType;
  selectedEffect: SelectedEffect;
  updateEffect: (effect: SelectedEffect) => void;
  removeEffect: () => void;
}

// EffectDetails: 各効果の詳細を表す型
export interface EffectDetails {
  name: string; // 効果の名前
  hasTurns: boolean; // 効果にターン数が存在するかどうか
  imageUrl?: string; // 効果に関連する画像のURL（オプション）
}

// SubCategory: サブカテゴリに属する効果のリストを表す型
export interface SubCategory {
  [key: string]: EffectDetails[]; // サブカテゴリ名と対応する効果リストのマッピング
}

// EffectCategory: カテゴリに属するサブカテゴリを表す型
export interface EffectCategory {
  [key: string]: SubCategory; // カテゴリ名と対応するサブカテゴリのマッピング
}

// GenerateImageButton
export interface GenerateImageButtonProps {
  skillType: SkillType;
  selectedEffects: SelectedEffect[];
}
