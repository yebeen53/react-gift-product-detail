import type { Theme } from '@/data/theme';
import theme from '@/data/theme';
import { css } from '@emotion/react';

export type HeroThemeInfo = {
  title: string; 
  subtitle: string; 
  description: string;
  backgroundColor: string;
  image?: string;
};

const bannerStyle = (color: string,theme:Theme) => css`
  background-color: ${color};
  height: 200px;
  padding: ${theme.spacing.spacing5};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: ${theme.colors.semantic.backgroundDefault};
  border-radius: ${theme.spacing.spacing2};
  position: relative;
  overflow: hidden;
`;

const imageStyle =(theme:Theme)=> css`
  position: absolute;
  top: ${theme.spacing.spacing5};
  right: ${theme.spacing.spacing5};
  width: ${theme.spacing.spacing16};
  height:${theme.spacing.spacing16};
  border-radius: ${theme.spacing.spacing2};
  object-fit: cover;
  box-shadow: 0 0 ${theme.spacing.spacing1} rgba(0, 0, 0, 0.3);
`;

const titleStyle =(theme:Theme)=> css`
  font-size: ${theme.typography.subtitle2Bold.fontSize};
  font-weight: ${theme.typography.subtitle2Bold.fontWeight};
  color: rgba(255, 255, 255, 0.85);
`;

const subtitleStyle =(theme:Theme)=> css`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight:  ${theme.typography.title1Bold.fontWeight};
  margin-top: ${theme.spacing.spacing1};
`;

const descriptionStyle =(theme:Theme)=> css`
  font-size: ${theme.typography.title1Bold.fontSize};
  margin-top:${theme.spacing.spacing1};
`;

const HeroBanner = ({ info }: { info: HeroThemeInfo }) => {
  const { title, subtitle, description, backgroundColor, image } = info;



  return (
    <div css={bannerStyle(backgroundColor ?? '#333',theme)}>
      {image && <img src={image} alt={subtitle} css={imageStyle(theme)} />}
      <div css={titleStyle(theme)}>{subtitle}</div>
      <div css={subtitleStyle(theme)}>{title}</div>
      <div css={descriptionStyle(theme)}>{description}</div>
    </div>
  );
};

export default HeroBanner;
