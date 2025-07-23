import { css } from '@emotion/react';
import useCustomTheme from '../hooks/useCustomTheme';
import type { Theme } from '@/data/theme';

const containerStyle = (theme: Theme) => css`
  background-color: ${theme.colors.semantic.kakaoYellow};
  border-radius: ${theme.spacing.spacing2};
  display: flex;
  flex-direction: column;
  color: ${theme.colors.semantic.textDefault};
  padding: ${theme.spacing.spacing4};
  gap: ${theme.spacing.spacing1};
`;

const textStyle = (theme: Theme) => css`
  font-size: ${theme.typography.label1Regular.fontSize};
  font-weight: ${theme.typography.label1Regular.fontWeight};
  line-height: ${theme.typography.label1Regular.lineHeight};
  color: ${theme.colors.semantic.textDefault};
  margin: 0;
`;

const t2Style = (theme: Theme) => css`
  font-size: ${theme.typography.subtitle1Bold.fontSize};
  font-weight: ${theme.typography.subtitle1Bold.fontWeight};
  line-height: ${theme.typography.subtitle1Bold.lineHeight};
  color: ${theme.colors.semantic.textDefault};
  margin: 0;
`;

const Banner = () => {
  const theme = useCustomTheme();
  return (
    <div css={containerStyle(theme)}>
      <p css={textStyle(theme)}>카카오테크 캠퍼스 3기 여러분</p>
      <p css={t2Style(theme)}>프론트엔드 2단계 과제 화이팅! 🎉</p>
    </div>
  );
};
export default Banner;
