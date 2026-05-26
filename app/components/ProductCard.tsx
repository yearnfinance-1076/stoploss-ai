"use client";

import { useState } from "react";
import type { ProductOffersResponse, ProductResult } from "@/app/lib/products";

type ProductCardProps = {
  product: ProductResult;
};

function openInNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ProductCard({ product }: ProductCardProps) {
  const [buttonText, setButtonText] = useState("가격 보기");
  const [loading, setLoading] = useState(false);
  const [routeBadge, setRouteBadge] = useState<"직접 이동" | "Google 경유" | null>(null);

  async function handleClick() {
    if (loading) return;

    if (!product.productId) {
      openInNewTab(product.fallbackLink);
      setRouteBadge("Google 경유");
      return;
    }

    setLoading(true);
    setButtonText("링크 확인 중...");

    try {
      const res = await fetch("/api/product-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.productId,
          fallbackLink: product.fallbackLink,
        }),
      });

      const data = (await res.json()) as ProductOffersResponse & { error?: string };

      if (!res.ok) {
        openInNewTab(product.fallbackLink);
        setRouteBadge("Google 경유");
        return;
      }

      if (data.isDirectPurchase) {
        openInNewTab(data.purchaseLink);
        setRouteBadge("직접 이동");
      } else {
        openInNewTab(product.fallbackLink);
        setRouteBadge("Google 경유");
      }
    } catch {
      openInNewTab(product.fallbackLink);
      setRouteBadge("Google 경유");
    } finally {
      setLoading(false);
      setButtonText("가격 보기");
    }
  }

  return (
    <li className="flex gap-3 rounded-lg border border-white/[0.06] bg-[#131a2b]/70 p-3 transition hover:border-[#3b9eff]/30">
      {product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt=""
          className="h-16 w-16 shrink-0 rounded-md border border-white/[0.06] bg-white/5 object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.03] text-[10px] text-[#5c6578]">
          No img
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="line-clamp-2 text-sm font-medium leading-snug">{product.title}</p>
        <p className="mt-1 text-base font-semibold tabular-nums text-[#7ec8ff]">{product.price}</p>
        <p className="mt-0.5 truncate text-xs text-[#5c6578]">{product.source}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="inline-flex w-fit items-center justify-center rounded-lg border border-[#3b9eff]/40 bg-[#3b9eff]/15 px-3 py-1.5 text-xs font-medium text-[#7ec8ff] transition hover:bg-[#3b9eff]/25 disabled:cursor-wait disabled:opacity-70"
          >
            {buttonText}
          </button>
          {routeBadge && (
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                routeBadge === "직접 이동"
                  ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25"
                  : "bg-white/[0.06] text-[#8b95a8] ring-1 ring-white/[0.08]"
              }`}
            >
              {routeBadge}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
