import { css } from '@emotion/react';
import type { ProductApiResponse } from '@/types/product';
import theme, { type Theme } from '@/data/theme';

const cardStyle = (theme: Theme) => css`
  padding: ${theme.spacing.spacing3};
  background: ${theme.colors.semantic.backgroundDefault};
  border-radius: ${theme.spacing.spacing2};
  text-align: center;
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: ${theme.spacing.spacing1};
  }

  h4 {
    margin-top: ${theme.spacing.spacing2};
    font-size: ${theme.typography.title2Bold.fontSize};
    font-weight: ${theme.typography.title2Bold.fontWeight};
  }

  p {
    font-size: ${theme.typography.subtitle2Bold.fontSize};
    color: ${theme.colors.semantic.textDefault};
  }

  @media (max-width: 600px) {
    h4 {
      font-size: ${theme.typography.subtitle2Bold.fontSize};
    }
    p {
      font-size: ${theme.typography.subtitle2Bold.fontSize};
    }
  }
`;

const ProductCard = ({ product }: { product: ProductApiResponse }) => {
  return (
    <div css={cardStyle(theme)}>
      <img src={product.imageURL || '/fallback.png'} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.price.sellingPrice.toLocaleString()}원</p>
    </div>
  );
};

export default ProductCard;
