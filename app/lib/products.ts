export type ProductResult = {
  title: string;
  price: string;
  source: string;
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
