import SearchChat from "./components/SearchChat";
import {
  MockAiSearch,
  MockCommunity,
  MockMyPage,
  MockOrderCalendar,
  MockProfitCalculator,
} from "./components/home/FeatureMocks";

const navItems = [
  { label: "AI 검색엔진", href: "#ai-search" },
  { label: "발주 캘린더", href: "#order-calendar" },
  { label: "마이페이지", href: "#my-page" },
  { label: "손익 계산기", href: "#profit-calculator" },
  { label: "커뮤니티", href: "#community" },
];

const features = [
  {
    id: "feature-ai-search",
    title: "AI 검색엔진",
    description:
      "식자재명이나 조건을 입력하면 AI가 용도·가격·대체상품을 분석해 추천합니다.",
    Mock: MockAiSearch,
    badge: "핵심 기능",
  },
  {
    id: "order-calendar",
    title: "발주 캘린더",
    description:
      "날짜별 발주 내역을 캘린더로 기록하고, 하단에서 주문 내역을 한 번에 확인합니다.",
    Mock: MockOrderCalendar,
    badge: "발주 관리",
  },
  {
    id: "my-page",
    title: "마이페이지",
    description:
      "구독 요금제, 크레딧 사용량, 남은 검색 횟수, 결제 내역을 관리합니다.",
    Mock: MockMyPage,
    badge: "계정",
  },
  {
    id: "profit-calculator",
    title: "매출·순이익 계산기",
    description:
      "월 매출, 식자재비, 고정비를 입력하면 예상 세전·세후 순이익과 원가율을 계산합니다.",
    Mock: MockProfitCalculator,
    badge: "손익 분석",
  },
  {
    id: "community",
    title: "사장님 커뮤니티",
    description:
      "자영업자들이 식자재 가격 정보, 거래처 후기, 원가 절감 팁을 공유합니다.",
    Mock: MockCommunity,
    badge: "커뮤니티",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06080f] text-[#f4f6fb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#1a3a6e]/40 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-[#2563eb]/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-[#0f766e]/15 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06080f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex shrink-0 items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b9eff] to-[#1d4ed8] shadow-lg shadow-[#3b9eff]/25">
                <span className="text-xs font-bold tracking-tight text-white">SL</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                STOPLOSS <span className="text-[#3b9eff]">AI</span>
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="hidden rounded-lg px-3 py-2 text-sm text-[#8b95a8] transition-colors hover:text-white sm:block"
              >
                로그인
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#3b9eff] px-3 py-2 text-sm font-medium text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0] sm:px-4"
              >
                무료 체험
              </button>
            </div>
          </div>
          <nav className="-mx-4 flex gap-1 overflow-x-auto border-t border-white/[0.04] px-4 pb-3 pt-2 scrollbar-none sm:mx-0 sm:justify-center sm:gap-2 sm:px-0">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-lg px-3 py-1.5 text-sm text-[#8b95a8] transition hover:bg-white/[0.05] hover:text-white whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="ai-search"
        className="relative z-10 scroll-mt-32 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3b9eff]/30 bg-[#3b9eff]/10 px-4 py-1.5 text-sm text-[#7ec8ff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b9eff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b9eff]" />
            </span>
            자영업 식자재 구매·원가 관리 플랫폼
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            식자재 구매부터
            <br />
            <span className="bg-gradient-to-r from-[#7ec8ff] via-[#3b9eff] to-[#60a5fa] bg-clip-text text-transparent">
              원가·손익 관리까지
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8b95a8] sm:text-lg">
            AI 검색, 발주 기록, 가격 변동 알림, 매출·순이익 계산, 사장님 커뮤니티를 한 번에
            관리하세요.
          </p>

          <SearchChat />

          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4 sm:gap-4">
            {[
              { label: "등록 식자재", value: "12,400+" },
              { label: "월 평균 절감", value: "₩840만" },
              { label: "활성 사장님", value: "3,200+" },
              { label: "가격 알림", value: "실시간" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.06] bg-[#0d111c]/60 px-4 py-3 backdrop-blur-sm"
              >
                <p className="text-[10px] text-[#5c6578] sm:text-xs">{s.label}</p>
                <p className="mt-1 text-sm font-semibold tabular-nums sm:text-base">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-[#3b9eff]">제품 기능</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              사장님 업무에 필요한 도구를 한곳에
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#8b95a8] sm:text-base">
              검색부터 발주, 손익 계산, 커뮤니티까지 실제 서비스 화면과 동일한 경험을 제공합니다.
            </p>
          </div>

          <div className="space-y-20 sm:space-y-28">
            {features.map((feature, index) => {
              const Mock = feature.Mock;
              const reversed = index % 2 === 1;

              return (
                <article
                  key={feature.id}
                  id={feature.id}
                  className="scroll-mt-32"
                >
                  <div
                    className={`flex flex-col gap-8 lg:items-center lg:gap-12 ${
                      reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
                  >
                    <div className="flex-1 lg:max-w-md">
                      <span className="inline-block rounded-full border border-[#3b9eff]/25 bg-[#3b9eff]/10 px-3 py-1 text-xs font-medium text-[#7ec8ff]">
                        {feature.badge}
                      </span>
                      <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[#8b95a8]">
                        {feature.description}
                      </p>
                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#3b9eff] transition hover:text-[#7ec8ff]"
                      >
                        {feature.title} 열기
                        <span aria-hidden>→</span>
                      </button>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d111c]/80 shadow-2xl shadow-black/40">
                        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#131a2b]/80 px-4 py-2.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
                          <span className="ml-2 truncate text-[10px] text-[#5c6578] sm:text-xs">
                            stoploss.ai / {feature.id}
                          </span>
                        </div>
                        <div className="p-3 sm:p-4">
                          <Mock />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-[#0d111c]/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">지금 바로 원가 관리를 시작하세요</h2>
          <p className="mt-3 text-[#8b95a8]">
            14일 무료 체험 · 카드 등록 없이 시작 · 언제든 해지 가능
          </p>
          <button
            type="button"
            className="mt-8 rounded-xl bg-[#3b9eff] px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0]"
          >
            14일 무료 체험 시작
          </button>
        </div>
      </section>

      <footer className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold">STOPLOSS AI</p>
            <p className="mt-1 max-w-sm text-sm text-[#8b95a8]">
              자영업 식자재 구매·원가·손익 관리를 AI와 데이터로 지원합니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#8b95a8]">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-[#5c6578] sm:text-left">
          © 2026 STOPLOSS AI. 식자재 구매·원가 관리 플랫폼 · 더미 데이터 표시
        </p>
      </footer>
    </div>
  );
}
