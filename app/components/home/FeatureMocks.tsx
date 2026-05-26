const panelClass =
  "rounded-xl border border-white/[0.06] bg-[#0a0e18]/90 p-4 sm:p-5";

export function MockAiSearch() {
  const results = [
    {
      name: "국산 찹쌀가루 A",
      supplier: "식자재마트 동대문",
      price: "₩38,200",
      unit: "10kg",
      trend: [42, 41, 40, 39, 38, 38],
      alt: "대체: 수입 찹쌀가루 B (-12%)",
    },
    {
      name: "유기농 밀가루",
      supplier: "도매센터 B",
      price: "₩52,400",
      unit: "25kg",
      trend: [55, 54, 53, 52, 52, 51],
      alt: "용도: 베이커리 강력분 대체 가능",
    },
  ];

  return (
    <div className={`${panelClass} space-y-4`}>
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#131a2b] px-3 py-2.5">
        <svg className="h-4 w-4 shrink-0 text-[#5c6578]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="flex-1 text-sm text-[#8b95a8]">카페용 생크림 1L, 유통기한 14일 이상…</span>
        <span className="rounded-md bg-[#3b9eff] px-2.5 py-1 text-xs font-medium text-white">검색</span>
      </div>

      <div className="space-y-3">
        {results.map((r) => (
          <div
            key={r.name}
            className="rounded-lg border border-white/[0.06] bg-[#131a2b]/60 p-3.5 transition hover:border-[#3b9eff]/30"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm">{r.name}</p>
                <p className="mt-0.5 text-xs text-[#5c6578]">
                  {r.supplier} · {r.unit}
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold tabular-nums text-[#7ec8ff]">{r.price}</p>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-400 ring-1 ring-amber-500/25">
                  목표가 알림 가능
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[#8b95a8]">{r.alt}</p>
            <div className="mt-3 flex items-end gap-1 h-8">
              {r.trend.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-[#3b9eff]/50"
                  style={{ height: `${(v / 60) * 100}%` }}
                  title={`${v}천원`}
                />
              ))}
            </div>
            <p className="mt-1 text-[10px] text-[#5c6578]">최근 6주 가격 추이 (천원)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockOrderCalendar() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const may2026 = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31,
  ];
  const orderDays = [3, 7, 12, 15, 19, 22, 26];
  const orders = [
    { date: "5월 26일", items: "생크림 1L×6, 버터 2.5kg×2", total: "₩312,400", status: "발주완료" },
    { date: "5월 22일", items: "찹쌀가루 10kg×3, 설탕 15kg×1", total: "₩198,200", status: "배송중" },
    { date: "5월 19일", items: "에스프레소 원두 1kg×8", total: "₩199,200", status: "발주완료" },
  ];

  return (
    <div className={`${panelClass} space-y-4`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">2026년 5월</p>
        <div className="flex gap-1">
          <button type="button" className="rounded px-2 py-1 text-xs text-[#8b95a8] hover:bg-white/5">‹</button>
          <button type="button" className="rounded px-2 py-1 text-xs text-[#8b95a8] hover:bg-white/5">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#5c6578]">
        {days.map((d) => (
          <span key={d} className="py-1 font-medium">
            {d}
          </span>
        ))}
        {may2026.map((d, i) =>
          d === null ? (
            <span key={`e-${i}`} />
          ) : (
            <span
              key={d}
              className={`flex h-8 items-center justify-center rounded-md text-xs ${
                d === 26
                  ? "bg-[#3b9eff] font-semibold text-white"
                  : orderDays.includes(d)
                    ? "bg-[#3b9eff]/20 font-medium text-[#7ec8ff] ring-1 ring-[#3b9eff]/40"
                    : "text-[#8b95a8] hover:bg-white/[0.04]"
              }`}
            >
              {d}
            </span>
          ),
        )}
      </div>
      <div className="border-t border-white/[0.06] pt-4">
        <p className="mb-3 text-xs font-medium text-[#8b95a8]">최근 발주 내역</p>
        <ul className="space-y-2.5">
          {orders.map((o) => (
            <li
              key={o.date}
              className="flex flex-col gap-1 rounded-lg border border-white/[0.05] bg-[#131a2b]/50 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#7ec8ff]">{o.date}</p>
                <p className="truncate text-sm">{o.items}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:text-right">
                <span className="text-sm font-semibold tabular-nums">{o.total}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                  {o.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MockMyPage() {
  return (
    <div className={`${panelClass} space-y-4`}>
      <div className="rounded-lg border border-[#3b9eff]/30 bg-gradient-to-br from-[#3b9eff]/15 to-transparent p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-[#7ec8ff]">현재 요금제</p>
            <p className="mt-1 text-lg font-semibold">프로 플랜</p>
            <p className="mt-1 text-xs text-[#8b95a8]">월 ₩29,000 · 다음 결제 6월 15일</p>
          </div>
          <span className="rounded-full bg-[#3b9eff]/20 px-3 py-1 text-xs font-medium text-[#7ec8ff]">
            활성
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-[#131a2b]/60 p-3">
          <p className="text-xs text-[#5c6578]">남은 크레딧</p>
          <p className="mt-1 text-xl font-bold tabular-nums">1,240</p>
          <p className="text-[10px] text-emerald-400">+200 이번 달 충전</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-[#131a2b]/60 p-3">
          <p className="text-xs text-[#5c6578]">AI 검색 잔여</p>
          <p className="mt-1 text-xl font-bold tabular-nums">47회</p>
          <p className="text-[10px] text-[#8b95a8]">/ 월 100회</p>
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-[#8b95a8]">이번 달 사용량</span>
          <span className="font-medium tabular-nums">53%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3b9eff] to-[#60a5fa]"
            style={{ width: "53%" }}
          />
        </div>
        <p className="mt-2 text-[10px] text-[#5c6578]">검색 53회 · 발주 기록 128건 · 알림 12건</p>
      </div>
    </div>
  );
}

export function MockProfitCalculator() {
  const results = [
    { label: "매출", value: "₩42,800,000", accent: false },
    { label: "원재료비", value: "₩14,640,000", accent: false },
    { label: "세전이익", value: "₩18,920,000", accent: true },
    { label: "예상 세후이익", value: "₩15,136,000", accent: true },
  ];

  return (
    <div className={`${panelClass} space-y-4`}>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "월 매출", placeholder: "42,800,000" },
          { label: "식자재비", placeholder: "14,640,000" },
          { label: "고정비", placeholder: "9,240,000" },
        ].map((f) => (
          <div key={f.label}>
            <label className="mb-1 block text-xs text-[#8b95a8]">{f.label}</label>
            <div className="rounded-lg border border-white/[0.08] bg-[#131a2b] px-3 py-2 text-sm tabular-nums text-[#f4f6fb]">
              ₩ {f.placeholder}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2">
        <span className="text-xs text-[#8b95a8]">원가율</span>
        <span className="text-sm font-semibold text-amber-400">34.2%</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {results.map((r) => (
          <div
            key={r.label}
            className={`rounded-lg border p-3 ${
              r.accent
                ? "border-[#3b9eff]/30 bg-[#3b9eff]/10"
                : "border-white/[0.06] bg-[#131a2b]/60"
            }`}
          >
            <p className="text-[10px] text-[#8b95a8]">{r.label}</p>
            <p className={`mt-1 text-sm font-bold tabular-nums sm:text-base ${r.accent ? "text-[#7ec8ff]" : ""}`}>
              {r.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockCommunity() {
  const posts = [
    {
      title: "동대문 찹쌀가루 이번 주 8% 인하",
      author: "베이커리A",
      tag: "식자재시세",
      likes: 24,
      comments: 8,
    },
    {
      title: "○○유통 후기 — 배송 빠르지만 최소주문 주의",
      author: "카페운영자",
      tag: "거래처후기",
      likes: 31,
      comments: 15,
    },
    {
      title: "원두 대량구매 + 냉동버터 조합으로 원가 2.1%p 절감",
      author: "로스터리맘",
      tag: "원가절감",
      likes: 56,
      comments: 22,
    },
  ];

  const tagColors: Record<string, string> = {
    식자재시세: "bg-sky-500/15 text-sky-400",
    거래처후기: "bg-violet-500/15 text-violet-400",
    원가절감: "bg-emerald-500/15 text-emerald-400",
  };

  return (
    <div className={`${panelClass} space-y-3`}>
      {posts.map((p) => (
        <article
          key={p.title}
          className="rounded-lg border border-white/[0.06] bg-[#131a2b]/60 p-3.5 transition hover:border-white/[0.12]"
        >
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColors[p.tag]}`}>
            {p.tag}
          </span>
          <h4 className="mt-2 text-sm font-medium leading-snug">{p.title}</h4>
          <div className="mt-2 flex items-center justify-between text-xs text-[#5c6578]">
            <span>{p.author}</span>
            <span className="flex gap-3 tabular-nums">
              <span>♥ {p.likes}</span>
              <span>💬 {p.comments}</span>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
