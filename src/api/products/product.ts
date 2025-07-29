import { apiClient } from '../apiClient';

export const fetchProduct = async (productId: string) => {
  const res = await apiClient.get(`/api/products/${productId}`);
  return res.data?.data;
};

export const fetchProductDetail = async (productId: string) => {
  const res = await apiClient.get(`/api/products/${productId}/detail`);
  return res.data?.data;
};

export const fetchHighlightReview = async (productId: string) => {
  const res = await apiClient.get(
    `/api/products/${productId}/highlight-review`
  );
  return res.data?.data;
};

export const fetchWishCount = async (productId: string) => {
  const res = await apiClient.get(`/api/products/${productId}/wish`);
  return res.data?.data;
};
