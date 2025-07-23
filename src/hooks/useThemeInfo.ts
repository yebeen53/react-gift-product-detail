import { useState, useEffect } from 'react';
import { apiClient } from '@/api/apiClient';

export interface ThemeDetail {
  image: string | undefined;
  name: string;
  themeId: string;
  title: string;
  description: string | null;
  backgroundColor: string;
}

const fetchThemeDetail = async (themeId: string): Promise<ThemeDetail | null> => {
  try {
    const res = await apiClient.get(`/api/themes/${themeId}/info`);
    return res.data?.data ?? null;
  } catch {
    return null;
  }
};

export const useThemeInfo = (themeId: string | null) => {
  const [info, setInfo] = useState<ThemeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (themeId === null) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchThemeDetail(themeId);
        setInfo(data);
      } catch {
        setError('테마 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [themeId]);

  return { info, loading, error };
};
