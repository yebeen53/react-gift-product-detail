export const DEFAULT_GENDER = '전체';
export const DEFAULT_CATEGORY = '받고 싶어한';
export const INITIAL_VISIBLE_COUNT = 6;

export const userLabelToCodeMap = {
  전체: 'ALL',
  여성이: 'FEMALE',
  남성이: 'MALE',
  청소년이: 'TEEN',
} as const;

export const giftRankingCategoryLabelToCodeMap = {
  '받고 싶어한': 'MANY_WISH',
  '많이 선물한': 'MANY_RECEIVE',
  '위시로 받은': 'MANY_WISH_RECEIVE',
} as const;

export type UserGenderLabel = keyof typeof userLabelToCodeMap;
export type GiftRankingCategoryLabel = keyof typeof giftRankingCategoryLabelToCodeMap;

export const tabs: UserGenderLabel[] = Object.keys(
  userLabelToCodeMap
) as UserGenderLabel[];

export const subTabs: GiftRankingCategoryLabel[] = Object.keys(
  giftRankingCategoryLabelToCodeMap
) as GiftRankingCategoryLabel[];
