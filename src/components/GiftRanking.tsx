import { useState, Suspense } from 'react';
import { css } from '@emotion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';


import useCustomTheme from '../hooks/useCustomTheme';
import Button from '@/components/Button';
import GiftItem from '@/components/GiftItem';
import { useSuspenseGiftRankingProducts } from '@/hooks/useSuspenseGiftRankingProducts';
import type { Product } from '@/types/product';
import { ErrorBoundary } from './ErrorBoundary';

const DEFAULT_GENDER = '전체';
const DEFAULT_CATEGORY = '받고 싶어한';
const INITIAL_VISIBLE_COUNT = 6;

const userLabelToCodeMap = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
} as const;

const giftRankingCategoryLabelToCodeMap = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
} as const;

export type UserGenderLabel = keyof typeof userLabelToCodeMap;
export type GiftRankingCategoryLabel =
  keyof typeof giftRankingCategoryLabelToCodeMap;

const tabs: UserGenderLabel[] = Object.keys(
  userLabelToCodeMap
) as UserGenderLabel[];
const subTabs: GiftRankingCategoryLabel[] = Object.keys(
  giftRankingCategoryLabelToCodeMap
) as GiftRankingCategoryLabel[];

const GiftRanking = () => {
  const theme = useCustomTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const selectedTab = tabs.includes(
    searchParams.get('gender') as UserGenderLabel
  )
    ? (searchParams.get('gender') as UserGenderLabel)
    : DEFAULT_GENDER;

  const selectedSubTab = subTabs.includes(
    searchParams.get('category') as GiftRankingCategoryLabel
  )
    ? (searchParams.get('category') as GiftRankingCategoryLabel)
    : DEFAULT_CATEGORY;

  const genderCode = userLabelToCodeMap[selectedTab];
  const categoryCode = giftRankingCategoryLabelToCodeMap[selectedSubTab];

  const updateParams = (
    gender?: UserGenderLabel,
    category?: GiftRankingCategoryLabel
  ) => {
    const current = new URLSearchParams(searchParams);
    if (gender) current.set('gender', gender);
    if (category) current.set('category', category);
    setSearchParams(current, { replace: true });
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleProductClick = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const { data: products } = useSuspenseGiftRankingProducts(
    genderCode,
    categoryCode
  );

  return (
    <section
      css={css`
        padding: ${theme.spacing.spacing5};
      `}
    >
      <h2
        css={css`
          font-size: ${theme.typography.title1Bold.fontSize};
          font-weight: ${theme.typography.title1Bold.fontWeight};
          margin-bottom: ${theme.spacing.spacing4};
        `}
      >
        실시간 급상승 선물랭킹
      </h2>

      <div
        css={css`
          display: flex;
          gap: ${theme.spacing.spacing2};
          margin-bottom: ${theme.spacing.spacing3};
        `}
      >
        {tabs.map((tab) => (
          <Button
            key={tab}
            selected={tab === selectedTab}
            baseColor={theme.colors.blue400}
            selectedColor={theme.colors.blue900}
            onClick={() => updateParams(tab, undefined)}
          >
            {tab}
          </Button>
        ))}
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-around;
          margin-bottom: ${theme.spacing.spacing4};
          font-size: ${theme.typography.label1Regular};
        `}
      >
        {subTabs.map((subTab) => (
          <Button
            key={subTab}
            onClick={() => updateParams(undefined, subTab)}
            selected={subTab === selectedSubTab}
            baseColor={theme.colors.blue400}
            selectedColor={theme.colors.blue900}
            transparent
          >
            {subTab}
          </Button>
        ))}
      </div>

      {products.length === 0 ? (
        <p
          css={css`
            text-align: center;
            margin: ${theme.spacing.spacing5};
            font-size: ${theme.typography.title1Bold.fontSize};
          `}
        >
          상품이 없습니다.
        </p>
      ) : (
        <>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: ${theme.spacing.spacing4};
            `}
          >
            {products.slice(0, visibleCount).map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleProductClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <GiftItem
                  id={item.id}
                  brand={item.brand}
                  name={item.name}
                  price={item.price}
                  image={item.imageURL}
                  highlight={index < 3}
                  rank={index + 1}
                  theme={theme}
                />
              </div>
            ))}
          </div>

          {visibleCount < products.length && (
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <Button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                baseColor="white"
                textColor="black"
              >
                더보기
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

const GiftRankingWrapper = () => (
  <ErrorBoundary fallback={<p>데이터를 불러오는데 실패했습니다.</p>}>
    <Suspense fallback={<p>로딩 중입니다...</p>}>
      <GiftRanking />
    </Suspense>
  </ErrorBoundary>
);

export default GiftRankingWrapper;
