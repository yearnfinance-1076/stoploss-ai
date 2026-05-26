import type { Metadata } from "next";
import SearchChat from "../components/SearchChat";
import PageHeader from "../components/layout/PageHeader";

export const metadata: Metadata = {
  title: "AI 검색엔진 — STOPLOSS AI",
  description:
    "식자재명이나 조건을 입력하면 AI가 용도·가격·대체상품을 분석해 추천합니다. 가격 변동 추이와 목표가 알림을 함께 확인하세요.",
};

export default function AiSearchPage() {
  return (
    <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          badge="핵심 기능"
          title="AI 검색엔진"
          description="식자재명이나 조건을 입력하면 AI가 용도·가격·대체상품을 분석해 추천합니다. 검색 후 가격 변동 추이와 목표가 알림 설정을 확인할 수 있습니다."
        />
        <SearchChat />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "AI 추천 정확도", value: "94.2%" },
            { label: "등록 SKU", value: "12,400+" },
            { label: "평균 응답 시간", value: "2.4초" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/[0.06] bg-[#0d111c]/60 px-4 py-3 text-center"
            >
              <p className="text-xs text-[#5c6578]">{s.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
