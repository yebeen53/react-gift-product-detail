import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiClient } from '@/api/apiClient';

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
  const [themes, setThemes] = useState<ThemeBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchThemes();
        setThemes(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const msg =
            err.response?.data?.message || '서버 요청 중 오류가 발생했습니다.';
          setError(msg);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { themes, loading, error };
};