import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useCustomTheme from '../hooks/useCustomTheme';
import type { Theme } from '@/data/theme';
import { ROUTES } from '@/constants/routes';

const container = (theme: Theme) => css`
  max-width: 720px;
  height: ${theme.spacing.spacing12};
  background: ${theme.colors.semantic.backgroundDefault};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0 ${theme.spacing.spacing4};
`;

const navstyle = (theme: Theme) => css`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
  color: ${theme.colors.semantic.textDefault};
`;

const per = (theme: Theme) => css`
  cursor: pointer;
  width: ${theme.spacing.spacing10};
  height: ${theme.spacing.spacing10};
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aLBdZ-dWr4tVuP38je4WW2WVGphxmiINHA&s');
  background-size: contain;
  background-position: center;
`;

const pre = css`
  cursor: pointer;
`;

const preStyle = (theme: Theme) => css`
  width: ${theme.spacing.spacing10};
  height: ${theme.spacing.spacing10};
  color: ${theme.colors.semantic.textDefault};
  font-size: ${theme.typography.title2Regular.lineHeight};
`;

const Navibar = () => {
  const theme = useCustomTheme();
  const navigate = useNavigate();
  const { user } = useAuth();

  const redirectToMyOrLogin = () => {
    if (user) {
      navigate(ROUTES.MY);
    } else {
      navigate(ROUTES.LOGIN, { state: { from: ROUTES.MY } });
    }
  };

  return (
    <div css={container(theme)}>
      <div css={pre} onClick={() => navigate(-1)}>
        <div css={preStyle(theme)}>&lt;</div>
      </div>

      <nav css={navstyle(theme)}>선물하기</nav>

      <div css={per(theme)} onClick={redirectToMyOrLogin}></div>
    </div>
  );
};

export default Navibar;
