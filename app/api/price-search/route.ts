import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ProductResult } from "@/app/lib/products";

const QUERY_SYSTEM_PROMPT = `너는 자영업 식자재 구매 검색어 변환기다.
사용자의 자연어 요청을 Google Shopping에서 검색하기 좋은 짧은 쇼핑 검색어로 바꾼다.

규칙:
- 검색어만 출력한다. 따옴표, 설명, 번호 목록 없음
- 핵심 식자재·제품명을 포함한다
- 업종·용도·가성비·최저가 등 조건이 있으면 검색어에 반영한다
- 60자 이내로 간결하게
- 한국어 검색어를 우선한다`;

type SerpShoppingItem = {
  title?: string;
  price?: string;
  extracted_price?: number;
  source?: string;
  product_id?: string | number;
  product_link?: string;
  link?: string;
  thumbnail?: string;
};

type SerpShoppingResponse = {
  shopping_results?: SerpShoppingItem[];
  error?: string;
};

async function toShoppingQuery(openai: OpenAI, userQuery: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: QUERY_SYSTEM_PROMPT },
      { role: "user", content: userQuery },
    ],
    temperature: 0.3,
    max_tokens: 80,
  });

  const raw = completion.choices[0]?.message?.content?.trim();
  if (!raw) {
    return userQuery.slice(0, 60);
  }

  return raw.replace(/^["'「]|["'」]$/g, "").trim() || userQuery.slice(0, 60);
}

function formatPrice(item: SerpShoppingItem): string {
  if (item.price) return item.price;
  if (typeof item.extracted_price === "number") {
    return `₩${Math.round(item.extracted_price).toLocaleString("ko-KR")}`;
  }
  return "가격 확인";
}

function resolveFallbackLink(item: SerpShoppingItem): string | null {
  if (item.product_link?.startsWith("http")) return item.product_link;
  if (item.link?.startsWith("http")) return item.link;
  return null;
}

function mapShoppingResults(items: SerpShoppingItem[]): ProductResult[] {
  const products: ProductResult[] = [];

  for (const item of items) {
    const title = item.title?.trim() ?? "";
    const fallbackLink = resolveFallbackLink(item);
    if (!title || !fallbackLink) continue;

    products.push({
      productId: item.product_id != null ? String(item.product_id) : null,
      fallbackLink,
      title,
      price: formatPrice(item),
      source: item.source?.trim() || "판매처 미상",
      thumbnail: item.thumbnail,
    });

    if (products.length >= 12) break;
  }

  return products;
}

export async function POST(request: NextRequest) {
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    const serpApiKey = process.env.SERPAPI_API_KEY;

    if (!openaiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }
    if (!serpApiKey) {
      return NextResponse.json(
        { error: "SERPAPI_API_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    let body: { query?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "요청 본문이 올바른 JSON이 아닙니다." },
        { status: 400 },
      );
    }

    const query = body.query?.trim();
    if (!query) {
      return NextResponse.json({ error: "query는 필수입니다." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: openaiKey });
    const searchQuery = await toShoppingQuery(openai, query);

    const params = new URLSearchParams({
      engine: "google_shopping",
      q: searchQuery,
      api_key: serpApiKey,
      gl: "kr",
      hl: "ko",
      num: "12",
    });

    const serpRes = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const serpData = (await serpRes.json()) as SerpShoppingResponse;

    if (!serpRes.ok || serpData.error) {
      const message = serpData.error ?? `SerpAPI 요청 실패 (${serpRes.status})`;
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const products = mapShoppingResults(serpData.shopping_results ?? []);

    return NextResponse.json({
      searchQuery,
      products,
    });
  } catch (error) {
    console.error("[/api/price-search]", error);

    const message =
      error instanceof OpenAI.APIError
        ? error.message
        : error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
