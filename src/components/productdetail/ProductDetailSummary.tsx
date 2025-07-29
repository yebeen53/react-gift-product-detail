import theme from '@/data/theme';
import { useProduct } from '@/hooks/useProduct';

interface Props {
  productId: string;
}

const ProductDetailSummary = ({ productId }: Props) => {
  const { data: product } = useProduct(productId);

  return (
    <section>
      <img src={product.imageURL} />
      <h1 style={{ margin: theme.spacing.spacing4,}}>{product.name}</h1>
      <h1 style={{ margin: theme.spacing.spacing4, }}>{product.price.sellingPrice}원</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.spacing2,
          margin: theme.spacing.spacing4,
        }}
      >
        <img
          src={product.brandInfo.imageURL}
          alt={product.brandInfo.name}
          style={{ height: theme.spacing.spacing8, width: 'auto', objectFit: 'contain' }}
        />
        <h1 style={{ fontSize: theme.spacing.spacing8, margin: 0 }}>
          {product.brandInfo.name}
        </h1>
      </div>
    </section>
  );
};

export default ProductDetailSummary;
