export type ProductResult = {
  title: string;
  price: string;
  source: string;
  /** Raw SerpAPI `link` field (debug). */
  link: string | null;
  /** Raw SerpAPI `product_link` (debug). */
  product_link: string | null;
  /** First offer / seller link from `offers` (debug). */
  offers_link: string | null;
  /** SerpAPI `serpapi_product_api` (debug). */
  serpapi_link: string | null;
  /** First direct merchant URL if found (debug). */
  direct_link: string | null;
  /** Raw SerpAPI `sellers_results` (debug). */
  sellers_results: unknown;
  /** URL opened by the purchase / price button. */
  purchaseLink: string;
  /** True when purchaseLink points to a direct merchant (not Google Shopping). */
  isDirectPurchase: boolean;
  thumbnail?: string;
};

export type PriceSearchResponse = {
  searchQuery: string;
  products: ProductResult[];
};
