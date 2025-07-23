import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchThemeProducts = async ({ pageParam = 0, queryKey }: any) => {
  const [, themeId] = queryKey;
  const res = await axios.get(`/api/themes/${themeId}/products`, {
    params: { cursor: pageParam, limit: 10 },
  });
  return res.data.data;
};

export const useThemeProducts = (themeId: string) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['themeProducts', themeId],
    queryFn: fetchThemeProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMoreList ? lastPage.cursor : undefined;
    },
  });
};
