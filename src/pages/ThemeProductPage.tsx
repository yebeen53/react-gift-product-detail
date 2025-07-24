import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSuspenseThemeInfo } from '@/hooks/useSuspenseThemeInfo';
import { useSuspenseThemeProducts } from '@/hooks/useSuspenseThemeProduct';

import HeroBanner from '@/components/HeroBanner';
import ProductList from '@/components/ProductList';
import type { Theme } from '@/data/theme';
import theme from '@/data/theme';
import { ROUTES } from '@/constants/routes';

const containerStyle = (theme: Theme) => css`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing.spacing4};
`;

const ThemeProductContent = ({ themeId }: { themeId: string }) => {
  const navigate = useNavigate();
  const { data: bannerInfo } = useSuspenseThemeInfo(themeId);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseThemeProducts(themeId);

  const products = data?.pages.flatMap((page) => page.list) ?? [];

  const handleProductClick = (productId: string | number) => {
    navigate(`/order/${productId}`);
  };

  return (
    <div css={containerStyle(theme)}>
      {bannerInfo && (
        <HeroBanner
          info={{
            title: bannerInfo.title ?? bannerInfo.name,
            subtitle: bannerInfo.name,
            description: bannerInfo.description ?? '',
            backgroundColor: bannerInfo.backgroundColor ?? '#333',
            image: bannerInfo.image,
          }}
        />
      )}

      <ProductList
        products={products}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        loading={isFetchingNextPage}
        onProductClick={handleProductClick}
        error={null}
      />
    </div>
  );
};

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();

  if (!themeId) return <p>테마 ID가 없습니다.</p>;

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (error?.response?.status === 404) {
          navigate(ROUTES.HOME);
          return null;
        }
        return <p>문제가 발생했습니다. 다시 시도해주세요.</p>;
      }}
    >
      <Suspense fallback={<p>로딩 중...</p>}>
        <ThemeProductContent themeId={themeId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ThemeProductPage;
