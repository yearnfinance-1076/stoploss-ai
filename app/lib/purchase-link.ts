/** Google Shopping / redirect URLs — not used for direct purchase buttons. */
export function isGoogleShoppingUrl(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    if (!hostname.includes("google")) return false;
    return (
      pathname.includes("/shopping") ||
      pathname === "/url" ||
      pathname.startsWith("/aclk") ||
      hostname.includes("google.")
    );
  } catch {
    return /google\.(com|co\.\w+)/i.test(url) || url.includes("/shopping/product");
  }
}

/** Unwrap google.com/url?q=... redirect wrappers to the merchant destination. */
export function unwrapGoogleRedirect(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("google")) return null;
    if (parsed.pathname !== "/url" && parsed.pathname !== "/imgres") return null;
    const target = parsed.searchParams.get("q") ?? parsed.searchParams.get("url");
    if (target?.startsWith("http")) return target;
  } catch {
    /* ignore invalid URLs */
  }
  return null;
}

/** Returns false for Google URLs; true for http(s) direct merchant links. */
export function isDirectMerchantUrl(url: string): boolean {
  if (!url.startsWith("http")) return false;
  if (url.includes("google.com")) {
    const unwrapped = unwrapGoogleRedirect(url);
    if (!unwrapped) return false;
    return !isGoogleShoppingUrl(unwrapped) && !unwrapped.includes("google.com");
  }
  const unwrapped = unwrapGoogleRedirect(url) ?? url;
  return !isGoogleShoppingUrl(unwrapped);
}

export function normalizeMerchantUrl(url: string): string {
  const unwrapped = unwrapGoogleRedirect(url);
  if (unwrapped && isDirectMerchantUrl(unwrapped)) return unwrapped;
  if (isDirectMerchantUrl(url)) return url;
  return url;
}

type LinkCarrier = Record<string, unknown>;

function pushUrl(urls: string[], value: unknown) {
  if (typeof value === "string" && value.startsWith("http")) {
    urls.push(value);
  }
}

/** Collect seller / offer / merchant URLs from a SerpAPI shopping result item. */
export function collectSellerCandidateUrls(item: LinkCarrier): string[] {
  const urls: string[] = [];

  pushUrl(urls, item.merchant_link);

  const sellersResults = item.sellers_results;
  if (sellersResults && typeof sellersResults === "object") {
    const sr = sellersResults as LinkCarrier;
    for (const key of ["online_sellers", "sellers", "local_sellers"] as const) {
      const list = sr[key];
      if (Array.isArray(list)) {
        for (const seller of list) {
          if (seller && typeof seller === "object") {
            const s = seller as LinkCarrier;
            pushUrl(urls, s.link);
            pushUrl(urls, s.merchant_link);
            pushUrl(urls, s.url);
          }
        }
      }
    }
  }

  const buyingOptions = item.buying_options;
  if (Array.isArray(buyingOptions)) {
    for (const option of buyingOptions) {
      if (option && typeof option === "object") {
        const o = option as LinkCarrier;
        pushUrl(urls, o.link);
        pushUrl(urls, o.merchant_link);
      }
    }
  }

  const offers = item.offers;
  if (Array.isArray(offers)) {
    for (const offer of offers) {
      if (offer && typeof offer === "object") {
        const o = offer as LinkCarrier;
        pushUrl(urls, o.link);
        pushUrl(urls, o.merchant_link);
        pushUrl(urls, o.url);
      }
    }
  } else if (offers && typeof offers === "object") {
    const offerObj = offers as LinkCarrier;
    pushUrl(urls, offerObj.link);
    const nested = offerObj.online_sellers ?? offerObj.sellers;
    if (Array.isArray(nested)) {
      for (const seller of nested) {
        if (seller && typeof seller === "object") {
          const s = seller as LinkCarrier;
          pushUrl(urls, s.link);
          pushUrl(urls, s.merchant_link);
        }
      }
    }
  }

  return urls;
}

export function findFirstDirectSellerUrl(item: LinkCarrier): string | null {
  for (const candidate of collectSellerCandidateUrls(item)) {
    const normalized = normalizeMerchantUrl(candidate);
    if (isDirectMerchantUrl(normalized)) return normalized;
  }
  return null;
}

function linkFromEntry(entry: unknown): string | null {
  if (!entry || typeof entry !== "object") return null;
  const e = entry as LinkCarrier;
  const raw = e.link ?? e.merchant_link ?? e.url;
  if (typeof raw !== "string" || !raw.startsWith("http")) return null;
  const normalized = normalizeMerchantUrl(raw);
  return isDirectMerchantUrl(normalized) ? normalized : null;
}

function linkFromFirstInList(list: unknown): string | null {
  if (!Array.isArray(list) || list.length === 0) return null;
  return linkFromEntry(list[0]);
}

/**
 * Product API (google_shopping_product) — prioritized direct merchant extraction.
 */
export function findDirectMerchantLinkFromProductResponse(
  data: LinkCarrier,
): string | null {
  const sellersResults = data.sellers_results;
  if (sellersResults && typeof sellersResults === "object") {
    const sr = sellersResults as LinkCarrier;
    const fromOnline = linkFromFirstInList(sr.online_sellers);
    if (fromOnline) return fromOnline;
    const fromSellers = linkFromFirstInList(sr.sellers);
    if (fromSellers) return fromSellers;
  }

  const fromOffers = linkFromFirstInList(data.offers);
  if (fromOffers) return fromOffers;

  const fromBuying = linkFromFirstInList(data.buying_options);
  if (fromBuying) return fromBuying;

  return findFirstDirectSellerUrl(data);
}

export function buildButtonLabel(isDirectPurchase: boolean): "구매하기" | "가격 보기" {
  return isDirectPurchase ? "구매하기" : "가격 보기";
}

export type ResolvedPurchaseLinks = {
  link: string;
  purchaseLink: string;
  isDirectPurchase: boolean;
};

/**
 * Resolve display link + purchase button URL per priority rules.
 * Never uses serpapi_product_api for purchase.
 */
export function resolvePurchaseLinks(item: LinkCarrier): ResolvedPurchaseLinks | null {
  const productLink =
    typeof item.product_link === "string" ? item.product_link : undefined;
  const rawLink = typeof item.link === "string" ? item.link : undefined;

  const sellerDirect = findFirstDirectSellerUrl(item);
  if (sellerDirect) {
    return {
      link: productLink ?? rawLink ?? sellerDirect,
      purchaseLink: sellerDirect,
      isDirectPurchase: true,
    };
  }

  if (rawLink?.startsWith("http") && isDirectMerchantUrl(rawLink)) {
    const direct = normalizeMerchantUrl(rawLink);
    return {
      link: productLink ?? direct,
      purchaseLink: direct,
      isDirectPurchase: true,
    };
  }

  if (rawLink?.startsWith("http")) {
    const unwrapped = unwrapGoogleRedirect(rawLink);
    if (unwrapped && isDirectMerchantUrl(unwrapped)) {
      return {
        link: productLink ?? rawLink,
        purchaseLink: unwrapped,
        isDirectPurchase: true,
      };
    }
  }

  if (productLink?.startsWith("http")) {
    return {
      link: productLink,
      purchaseLink: productLink,
      isDirectPurchase: false,
    };
  }

  if (rawLink?.startsWith("http")) {
    return {
      link: rawLink,
      purchaseLink: rawLink,
      isDirectPurchase: isDirectMerchantUrl(rawLink),
    };
  }

  return null;
}
