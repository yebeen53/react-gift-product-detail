import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import useCustomTheme from '../hooks/useCustomTheme';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@/components/Button';
import GiftItem from '@/components/GiftItem';
import { apiClient } from '@/api/apiClient';
import type { ProductApiResponse, Product } from '@/types/product';

const DEFAULT_GENDER: UserGenderLabel = '전체';
const DEFAULT_CATEGORY: GiftRankingCategoryLabel = '받고 싶어한';

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
export type UserGenderCode = (typeof userLabelToCodeMap)[UserGenderLabel];
export type GiftRankingCategoryLabel =
  keyof typeof giftRankingCategoryLabelToCodeMap;
export type GiftRankingCategoryCode =
  (typeof giftRankingCategoryLabelToCodeMap)[GiftRankingCategoryLabel];

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

  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const fetchData = async (
    genderCode: UserGenderCode,
    categoryCode: GiftRankingCategoryCode
  ) => {
    setLoading(true);
    setError(false);
    try {
      const params = { targetType: genderCode, rankType: categoryCode };
      const response = await apiClient.get('/api/products/ranking', { params });

      const productList =
        response.data?.data?.map((item: ProductApiResponse, index: number) => ({
          id: item.id,
          brand: item.brandInfo?.name || '',
          name: item.name,
          price: item.price?.sellingPrice || 0,
          imageURL: item.imageURL,
          ranking: index + 1,
        })) ?? [];

      setProducts(productList);
    } catch (err) {
      console.error('랭킹 호출 실패:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const genderCode = userLabelToCodeMap[selectedTab];
    const categoryCode = giftRankingCategoryLabelToCodeMap[selectedSubTab];
    console.log('[API 호출]', genderCode, categoryCode);

    fetchData(genderCode, categoryCode);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [selectedTab, selectedSubTab]);

  const updateParams = (
    gender?: UserGenderLabel,
    category?: GiftRankingCategoryLabel
  ) => {
    const current = new URLSearchParams(searchParams);
    if (gender) current.set('gender', gender);
    if (category) current.set('category', category);
    setSearchParams(current, { replace: true });
  };

  const handleMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, products.length));
  };

  const handleProductClick = (product: Product) => {
    navigate(`/order/${product.id}`);
  };

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>데이터를 불러오는데 실패했습니다.</p>;

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
              <Button onClick={handleMore} baseColor="white" textColor="black">
                더보기
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default GiftRanking;
