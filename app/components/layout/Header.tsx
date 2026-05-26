"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/app/lib/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06080f]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 transition opacity-90 hover:opacity-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b9eff] to-[#1d4ed8] shadow-lg shadow-[#3b9eff]/25">
              <span className="text-xs font-bold tracking-tight text-white">SL</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-[#f4f6fb]">
              STOPLOSS <span className="text-[#3b9eff]">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden rounded-lg px-3 py-2 text-sm text-[#8b95a8] transition-colors hover:text-white sm:block"
            >
              로그인
            </button>
            <Link
              href="/ai-search"
              className="rounded-lg bg-[#3b9eff] px-3 py-2 text-sm font-medium text-white shadow-lg shadow-[#3b9eff]/30 transition hover:bg-[#2d8ef0] sm:px-4"
            >
              무료 체험
            </Link>
          </div>
        </div>
        <nav
          className="-mx-4 flex gap-1 overflow-x-auto border-t border-white/[0.04] px-4 pb-3 pt-2 scrollbar-none sm:mx-0 sm:justify-center sm:gap-2 sm:px-0"
          aria-label="주요 메뉴"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-[#3b9eff]/15 font-medium text-[#7ec8ff] ring-1 ring-[#3b9eff]/30"
                    : "text-[#8b95a8] hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
