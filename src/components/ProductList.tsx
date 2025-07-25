import { useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';
import type { ProductApiResponse } from '@/types/product';
import type { Theme } from '@/data/theme';
import { css } from '@emotion/react';
import theme from '@/data/theme';

const gridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing4};
  margin-top: ${theme.spacing.spacing6};

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface ProductListProps {
  products: ProductApiResponse[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  loading: boolean;
  error: string | null;
  onProductClick?: (productId: string | number) => void;
}

const ProductList = ({
  products,
  hasNextPage,
  fetchNextPage,
  loading,
  error,
  onProductClick,
}: ProductListProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });

      observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage]
  );
  const filteredProducts = products.filter(
    (product): product is ProductApiResponse =>
      product !== undefined && product !== null
  );
  if (!loading && filteredProducts.length === 0 && !error) {
    return <EmptyState />;
  }

  return (
    <div css={gridStyle(theme)}>
      {products.map((product, i) => (
        <div
          key={product.id}
          ref={i === filteredProducts.length - 1 ? lastRef : undefined}
          onClick={() => onProductClick && onProductClick(product.id)}
          style={{ cursor: 'pointer' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
