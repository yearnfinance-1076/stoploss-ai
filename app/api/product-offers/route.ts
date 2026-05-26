import { NextRequest, NextResponse } from "next/server";
import {
  extractDirectMerchantOffer,
  fetchGoogleShoppingProduct,
} from "@/app/lib/serp-product-offers";
import type { ProductOffersResponse } from "@/app/lib/products";

export async function POST(request: NextRequest) {
  try {
    const serpApiKey = process.env.SERPAPI_API_KEY;
    if (!serpApiKey) {
      return NextResponse.json(
        { error: "SERPAPI_API_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    let body: { productId?: string; fallbackLink?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "요청 본문이 올바른 JSON이 아닙니다." },
        { status: 400 },
      );
    }

    const productId = body.productId?.trim();
    const fallbackLink = body.fallbackLink?.trim();

    if (!productId) {
      return NextResponse.json({ error: "productId는 필수입니다." }, { status: 400 });
    }
    if (!fallbackLink?.startsWith("http")) {
      return NextResponse.json({ error: "fallbackLink는 유효한 URL이어야 합니다." }, { status: 400 });
    }

    const productData = await fetchGoogleShoppingProduct(productId, serpApiKey);

    if (productData) {
      const direct = extractDirectMerchantOffer(productData);
      if (direct) {
        const response: ProductOffersResponse = {
          purchaseLink: direct.purchaseLink,
          isDirectPurchase: true,
          source: direct.source ?? "판매처",
        };
        return NextResponse.json(response);
      }
    }

    const response: ProductOffersResponse = {
      purchaseLink: fallbackLink,
      isDirectPurchase: false,
      source: "Google Shopping",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("[/api/product-offers]", error);
    const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
