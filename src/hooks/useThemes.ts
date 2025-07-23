import { apiClient } from '@/api/apiClient';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface ThemeBase {
  themeId: number;
  name: string;
  image: string;
}

const fetchThemes = async (): Promise<ThemeBase[]> => {
  const res = await apiClient.get('/api/themes');
  return Array.isArray(res.data?.data) ? res.data.data : [];
};

export const useThemes = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  return { themes: data };
};
