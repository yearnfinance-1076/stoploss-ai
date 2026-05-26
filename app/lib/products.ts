export type ProductResult = {
  productId: string | null;
  fallbackLink: string;
  title: string;
  price: string;
  source: string;
  thumbnail?: string;
};

export type ProductOffersResponse = {
  purchaseLink: string;
  isDirectPurchase: boolean;
  source: string;
};

export type PriceSearchResponse = {
  searchQuery: string;
  products: ProductResult[];
};
