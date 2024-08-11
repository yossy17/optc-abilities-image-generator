// components\types.ts
export type SkillType = "Special" | "Captain";

export interface SelectedEffect {
  category: string;
  subCategory: string;
  effect: string;
  turns?: number;
}

export interface EffectDetails {
  name: string;
  hasTurns: boolean;
}

export interface SubCategory {
  [key: string]: EffectDetails[];
}

export interface EffectCategory {
  [key: string]: SubCategory;
}

export const EffectCategories: { [key in SkillType]: EffectCategory } = {
  Special: {
    エンハンス: {
      攻撃系: [
        { name: "攻撃力", hasTurns: true },
        { name: "基礎攻撃力", hasTurns: true },
        { name: "クリティカル発生率強化", hasTurns: true },
        { name: "クリティカル威力強化", hasTurns: true },
      ],
      チェイン系: [
        { name: "チェイン加算", hasTurns: true },
        { name: "チェイン固定", hasTurns: true },
        { name: "チェイン初期値", hasTurns: true },
        { name: "チェイン増加", hasTurns: true },
        { name: "チェイン増加量変換", hasTurns: true },
      ],
      ダメージ強化系: [
        { name: "ダメージ量(防御ダウン)", hasTurns: true },
        { name: "ダメージ量(遅延)", hasTurns: true },
        { name: "ダメージ量(毒)", hasTurns: true },
        { name: "ダメージ量(被ダメ増)", hasTurns: true },
        { name: "ダメージ量(熱傷)", hasTurns: true },
        { name: "ダメージ量(痺れ)", hasTurns: true },
        { name: "ダメージ量(強敵)", hasTurns: true },
        { name: "ダメージ量(ネガティブ)", hasTurns: true },
      ],
      その他: [
        { name: "スロット影響", hasTurns: true },
        { name: "属性相性", hasTurns: true },
        { name: "超化影響値変更", hasTurns: true },
        { name: "最終攻撃キャラ強化", hasTurns: true },
      ],
    },
  },
  Captain: {
    hage: {
      hoge: [
        { name: "攻撃力", hasTurns: true },
        { name: "基礎攻撃力", hasTurns: true },
        { name: "クリティカル発生率強化", hasTurns: true },
        { name: "クリティカル威力強化", hasTurns: true },
      ],
    },
  },
};
