import { fetchRanking } from '@/api/products/ranking';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseGiftRankingProducts = (
  genderCode: string,
  categoryCode: string
) => {
  return useSuspenseQuery({
    queryKey: ['giftRankingProducts', genderCode, categoryCode],
    queryFn: () => fetchRanking(genderCode, categoryCode),
  });
};
