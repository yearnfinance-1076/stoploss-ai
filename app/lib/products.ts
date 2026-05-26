export type ProductResult = {
  title: string;
  price: string;
  source: string;
  link: string;
  thumbnail?: string;
};

export type PriceSearchResponse = {
  searchQuery: string;
  products: ProductResult[];
};
