export interface ProductApiResponse {
  id: number;
  name: string;
  gender: string;
  category: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}
export interface Product {
  list: ProductApiResponse[];
  cursor: ['themeProducts', string] | null | undefined;
  hasMoreList: boolean;
  image: string | undefined;
  id: number;
  brand: string;
  name: string;
  price: number;
  imageURL: string;
  ranking: number;
}
export interface ThemeProductsData {
  list: ProductApiResponse[];
  cursor: number;
  hasMoreList: boolean;
}
