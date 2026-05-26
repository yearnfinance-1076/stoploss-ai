import type { ReactNode } from "react";

type ProductPanelProps = {
  path: string;
  children: ReactNode;
  className?: string;
};

export default function ProductPanel({ path, children, className = "" }: ProductPanelProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d111c]/80 shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#131a2b]/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
        <span className="ml-2 truncate text-[10px] text-[#5c6578] sm:text-xs">stoploss.ai / {path}</span>
      </div>
      <div className="p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
