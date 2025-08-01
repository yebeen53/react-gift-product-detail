import { type Theme } from '@/data/theme';

type ProductSummaryProps = {
  product: {
    imageURL?: string;
    name: string;
    brandName?: string;
    price: number;
  }| null;
  theme: Theme;
};

const ProductSummary = ({ product, theme }: ProductSummaryProps) => {
  if (!product) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.spacing4,
        marginTop: theme.spacing.spacing5,
        border: `1px solid ${theme.colors.semantic.borderDefault}`,
      }}
    >
      {product.imageURL && (
        <img
          src={product.imageURL}
          alt={product.name}
          style={{
            width: theme.spacing.spacing16,
            height: theme.spacing.spacing16,
            objectFit: 'cover',
            borderRadius: theme.colors.semantic.borderDefault,
          }}
        />
      )}
      <div>
        <h3
          style={{
            fontSize: theme.typography.title2Bold.fontSize,
            fontWeight: theme.typography.title1Bold.fontWeight,
            marginBottom: theme.spacing.spacing1,
          }}
        >
          {product.name}
        </h3>
        {product.brandName && (
          <p
            style={{
              color: theme.colors.semantic.textDefault,
              fontSize: theme.typography.subtitle2Bold.fontSize,
            }}
          >
            {product.brandName}
          </p>
        )}
        <p
          style={{
            fontWeight: theme.typography.title1Regular.fontWeight,
            marginTop: theme.spacing.spacing1,
          }}
        >
          상품가 {product.price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};
export default ProductSummary;
