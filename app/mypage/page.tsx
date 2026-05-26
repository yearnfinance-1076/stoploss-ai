import type { Metadata } from "next";
import { MockMyPage } from "../components/home/FeatureMocks";
import PageHeader from "../components/layout/PageHeader";
import ProductPanel from "../components/layout/ProductPanel";

export const metadata: Metadata = {
  title: "마이페이지 — STOPLOSS AI",
  description:
    "구독 요금제, 크레딧 사용량, 남은 검색 횟수, 결제 내역을 관리합니다.",
};

const payments = [
  { date: "2026-05-15", item: "프로 플랜 (월간)", amount: "₩29,000", status: "결제완료" },
  { date: "2026-04-15", item: "프로 플랜 (월간)", amount: "₩29,000", status: "결제완료" },
  { date: "2026-04-02", item: "크레딧 충전 500", amount: "₩9,900", status: "결제완료" },
  { date: "2026-03-15", item: "프로 플랜 (월간)", amount: "₩29,000", status: "결제완료" },
];

export default function MyPage() {
  return (
    <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          badge="계정"
          title="마이페이지"
          description="구독 요금제, 크레딧 사용량, 남은 검색 횟수, 결제 내역을 관리합니다. 사용량과 결제 정보를 한곳에서 확인하세요."
        />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <ProductPanel path="mypage">
              <MockMyPage />
            </ProductPanel>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">결제 내역</h2>
                <button
                  type="button"
                  className="text-xs text-[#3b9eff] transition hover:text-[#7ec8ff]"
                >
                  전체 보기
                </button>
              </div>
              <ul className="mt-4 divide-y divide-white/[0.06]">
                {payments.map((p) => (
                  <li key={p.date + p.item} className="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium">{p.item}</p>
                      <p className="text-xs text-[#5c6578]">{p.date}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:text-right">
                      <span className="text-sm font-semibold tabular-nums">{p.amount}</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                        {p.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-xs font-medium text-amber-400">알림</p>
              <p className="mt-1 text-sm text-[#8b95a8]">
                AI 검색 잔여 47회. 이번 달 말까지 53회 사용 예정입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
