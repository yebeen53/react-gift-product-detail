import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import axios from 'axios';
import ProductList from '@/components/ProductList';
import { useThemeProducts } from '@/hooks/useThemeProduct';
import { useThemeInfo } from '@/hooks/useThemeInfo';
import HeroBanner from '@/components/HeroBanner';
import type { Theme } from '@/data/theme';
import theme from '@/data/theme';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';

const containerStyle = (theme: Theme) => css`
  max-width: 960px;
  margin: 0 auto;
  padding: ${theme.spacing.spacing4};
`;

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { info: bannerInfo, error: themeError } = useThemeInfo(themeId ?? '');
  const {
    products,
    loading: productsLoading,
    error: productsError,
    hasNextPage,
    fetchNextProduct,
  } = useThemeProducts(themeId ?? '');

  useEffect(() => {
    if (
      themeError &&
      axios.isAxiosError(themeError) &&
      themeError.response?.status === 404
    ) {
      navigate(ROUTES.HOME);
    }
  }, [themeError, navigate]);

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

      {themeError && !axios.isAxiosError(themeError) && (
        <p>테마 정보를 불러오지 못했습니다.</p>
      )}

      {productsError && (
        <p>상품 목록을 불러오지 못했습니다: {String(productsError)}</p>
      )}

      <ProductList
        products={products}
        hasNextPage={hasNextPage}
        setPage={fetchNextProduct}
        loading={productsLoading}
        error={productsError}
        onProductClick={handleProductClick}
      />
    </div>
  );
};

export default ThemeProductPage;
