// app/page.tsx
"use client";

import { useState } from "react";
import EffectList from "@/components/EffectList/EffectList";
import GenerateImageButton from "@/components/GenerateImageButton/GenerateImageButton";
import { SelectedEffect } from "@/components/types";

export default function Home() {
  const [selectedEffects, setSelectedEffects] = useState<SelectedEffect[]>([]);

  return (
    <main className="container">
      <h1 className="title">OPTC Gimmick Chart Generator</h1>
      <div className="gimmickImageGenerator">
        <EffectList
          selectedEffects={selectedEffects}
          onEffectsChange={setSelectedEffects}
        />
        <GenerateImageButton selectedEffects={selectedEffects} />
      </div>
    </main>
  );
}
