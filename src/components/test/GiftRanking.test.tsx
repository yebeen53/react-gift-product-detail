import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import GiftRankingWrapper from '../GiftRanking';
import { ErrorBoundary } from '../ErrorBoundary';
import { fetchRanking } from '@/api/products/ranking';

jest.mock('@/hooks/useCustomTheme', () => ({
  __esModule: true,
  default: () => ({
    spacing: {
      spacing1: '4px',
      spacing2: '8px',
      spacing3: '12px',
      spacing4: '16px',
      spacing5: '20px',
      spacing6: '24px',
    },
    typography: {
      title1Bold: { fontSize: '20px', fontWeight: '700' },
      label1Bold: { fontSize: '14px', fontWeight: '600' },
      label1Regular: '14px',
    },
    colors: {
      blue400: '#4F9DDE',
      blue900: '#1A3C6E',
      red800: '#D32F2F',
      gray700: '#616161',
      semantic: {
        textDefault: '#000000',
      },
    },
  }),
}));

jest.mock('@/api/products/ranking', () => ({
  fetchRanking: jest.fn(),
}));

const rankingData = [
  { id: 1, name: '초콜릿', brand: '고디바', price: 25000, imageURL: 'choco.jpg' },
  { id: 2, name: '커피 쿠폰', brand: '스타벅스', price: 5000, imageURL: 'coffee.jpg' },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ErrorBoundary fallback={<p data-testid="error">데이터를 불러오는데 실패했습니다.</p>}>
          <Suspense fallback={<p data-testid="loading">로딩 중입니다...</p>}>
            {component}
          </Suspense>
        </ErrorBoundary>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('GiftRanking 컴포넌트', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.resetAllMocks();
  });

  test('선물 랭킹을 성공적으로 불러와 표시해야 함', async () => {
    (fetchRanking as jest.Mock).mockResolvedValueOnce(rankingData);

    renderWithProviders(<GiftRankingWrapper />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    expect(screen.getByText('초콜릿')).toBeInTheDocument();
    expect(screen.getByText('고디바')).toBeInTheDocument();
    expect(screen.getAllByText(/25,000\s*원/)[0]).toBeInTheDocument();
    expect(screen.getByText('커피 쿠폰')).toBeInTheDocument();
    expect(screen.getAllByText(/5,000\s*원/)[0]).toBeInTheDocument();
  });

  test('데이터가 비어있을 때 메시지를 표시해야 함', async () => {
    (fetchRanking as jest.Mock).mockResolvedValueOnce([]);

    renderWithProviders(<GiftRankingWrapper />);

    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.getByText('상품이 없습니다.')).toBeInTheDocument()
    );
  });

 
  test('API 에러 발생 시 에러 메시지를 표시해야 함', async () => {
    (fetchRanking as jest.Mock).mockRejectedValueOnce(new Error('Internal Server Error'));

    renderWithProviders(<GiftRankingWrapper />);
    await waitFor(() =>
      expect(screen.getByTestId('error')).toHaveTextContent('데이터를 불러오는데 실패했습니다.')
    );
  });
});