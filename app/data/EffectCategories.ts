// app/data/EffectCategories.ts
import { EffectCategory } from "@/components/types";

export const EffectCategories: EffectCategory = {
  敵ギミック: {
    hoge: [
      { name: "foo", turns: true },
      { name: "bar", turns: false },
    ],

    バリア: [
      {
        name: "ヒットバリア",
        turns: true,
        imageUrl: "burn_p.png",
      },
      { name: "タップバリア", turns: true },
      { name: "スロットバリア", turns: true },
      { name: "ダメージバリア", turns: true },
    ],
  },
  自ギミック: {
    hogehoge: [
      { name: "foo", turns: true },
      { name: "bar", turns: false },
    ],
  },
};
