import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

interface ProductDetail {
  description: string;
  announcements: Announcement[];
}

const fetchProductDetail = async (productId: string): Promise<ProductDetail> => {
  const response = await axios.get(`/api/products/${productId}/detail`);
  return response.data.data;
};

export const useProductDetail = (productId: string) =>
  useSuspenseQuery({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(productId),
  });
