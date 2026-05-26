import type { ProductResult } from "@/app/lib/products";
import ProductCard from "./ProductCard";

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
        {products.map((product, index) => (
          <ProductCard
            key={`${product.fallbackLink}-${product.productId ?? index}`}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
}
