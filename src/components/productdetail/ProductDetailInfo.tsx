import { Suspense } from 'react';
import { useProductDetail } from '@/hooks/useProduct';

interface Props {
  productId: string;
}

const ProductDetailInfoInner = ({ productId }: Props) => {
  const { data: detail } = useProductDetail(productId);

  return (
    <section style={{ margin: '1rem' }}>
      <h2>상품설명</h2>
      <div dangerouslySetInnerHTML={{ __html: detail.description }} />
      {detail.images?.map((img: string, idx: number) => (
        <img key={idx} src={img} alt={`detail-${idx}`} />
      ))}
    </section>
  );
};

const ProductDetailInfo = (props: Props) => (
  <Suspense fallback={<div>Loading product detail...</div>}>
    <ProductDetailInfoInner {...props} />
  </Suspense>
);

export default ProductDetailInfo;
