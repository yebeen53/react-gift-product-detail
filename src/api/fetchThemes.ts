import { apiClient } from './apiClient';

export interface ThemeDetail {
  themeId: number;
  name: string;
  title: string;
  description: string | null;
  backgroundColor: string;
}

export const fetchThemeDetail = async (
  themeId: number
): Promise<ThemeDetail | null> => {
  try {
    const res = await apiClient.get(`/api/themes/${themeId}/info`);
    return res.data?.data ?? null;
  } catch (err) {
    console.error('테마 상세 조회 실패:', err);
    return null;
  }
};
