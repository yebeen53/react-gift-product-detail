import { css } from '@emotion/react';
import useCustomTheme from '../hooks/useCustomTheme';
import type { Theme } from '@/data/theme';
import useAuth from '@/hooks/useAuth';
const containerStyle = (theme: Theme) => css`
  padding: ${theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.spacing4};
  height: ${theme.spacing.spacing16};
`;
const friendBoxStyle = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing2};
  border-radius: ${theme.spacing.spacing2};
`;

const plusCircleStyle = (theme: Theme) => css`
  width: ${theme.spacing.spacing10};
  height: ${theme.spacing.spacing10};
  background-color: ${theme.colors.semantic.kakaoYellow};
  color: ${theme.colors.semantic.textDefault};
  font-size: ${theme.typography.title2Regular.lineHeight};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  border-radius: ${theme.spacing.spacing2};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const bannerStyle = (theme: Theme) => css`
  background-color: ${theme.colors.semantic.backgroundDefault};
  padding: ${theme.spacing.spacing2};
  font-size: ${theme.typography.label2Regular.fontSize};
  border-radius: ${theme.spacing.spacing2};
`;
const SelectFr = () => {
  const theme = useCustomTheme();
  const { user } = useAuth();

  const userName = user?.email ? user.email.split('@')[0] + '님' : '';

  return (
    <div css={containerStyle(theme)}>
      <div css={friendBoxStyle(theme)}>
        <div css={plusCircleStyle(theme)}>+</div>
        <span>{userName} 선물할 친구를 선택해 주세요.</span>
      </div>
      <div css={bannerStyle(theme)}></div>
    </div>
  );
};
export default SelectFr;
