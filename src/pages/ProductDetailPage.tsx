import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import HighlightReview from '@/components/productdetail/HighlightReview';
import ProductAnnouncements from '@/components/productdetail/ProductAnnouncements';
import ProductDetailInfo from '@/components/productdetail/ProductDetailInfo';
import ProductDetailSummary from '@/components/productdetail/ProductDetailSummary';

import FixedOrderBar from '@/components/productdetail/FixedOrderBar';
import theme from '@/data/theme';
const Loading = () => <div>로딩 중...</div>;

const TAB_LIST = [
  { key: 'detail', label: '상품 설명' },
  { key: 'review', label: '선물 후기' },
  { key: 'announcement', label: '상세 정보' },
] as const;

type TabKey = (typeof TAB_LIST)[number]['key'];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const [activeTab, setActiveTab] = useState<TabKey>('detail');

  if (!productId) return <div>잘못된 입력</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':
        return (
          <Suspense fallback={<div>상품 정보를 불러오고 있습니다</div>}>
            <ProductDetailInfo productId={productId} />
          </Suspense>
        );
      case 'announcement':
        return (
          <Suspense fallback={<div>상세 정보를 불러오고 있습니다</div>}>
            <ProductAnnouncements productId={productId} />
          </Suspense>
        );
      case 'review':
        return (
          <Suspense fallback={<div>선물 후기를 불러오고 있습니다</div>}>
            <HighlightReview productId={productId} />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary
      fallback={<div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>}
    >
      <Suspense fallback={<Loading />}>
        <ProductDetailSummary productId={productId} />

        <div
          style={{
            display: 'flex',
            gap: theme.spacing.spacing1,
            margin: theme.spacing.spacing4,
          }}
        >
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: `${theme.spacing.spacing2} ${theme.spacing.spacing4}`,
                backgroundColor:
                  activeTab === tab.key
                    ? theme.colors.semantic.textDefault
                    : theme.colors.semantic.backgroundDefault,
                color:
                  activeTab === tab.key
                    ? theme.colors.semantic.backgroundDefault
                    : theme.colors.semantic.textDefault,
                border: 'none',
                borderRadius: theme.spacing.spacing2,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: theme.spacing.spacing4 }}>
          {renderTabContent()}
        </div>
        <FixedOrderBar productId={productId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductDetailPage;
