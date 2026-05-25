import SearchChat from "./components/SearchChat";

const metrics = [
  {
    label: "이번 달 발주금액",
    value: "₩12,450,000",
    change: "+8.2%",
    changeType: "up" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: "원재료비율",
    value: "34.2%",
    change: "-1.4%p",
    changeType: "down" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    label: "예상 세전이익",
    value: "₩8,920,000",
    change: "+12.1%",
    changeType: "up" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: "예상 세후이익",
    value: "₩7,136,000",
    change: "+11.8%",
    changeType: "up" as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

const orders = [
  {
    product: "배대감 찹쌀가루",
    spec: "10kg",
    supplier: "식자재마트 A",
    unitPrice: "₩42,800",
    qty: 3,
    total: "₩128,400",
    status: "발주완료",
    saved: "₩12,600",
  },
  {
    product: "프랑스산 무염버터",
    spec: "2.5kg",
    supplier: "유통사 B",
    unitPrice: "₩31,200",
    qty: 5,
    total: "₩156,000",
    status: "배송중",
    saved: "₩8,400",
  },
  {
    product: "유기농 밀가루",
    spec: "25kg",
    supplier: "도매 C",
    unitPrice: "₩58,500",
    qty: 2,
    total: "₩117,000",
    status: "AI 추천",
    saved: "₩22,100",
  },
  {
    product: "에스프레소 원두",
    spec: "1kg",
    supplier: "로스터리 D",
    unitPrice: "₩24,900",
    qty: 8,
    total: "₩199,200",
    status: "발주완료",
    saved: "₩15,200",
  },
  {
    product: "생크림",
    spec: "1L×12",
    supplier: "식자재마트 A",
    unitPrice: "₩89,000",
    qty: 1,
    total: "₩89,000",
    status: "검토중",
    saved: "₩6,500",
  },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "발주완료": "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25",
    "배송중": "bg-sky-500/15 text-sky-400 ring-sky-500/25",
    "AI 추천": "bg-violet-500/15 text-violet-400 ring-violet-500/25",
    "검토중": "bg-amber-500/15 text-amber-400 ring-amber-500/25",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status] ?? "bg-white/10 text-zinc-400 ring-white/10"}`}
    >
      {status}
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06080f] text-[#f4f6fb]">
      {/* Ambient background */}
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

      {/* Nav */}
      <header className="relative z-10 border-b border-white/[0.06] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b9eff] to-[#1d4ed8] shadow-lg shadow-[#3b9eff]/25">
              <span className="text-xs font-bold tracking-tight text-white">SL</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              STOPLOSS <span className="text-[#3b9eff]">AI</span>
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[#8b95a8] md:flex">
            <a href="#dashboard" className="transition-colors hover:text-white">
              대시보드
            </a>
            <a href="#orders" className="transition-colors hover:text-white">
              발주내역
            </a>
            <a href="#" className="transition-colors hover:text-white">
              가격비교
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-lg px-4 py-2 text-sm text-[#8b95a8] transition-colors hover:text-white sm:block"
            >
              로그인
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#3b9eff] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0]"
            >
              무료 체험
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3b9eff]/30 bg-[#3b9eff]/10 px-4 py-1.5 text-sm text-[#7ec8ff]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3b9eff] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3b9eff]" />
            </span>
            자영업자 식자재 구매·원가 관리 플랫폼
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
            원재료 발주부터 손익 분석까지,
            <br />
            <span className="bg-gradient-to-r from-[#7ec8ff] via-[#3b9eff] to-[#60a5fa] bg-clip-text text-transparent">
              AI가 관리합니다
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#8b95a8] sm:text-lg">
            최저가 원재료 검색, 발주 기록 관리, 월별 원가율·세전/세후 이익 분석을 한 번에
          </p>

          <SearchChat />
        </div>
      </section>

      {/* Dashboard preview */}
      <section
        id="dashboard"
        className="relative z-10 px-4 pb-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#3b9eff]">대시보드 미리보기</p>
              <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
                2026년 5월 손익·발주 현황
              </h2>
            </div>
            <p className="text-sm text-[#5c6578]">마지막 업데이트: 방금 전 · AI 동기화</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d111c]/80 shadow-2xl shadow-black/50 backdrop-blur-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#131a2b]/80 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ef4444]/80" />
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]/80" />
              <span className="h-3 w-3 rounded-full bg-[#22c55e]/80" />
              <span className="ml-3 text-xs text-[#5c6578]">stoploss.ai / dashboard</span>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Metric cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="group rounded-xl border border-white/[0.06] bg-[#131a2b]/60 p-5 transition hover:border-white/[0.12] hover:bg-[#131a2b]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-white/[0.05] p-2 text-[#3b9eff]">
                        {m.icon}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          m.changeType === "up"
                            ? "text-emerald-400"
                            : m.changeType === "down"
                              ? "text-emerald-400"
                              : "text-[#8b95a8]"
                        }`}
                      >
                        {m.change}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-[#8b95a8]">{m.label}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Mini chart placeholder */}
              <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#131a2b]/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">월별 원가율 추이</p>
                    <p className="text-xs text-[#5c6578]">최근 6개월</p>
                  </div>
                  <div className="flex gap-4 text-xs text-[#8b95a8]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#3b9eff]" />
                      원재료비율
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      세후이익률
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex h-28 items-end justify-between gap-2 sm:h-32">
                  {[38, 36, 35, 34, 33, 34].map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end gap-1">
                        <div
                          className="w-1/2 rounded-t bg-[#3b9eff]/60"
                          style={{ height: `${h * 2.5}%` }}
                        />
                        <div
                          className="w-1/2 rounded-t bg-emerald-500/50"
                          style={{ height: `${(100 - h) * 0.45}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#5c6578]">
                        {["12월", "1월", "2월", "3월", "4월", "5월"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders table */}
              <div id="orders" className="mt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold">최근 발주 · AI 가격 비교</h3>
                  <button
                    type="button"
                    className="text-sm text-[#3b9eff] transition hover:text-[#7ec8ff]"
                  >
                    전체 보기 →
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.02] text-xs text-[#8b95a8]">
                        <th className="px-4 py-3 font-medium">품목</th>
                        <th className="px-4 py-3 font-medium">규격</th>
                        <th className="px-4 py-3 font-medium">공급처</th>
                        <th className="px-4 py-3 font-medium text-right">단가</th>
                        <th className="px-4 py-3 font-medium text-center">수량</th>
                        <th className="px-4 py-3 font-medium text-right">합계</th>
                        <th className="px-4 py-3 font-medium text-right">절감</th>
                        <th className="px-4 py-3 font-medium">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                        >
                          <td className="px-4 py-3.5 font-medium">{row.product}</td>
                          <td className="px-4 py-3.5 text-[#8b95a8]">{row.spec}</td>
                          <td className="px-4 py-3.5 text-[#8b95a8]">{row.supplier}</td>
                          <td className="px-4 py-3.5 text-right tabular-nums">{row.unitPrice}</td>
                          <td className="px-4 py-3.5 text-center tabular-nums">{row.qty}</td>
                          <td className="px-4 py-3.5 text-right font-medium tabular-nums">
                            {row.total}
                          </td>
                          <td className="px-4 py-3.5 text-right text-emerald-400 tabular-nums">
                            -{row.saved}
                          </td>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-semibold">STOPLOSS AI</p>
            <p className="mt-1 text-sm text-[#8b95a8]">
              원재료 비용을 줄이고, 이익을 데이터로 관리하세요.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-[#3b9eff]/40 bg-[#3b9eff]/10 px-8 py-3 text-sm font-semibold text-[#7ec8ff] transition hover:bg-[#3b9eff]/20"
          >
            14일 무료 체험 시작
          </button>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-[#5c6578]">
          © 2026 STOPLOSS AI. 카페·베이커리 원재료 소싱 & 원가 관리.
        </p>
      </footer>
    </div>
  );
}
