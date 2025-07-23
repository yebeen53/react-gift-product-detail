import { apiClient } from '@/api/apiClient';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface ThemeDetail {
  image: string | undefined;
  name: string;
  themeId: string;
  title: string;
  description: string | null;
  backgroundColor: string;
}

const fetchThemeDetail = async (themeId: string): Promise<ThemeDetail> => {
  const res = await apiClient.get(`/api/themes/${themeId}/info`);
  const data = res.data?.data;
  if (!data) {
    throw new Error('테마 정보가 없습니다.');
  }
  return data;
};

export const useThemeInfo = (themeId: string) => {
  return useSuspenseQuery({
    queryKey: ['themeDetail', themeId],
    queryFn: () => fetchThemeDetail(themeId),
  });
};
