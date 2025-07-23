import { css } from '@emotion/react';
import type { Theme } from '@/data/theme';

interface GiftItemProps {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  theme: Theme;
  highlight?: boolean;
  rank?: number;
}

const cardStyle = (theme: Theme) => css`
  position: relative;
  border-radius: ${theme.spacing.spacing2};
  overflow: hidden;
  padding: ${theme.spacing.spacing2};
  text-align: center;
`;

const rankBadge = (theme: Theme, highlight?: boolean) => css`
  position: absolute;
  top: ${theme.spacing.spacing2};
  left: ${theme.spacing.spacing1};
  background-color: ${highlight ? theme.colors.red800 : theme.colors.gray700};
  color: white;
  font-size: ${theme.typography.label1Bold.fontSize};
  width: ${theme.spacing.spacing6};
  height: ${theme.spacing.spacing6};
  border-radius: ${theme.spacing.spacing2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.title1Bold.fontWeight};
`;

const imageStyle = (theme: Theme) => css`
  width: 100%;
  height: auto;
  margin-bottom: ${theme.spacing.spacing2};
`;

const brandStyle = (theme: Theme) => css`
  font-size: ${theme.typography.label1Bold.fontSize};
  color: ${theme.colors.semantic.textDefault};
`;

const nameStyle = (theme: Theme) => css`
  font-weight: ${theme.typography.title1Bold.fontWeight};
  margin-top: ${theme.spacing.spacing1};
`;

const priceStyle = (theme: Theme) => css`
  font-weight: ${theme.typography.title1Bold.fontWeight};
  margin-top: ${theme.spacing.spacing1};
`;

const GiftItem = ({
  brand,
  name,
  price,
  image,
  theme,
  rank,
  highlight,
}: GiftItemProps) => {
  return (
    <div css={cardStyle(theme)}>
      {typeof rank === 'number' && (
        <div css={rankBadge(theme, highlight)}>{rank}</div>
      )}
      <img src={image} alt={name} css={imageStyle(theme)} />
      <div css={brandStyle(theme)}>{brand}</div>
      <div css={nameStyle(theme)}>{name}</div>
      <div css={priceStyle(theme)}>{price.toLocaleString()} 원</div>
    </div>
  );
};

export default GiftItem;
