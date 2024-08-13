// app/data/EffectCategories.ts
import { EffectCategory } from "@/components/types";

export const EffectCategories: EffectCategory = {
  敵ギミック: {
    hoge: [
      { name: "foo", hasTurns: true },
      { name: "bar", hasTurns: false },
    ],

    バリア: [
      { name: "ヒットバリア", hasTurns: true },
      { name: "タップバリア", hasTurns: true },
      { name: "スロットバリア", hasTurns: true },
      { name: "ダメージバリア", hasTurns: true },
    ],
  },
  自ギミック: {
    hogehoge: [
      { name: "foo", hasTurns: true },
      { name: "bar", hasTurns: false },
    ],
  },
};
