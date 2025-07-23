import { apiClient } from "../apiClient";
import type { Product, ProductApiResponse } from "@/types/product";

export const fetchRanking=async(
  gender: string,
  category: string
): Promise<Product[]>=>{
  const params = { gender, category };
  const response = await apiClient.get('/api/products/ranking', { params });
  const data= response.data?.data ?? [];
  return data.map((item: ProductApiResponse, index: number) => ({
    id: item.id,
    brand: item.brandInfo?.name || '',
    name: item.name,
    price: item.price?.sellingPrice || 0,
    imageURL: item.imageURL,
    ranking: index + 1,
  }));
};

