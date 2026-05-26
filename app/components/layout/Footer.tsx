import Link from "next/link";
import { NAV_ITEMS } from "@/app/lib/navigation";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold text-[#f4f6fb] hover:text-white">
            STOPLOSS AI
          </Link>
          <p className="mt-1 max-w-sm text-sm text-[#8b95a8]">
            자영업 식자재 구매·원가·손익 관리를 AI와 데이터로 지원합니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#8b95a8]">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-center text-xs text-[#5c6578] sm:text-left">
        © 2026 STOPLOSS AI. 식자재 구매·원가 관리 플랫폼 · 더미 데이터 표시
      </p>
    </footer>
  );
}
