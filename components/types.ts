// components/types.ts
export type SkillType = "必殺技" | "船長効果";

export interface SelectedEffect {
  category: string;
  effect: string;
  turns?: number;
}

export interface EffectDetails {
  name: string;
  hasTurns: boolean;
}

export interface EffectCategory {
  [key: string]: EffectDetails[];
}

export const EffectCategories: { [key in SkillType]: EffectCategory } = {
  必殺技: {
    攻撃: [
      { name: "火炎放射", hasTurns: false },
      { name: "氷の矢", hasTurns: true },
    ],
    防御: [
      { name: "盾", hasTurns: true },
      { name: "反射", hasTurns: true },
    ],
  },
  船長効果: {
    速度: [
      { name: "速さUP", hasTurns: true },
      { name: "減速", hasTurns: false },
    ],
    耐久: [
      { name: "耐久UP", hasTurns: true },
      { name: "HP回復", hasTurns: false },
    ],
  },
};
