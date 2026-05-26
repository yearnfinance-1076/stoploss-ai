import type { Metadata } from "next";
import { MockOrderCalendar } from "../components/home/FeatureMocks";
import PageHeader from "../components/layout/PageHeader";
import ProductPanel from "../components/layout/ProductPanel";

export const metadata: Metadata = {
  title: "발주 캘린더 — STOPLOSS AI",
  description:
    "날짜별 발주 내역을 캘린더로 기록하고, 주문 내역을 한 번에 확인합니다.",
};

const monthlySummary = [
  { label: "5월 발주 건수", value: "28건" },
  { label: "5월 발주 금액", value: "₩12,450,000" },
  { label: "평균 주문 간격", value: "4.2일" },
];

const upcomingOrders = [
  { date: "5월 28일", supplier: "식자재마트 A", note: "생크림·버터 정기 발주" },
  { date: "6월 1일", supplier: "도매센터 B", note: "밀가루·설탕 대량 발주" },
];

export default function OrderCalendarPage() {
  return (
    <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          badge="발주 관리"
          title="발주 캘린더"
          description="날짜별 발주 내역을 캘린더로 기록하고, 하단에서 주문 내역을 한 번에 확인합니다. 월별 발주 패턴과 예정 발주를 관리하세요."
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <ProductPanel path="order-calendar">
              <MockOrderCalendar />
            </ProductPanel>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5">
              <h2 className="text-sm font-semibold">이번 달 요약</h2>
              <ul className="mt-4 space-y-3">
                {monthlySummary.map((s) => (
                  <li key={s.label} className="flex justify-between text-sm">
                    <span className="text-[#8b95a8]">{s.label}</span>
                    <span className="font-semibold tabular-nums">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5">
              <h2 className="text-sm font-semibold">예정 발주</h2>
              <ul className="mt-4 space-y-3">
                {upcomingOrders.map((o) => (
                  <li
                    key={o.date}
                    className="rounded-lg border border-white/[0.06] bg-[#131a2b]/50 px-3 py-2.5"
                  >
                    <p className="text-xs font-medium text-[#7ec8ff]">{o.date}</p>
                    <p className="mt-0.5 text-sm font-medium">{o.supplier}</p>
                    <p className="mt-0.5 text-xs text-[#5c6578]">{o.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
