import { NextResponse } from "next/server";
import { EffectCategories } from "@/app/data/EffectCategories";

// APIエンドポイント
export async function GET() {
  return NextResponse.json(EffectCategories);
}
