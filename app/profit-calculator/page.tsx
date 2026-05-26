import type { Metadata } from "next";
import { MockProfitCalculator } from "../components/home/FeatureMocks";
import PageHeader from "../components/layout/PageHeader";
import ProductPanel from "../components/layout/ProductPanel";

export const metadata: Metadata = {
  title: "손익 계산기 — STOPLOSS AI",
  description:
    "월 매출, 식자재비, 고정비를 입력하면 예상 세전·세후 순이익과 원가율을 계산합니다.",
};

const monthlyCompare = [
  { month: "2월", revenue: "₩39.2M", margin: "31.8%" },
  { month: "3월", revenue: "₩41.5M", margin: "33.1%" },
  { month: "4월", revenue: "₩40.1M", margin: "32.4%" },
  { month: "5월", revenue: "₩42.8M", margin: "34.2%" },
];

export default function ProfitCalculatorPage() {
  return (
    <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          badge="손익 분석"
          title="매출·순이익 계산기"
          description="월 매출, 식자재비, 고정비를 입력하면 예상 세전·세후 순이익과 원가율을 계산합니다. 월별 손익 추이와 비교 데이터를 함께 확인하세요."
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <ProductPanel path="profit-calculator">
              <MockProfitCalculator />
            </ProductPanel>
            <p className="mt-3 text-center text-xs text-[#5c6578] sm:text-left">
              세후이익은 예상 세율 20% 기준 샘플 계산입니다. 실제 세무 상담이 필요합니다.
            </p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5">
              <h2 className="text-sm font-semibold">월별 원가율 비교</h2>
              <ul className="mt-4 space-y-3">
                {monthlyCompare.map((m) => (
                  <li
                    key={m.month}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#131a2b]/50 px-3 py-2.5"
                  >
                    <span className="text-sm text-[#8b95a8]">{m.month}</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums">{m.revenue}</p>
                      <p className="text-xs text-[#7ec8ff]">원가율 {m.margin}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#3b9eff]/25 bg-[#3b9eff]/10 p-5">
              <p className="text-xs font-medium text-[#7ec8ff]">AI 인사이트</p>
              <p className="mt-2 text-sm leading-relaxed text-[#8b95a8]">
                5월 원재료비 비중이 1.8%p 상승했습니다. 식자재 3품목 가격 인상이 주요 원인입니다.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
