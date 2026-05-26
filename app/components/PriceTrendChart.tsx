"use client";

type PriceTrendChartProps = {
  searchQuery: string;
};

function hashSeed(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function buildDummyPrices(seed: number) {
  const base = 18000 + (seed % 12000);
  const prices: number[] = [];
  let v = base;
  for (let i = 0; i < 30; i++) {
    const drift = Math.sin((i + seed) * 0.35) * 800 + ((seed % 7) - 3) * 40;
    v = Math.round(Math.max(8000, Math.min(45000, v + drift)));
    prices.push(v);
  }
  return prices;
}

function formatKrw(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

function inferIngredientLabel(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return "추천 식자재";
  if (trimmed.length <= 24) return trimmed;
  return `${trimmed.slice(0, 22)}…`;
}

export default function PriceTrendChart({ searchQuery }: PriceTrendChartProps) {
  const seed = hashSeed(searchQuery || "default");
  const prices = buildDummyPrices(seed);
  const current = prices[prices.length - 1];
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const label = inferIngredientLabel(searchQuery);

  const w = 400;
  const h = 140;
  const padX = 8;
  const padY = 16;
  const min = lowest * 0.98;
  const max = highest * 1.02;
  const range = max - min || 1;

  const coords = prices.map((p, i) => {
    const x = padX + (i / (prices.length - 1)) * (w - padX * 2);
    const y = padY + (1 - (p - min) / range) * (h - padY * 2);
    return { x, y };
  });

  const points = coords.map((c) => `${c.x},${c.y}`);
  const last = coords[coords.length - 1];
  const areaPoints = `${padX},${h - padY} ${points.join(" ")} ${w - padX},${h - padY}`;
  const linePoints = points.join(" ");

  const xLabels = ["30일 전", "15일 전", "오늘"];

  return (
    <div className="mt-3 w-full rounded-xl border border-white/[0.08] bg-[#0a0e18]/90 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">가격 변동 추이</p>
          <p className="mt-0.5 text-xs text-[#5c6578]">최근 30일 기준 예상 가격 흐름</p>
          <p className="mt-1 truncate text-xs text-[#7ec8ff]">{label}</p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400 transition hover:bg-amber-500/20"
        >
          목표가 알림 설정
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "현재가", value: current, highlight: true },
          { label: "최저가", value: lowest, highlight: false },
          { label: "최고가", value: highest, highlight: false },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-lg border px-2.5 py-2 sm:px-3 ${
              s.highlight
                ? "border-[#3b9eff]/30 bg-[#3b9eff]/10"
                : "border-white/[0.06] bg-[#131a2b]/60"
            }`}
          >
            <p className="text-[10px] text-[#5c6578] sm:text-xs">{s.label}</p>
            <p
              className={`mt-0.5 text-xs font-semibold tabular-nums sm:text-sm ${
                s.highlight ? "text-[#7ec8ff]" : ""
              }`}
            >
              {formatKrw(s.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="h-36 w-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={`area-${seed}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b9eff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b9eff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill={`url(#area-${seed})`} />
          <polyline
            points={linePoints}
            fill="none"
            stroke="#3b9eff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={last.x}
            cy={last.y}
            r="4"
            fill="#7ec8ff"
            stroke="#06080f"
            strokeWidth="2"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-[#5c6578]">
          {xLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-[#5c6578] sm:text-left">
        실제 가격 데이터 연동 전까지는 예시 데이터로 표시됩니다.
      </p>
    </div>
  );
}
