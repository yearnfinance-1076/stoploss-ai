const SERP_API_BASE = "https://serpapi.com/search.json";

export async function fetchGoogleShoppingProduct(
  productId: string,
  apiKey: string,
): Promise<Record<string, unknown> | null> {
  const params = new URLSearchParams({
    engine: "google_shopping_product",
    product_id: productId,
    gl: "kr",
    hl: "ko",
    api_key: apiKey,
  });

  try {
    const res = await fetch(`${SERP_API_BASE}?${params.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const data = (await res.json()) as Record<string, unknown> & { error?: string };

    if (!res.ok || data.error) {
      console.warn(`[product-offers] ${productId}:`, data.error ?? res.status);
      return null;
    }

    return data;
  } catch (err) {
    console.warn(`[product-offers] ${productId} failed:`, err);
    return null;
  }
}

export function normalizeProductApiPayload(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const productResults = data.product_results;
  if (productResults && typeof productResults === "object") {
    return { ...data, ...(productResults as Record<string, unknown>) };
  }
  return data;
}

type LinkEntry = Record<string, unknown>;

function sellerNameFromEntry(entry: LinkEntry): string | null {
  const name = entry.name ?? entry.source ?? entry.merchant;
  return typeof name === "string" && name.trim() ? name.trim() : null;
}

/** First direct merchant link + optional seller name from Product API payload. */
export function extractDirectMerchantOffer(data: Record<string, unknown>): {
  purchaseLink: string;
  source: string | null;
} | null {
  const payload = normalizeProductApiPayload(data);

  const sellersResults = payload.sellers_results;
  if (sellersResults && typeof sellersResults === "object") {
    const sr = sellersResults as LinkEntry;
    for (const key of ["online_sellers", "sellers"] as const) {
      const list = sr[key];
      if (Array.isArray(list)) {
        for (const entry of list) {
          if (!entry || typeof entry !== "object") continue;
          const e = entry as LinkEntry;
          const raw = e.link ?? e.merchant_link ?? e.url;
          if (typeof raw !== "string" || !raw.startsWith("http") || raw.includes("google.com")) {
            continue;
          }
          const unwrapped = unwrapGoogleRedirect(raw);
          const candidate = unwrapped ?? raw;
          if (candidate.includes("google.com")) continue;
          return {
            purchaseLink: candidate,
            source: sellerNameFromEntry(e),
          };
        }
      }
    }
  }

  for (const key of ["offers", "buying_options"] as const) {
    const list = payload[key];
    if (Array.isArray(list)) {
      for (const entry of list) {
        if (!entry || typeof entry !== "object") continue;
        const e = entry as LinkEntry;
        const raw = e.link ?? e.merchant_link ?? e.url;
        if (typeof raw !== "string" || !raw.startsWith("http") || raw.includes("google.com")) {
          continue;
        }
        const unwrapped = unwrapGoogleRedirect(raw);
        const candidate = unwrapped ?? raw;
        if (candidate.includes("google.com")) continue;
        return {
          purchaseLink: candidate,
          source: sellerNameFromEntry(e),
        };
      }
    }
  }

  return null;
}

function unwrapGoogleRedirect(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("google")) return null;
    if (parsed.pathname !== "/url" && parsed.pathname !== "/imgres") return null;
    const target = parsed.searchParams.get("q") ?? parsed.searchParams.get("url");
    if (target?.startsWith("http")) return target;
  } catch {
    /* ignore */
  }
  return null;
}
