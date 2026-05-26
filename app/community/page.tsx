import type { Metadata } from "next";
import { MockCommunity } from "../components/home/FeatureMocks";
import PageHeader from "../components/layout/PageHeader";
import ProductPanel from "../components/layout/ProductPanel";

export const metadata: Metadata = {
  title: "사장님 커뮤니티 — STOPLOSS AI",
  description:
    "자영업자들이 식자재 가격 정보, 거래처 후기, 원가 절감 팁을 공유합니다.",
};

const TAGS = ["전체", "식자재시세", "거래처후기", "원가절감", "메뉴개발", "인테리어"];

const trending = [
  { rank: 1, title: "찹쌀가루 가격, 지역별 차이 정리", views: "1.2k" },
  { rank: 2, title: "배달앱 수수료 줄이는 실전 팁", views: "980" },
  { rank: 3, title: "냉동육 vs 국내산 원가 비교", views: "856" },
];

export default function CommunityPage() {
  return (
    <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          badge="커뮤니티"
          title="사장님 커뮤니티"
          description="자영업자들이 식자재 가격 정보, 거래처 후기, 원가 절감 팁을 공유합니다. 업종별 노하우와 시세 정보를 확인하세요."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {TAGS.map((tag, i) => (
            <button
              key={tag}
              type="button"
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                i === 0
                  ? "bg-[#3b9eff] text-white"
                  : "border border-white/[0.08] bg-white/[0.03] text-[#8b95a8] hover:border-[#3b9eff]/30 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <ProductPanel path="community">
              <MockCommunity />
            </ProductPanel>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border border-dashed border-white/[0.12] py-3 text-sm text-[#8b95a8] transition hover:border-[#3b9eff]/40 hover:text-[#7ec8ff]"
            >
              + 새 글 작성하기
            </button>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5">
              <h2 className="text-sm font-semibold">인기 글</h2>
              <ol className="mt-4 space-y-3">
                {trending.map((t) => (
                  <li key={t.rank} className="flex gap-3 text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#3b9eff]/15 text-xs font-bold text-[#7ec8ff]">
                      {t.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{t.title}</p>
                      <p className="mt-0.5 text-xs text-[#5c6578]">조회 {t.views}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5">
              <h2 className="text-sm font-semibold">커뮤니티 통계</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[#8b95a8]">오늘 새 글</dt>
                  <dd className="font-semibold">42</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#8b95a8]">활성 회원</dt>
                  <dd className="font-semibold">3,200+</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#8b95a8]">이번 주 시세글</dt>
                  <dd className="font-semibold">128</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
