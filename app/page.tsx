// app/page.tsx
"use client";

import { useState } from "react";
import EffectList from "@/components/EffectList/EffectList";
import GenerateImageButton from "@/components/GenerateImageButton/GenerateImageButton";
import { SelectedEffect } from "@/components/types";

export default function Home() {
  const [selectedEffects, setSelectedEffects] = useState<SelectedEffect[]>([]);

  return (
    <main className="main">
      <EffectList
        selectedEffects={selectedEffects}
        onEffectsChange={setSelectedEffects}
      />
      <GenerateImageButton selectedEffects={selectedEffects} />
    </main>
  );
}
