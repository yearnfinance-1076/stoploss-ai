import type { ProductResult } from "@/app/lib/products";

type ProductResultsProps = {
  searchQuery: string;
  products: ProductResult[];
};

export default function ProductResults({ searchQuery, products }: ProductResultsProps) {
  if (products.length === 0) {
    return (
      <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0a0e18]/90 p-4">
        <p className="text-sm font-semibold text-white">실시간 상품 검색</p>
        <p className="mt-2 text-xs text-[#8b95a8]">
          &quot;{searchQuery}&quot;에 대한 쇼핑 결과를 찾지 못했습니다. 검색어를 바꿔 다시 시도해
          보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0a0e18]/90 p-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-white">실시간 상품 검색</p>
          <p className="mt-0.5 text-xs text-[#5c6578]">
            검색어: <span className="text-[#7ec8ff]">{searchQuery}</span>
          </p>
        </div>
        <p className="text-[10px] text-[#5c6578]">{products.length}개 결과</p>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {products.map((product, index) => {
          const buttonLabel = product.isDirectPurchase ? "구매하기" : "가격 보기";

          return (
          <li
            key={`${product.purchaseLink}-${index}`}
            className="flex gap-3 rounded-lg border border-white/[0.06] bg-[#131a2b]/70 p-3 transition hover:border-[#3b9eff]/30"
          >
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
              <p className="mt-1 text-base font-semibold tabular-nums text-[#7ec8ff]">
                {product.price}
              </p>
              <p className="mt-0.5 truncate text-xs text-[#5c6578]">{product.source}</p>
              <a
                href={product.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex w-fit items-center justify-center rounded-lg px-3 py-1.5 text-xs font-medium text-white transition ${
                  product.isDirectPurchase
                    ? "bg-[#3b9eff] hover:bg-[#2d8ef0]"
                    : "border border-[#3b9eff]/40 bg-[#3b9eff]/15 text-[#7ec8ff] hover:bg-[#3b9eff]/25"
                }`}
              >
                {buttonLabel}
              </a>
            </div>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
