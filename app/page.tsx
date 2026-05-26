import Link from "next/link";
import { FEATURE_CARDS } from "./lib/navigation";

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  search: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  calendar: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  user: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  chart: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  community: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.42 0c-1.171.095-2.291.24-3.336.475a2.126 2.126 0 00-.476.095.48.48 0 00-.284.42v4.286c0 .268.14.526.37.684.884.63 2.303 1.197 4.02 1.653.884.284 1.5 1.128 1.5 2.097v4.286c0 .268.14.526.37.684" />
    </svg>
  ),
};

export default function Home() {
  return (
    <>
      <section className="relative z-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8">
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

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/ai-search"
              className="w-full rounded-xl bg-[#3b9eff] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0] sm:w-auto"
            >
              AI 검색 시작하기
            </Link>
            <Link
              href="/order-calendar"
              className="w-full rounded-xl border border-white/[0.12] bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-[#f4f6fb] transition hover:bg-white/[0.06] sm:w-auto"
            >
              발주 캘린더 보기
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4 sm:gap-4">
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
          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-[#3b9eff]">제품 기능</p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">사장님 업무에 필요한 도구</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#8b95a8] sm:text-base">
              각 기능 페이지에서 상세 화면을 확인하고 바로 사용해 보세요.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_CARDS.map((feature) => (
              <article
                key={feature.href}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0d111c]/70 p-5 transition hover:border-[#3b9eff]/30 hover:bg-[#0d111c]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-xl bg-[#3b9eff]/15 p-2.5 text-[#3b9eff]">
                    {FEATURE_ICONS[feature.icon]}
                  </div>
                  <span className="rounded-full border border-[#3b9eff]/25 bg-[#3b9eff]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#7ec8ff]">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#8b95a8]">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#3b9eff]/40 bg-[#3b9eff]/10 px-4 py-2.5 text-sm font-medium text-[#7ec8ff] transition hover:bg-[#3b9eff]/20"
                >
                  {feature.title} 열기
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[0.06] bg-[#0d111c]/50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">지금 바로 원가 관리를 시작하세요</h2>
          <p className="mt-3 text-[#8b95a8]">14일 무료 체험 · 카드 등록 없이 시작 · 언제든 해지 가능</p>
          <Link
            href="/ai-search"
            className="mt-8 inline-block rounded-xl bg-[#3b9eff] px-10 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0]"
          >
            14일 무료 체험 시작
          </Link>
        </div>
      </section>
    </>
  );
}
