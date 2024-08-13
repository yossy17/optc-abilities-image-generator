// components/types.ts

// ギミックの効果を表す型
export interface SelectedEffect {
  category: string;
  subCategory: string;
  effect: string;
  turns?: number | "∞";
}

// 効果リストのプロパティ型
export interface EffectListProps {
  selectedEffects: SelectedEffect[];
  onEffectsChange: (
    effects:
      | SelectedEffect[]
      | ((prevEffects: SelectedEffect[]) => SelectedEffect[])
  ) => void;
}

// 効果セレクターのプロパティ型
export interface EffectSelectorProps {
  selectedEffect: SelectedEffect;
  updateEffect: (effect: SelectedEffect) => void;
  removeEffect: () => void;
}

// 効果の詳細を表す型
export interface EffectDetails {
  name: string;
  hasTurns: boolean;
  imageUrl?: string;
}

// サブカテゴリに属する効果のリストを表す型
export interface SubCategory {
  [key: string]: EffectDetails[];
}

// カテゴリに属するサブカテゴリを表す型
export interface EffectCategory {
  [key: string]: SubCategory;
}

// 画像生成ボタンのプロパティ型
export interface GenerateImageButtonProps {
  selectedEffects: SelectedEffect[];
}

// 効果の基本的な詳細を表す型
export interface Effect {
  name: string;
  hasTurns: boolean;
  imageUrl?: string;
}
