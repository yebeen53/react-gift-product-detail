import { Suspense } from 'react';
import { useProductDetail } from '@/hooks/useProduct';
import theme from '@/data/theme';

interface Props {
  productId: string;
}

const ProductDetailInfoInner = ({ productId }: Props) => {
  const { data: detail } = useProductDetail(productId);
  if (!detail) {
    return <div>로딩중...</div>; 
  }

  return (
    <section style={{ margin: theme.spacing.spacing4 }}>
      <h2>상품설명</h2>
      <div dangerouslySetInnerHTML={{ __html: detail.description }} />
      {detail.images?.map((img: string, idx: number) => (
        <img key={img} src={img} alt={`상품 상세 이미지${idx}`} />
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
