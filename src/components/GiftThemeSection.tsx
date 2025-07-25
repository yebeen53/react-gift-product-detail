import { css } from '@emotion/react';
import useCustomTheme from '../hooks/useCustomTheme';
import type { Theme } from '@/data/theme';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchThemes, type ThemeItem } from '@/api/themes';

const wrapperStyle = (theme: Theme) => css`
  padding: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing15};
`;

const titleStyle = (theme: Theme) => css`
  font-size: ${theme.typography.title2Bold.fontSize};
  font-weight: ${theme.typography.title2Bold.fontWeight};
  margin-bottom: ${theme.spacing.spacing4};
`;

const gridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${theme.spacing.spacing4};

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const itemStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: ${theme.spacing.spacing15};
  height: ${theme.spacing.spacing15};
  object-fit: contain;
  padding: ${theme.spacing.spacing2};
  margin: ${theme.spacing.spacing2};
  span {
    font-size: ${theme.typography.label1Regular.fontSize};
    font-weight: ${theme.typography.label1Regular.fontWeight};
    line-height: ${theme.typography.label1Regular.lineHeight};
    color: ${theme.colors.semantic.textDefault};
    margin-top: ${theme.spacing.spacing2};
  }
`;

const GiftThemeSection = () => {
  const theme = useCustomTheme();
  const navigate = useNavigate();

  const { data: themes, isLoading, isError } = useQuery<ThemeItem[]>({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  if (isLoading) return <div css={wrapperStyle(theme)}>로딩 중...</div>;
  if (isError || !themes || themes.length === 0) return null;

  return (
    <section css={wrapperStyle(theme)}>
      <h2 css={titleStyle(theme)}>선물 테마</h2>
      <div css={gridStyle(theme)}>
        {themes.map((item) => (
          <div
            key={item.themeId}
            css={itemStyle(theme)}
            onClick={() => navigate(`/themes/${item.themeId}`)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftThemeSection;
