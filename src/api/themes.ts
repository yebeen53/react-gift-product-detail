import { apiClient } from './apiClient';
export interface ThemeItem {
  themeId: number;
  name: string;
  image: string;
}

export const fetchThemes = async (): Promise<ThemeItem[]> => {
  const res = await apiClient.get('/api/themes');
  const data = res.data?.data;
  return Array.isArray(data) ? data : [];
};
