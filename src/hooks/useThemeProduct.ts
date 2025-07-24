import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import type { ProductApiResponse } from '@/types/product';

export const useThemeProducts = (themeId: string) => {
  const [products, setProducts] = useState<ProductApiResponse[]>([]);
  const [, setCursor] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  const cursorRef = useRef(0);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/themes/${themeId}/products`, {
          params: { cursor: 0, limit },
        });
        const data = res.data.data;

        setProducts(data.list);
        setCursor(data.cursor);
        cursorRef.current = data.cursor;
        setHasNextPage(data.hasMoreList);
      } catch (err) {
        console.error('API 요청 실패:', err);
        setError('상품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    setProducts([]);
    setCursor(0);
    cursorRef.current = 0;
    setHasNextPage(true);
    setError(null);
    fetchProducts();
  }, [themeId]);

  const fetchNextProduct = useCallback(async () => {
    if (!hasNextPage || loading) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/themes/${themeId}/products`, {
        params: { cursor: cursorRef.current, limit },
      });
      const data = res.data.data;
      setProducts((prev) => {
        const combined = [...prev, ...data.list];
        const uniqueMap = new Map<number, ProductApiResponse>();
        combined.forEach((item) => uniqueMap.set(item.id, item));
        return Array.from(uniqueMap.values());
      });

      setCursor(data.cursor);
      cursorRef.current = data.cursor;
      setHasNextPage(data.hasMoreList);
    } catch (err) {
      console.error('다음 페이지 fetch 실패:', err);
      setError('상품을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [themeId, hasNextPage, loading]);
  return { products, hasNextPage, loading, error, fetchNextProduct };
};
