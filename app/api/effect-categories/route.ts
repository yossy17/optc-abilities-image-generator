// app/api/effect-categories/route.ts
import { NextResponse } from "next/server";

// スキルタイプとエフェクトカテゴリの型定義
type SkillType = "必殺技" | "船長効果";

interface Effect {
  name: string;
  hasTurns: boolean;
}

interface EffectCategory {
  [key: string]: Effect[];
}

// エフェクトカテゴリのデータ
const EffectCategories: { [key in SkillType]: EffectCategory } = {
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

export async function GET() {
  try {
    return NextResponse.json(EffectCategories);
  } catch (error) {
    console.error("Error fetching effect categories:", error);
    return NextResponse.json(
      {
        error:
          "Error fetching effect categories: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
