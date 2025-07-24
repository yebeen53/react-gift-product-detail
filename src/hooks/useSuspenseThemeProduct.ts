import {
  useSuspenseInfiniteQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';
import axios from 'axios';
import type { ThemeProductsData } from '@/types/product';

const fetchThemeProducts = async (
  ctx: QueryFunctionContext<readonly [string, string], number>
): Promise<ThemeProductsData> => {
  const [, themeId] = ctx.queryKey;
  const pageParam = ctx.pageParam ?? 0;

  const res = await axios.get(`/api/themes/${themeId}/products`, {
    params: { cursor: pageParam, limit: 10 },
  });
  const data = res.data.data;

  return {
    list: data.list,
    cursor: data.cursor,
    hasMoreList: data.hasMoreList,
  };
};

export const useSuspenseThemeProducts = (themeId: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['themeProducts', themeId] as const,
    queryFn: fetchThemeProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasMoreList ? lastPage.cursor : undefined,
  });
};
