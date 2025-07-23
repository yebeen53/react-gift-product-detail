import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import useCustomTheme from '@/hooks/useCustomTheme';
import useLoginForm from '@/hooks/useLoginForm';
import Button from '@/components/Button';
import type { Theme } from '@/data/theme';
import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isClientRequestError, isServerError } from '@/utils/http';
import { ROUTES } from '@/constants/routes';

interface LocationState {
  from?: {
    pathName: string;
  };
}

const logContainer = (theme: Theme) => css`
  max-width: 360px;
  margin: 200px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.spacing5};
  color: ${theme.colors.semantic.textDefault};
`;

const logStyle = (theme: Theme, hasError: boolean) => css`
  width: 100%;
  padding: ${theme.spacing.spacing2};
  font-size: ${theme.typography.subtitle2Bold.fontSize};
  border: none;
  border-bottom: 1px solid
    ${hasError ? theme.colors.red800 : theme.colors.semantic.borderDefault};
  background: transparent;
  &::placeholder {
    color: ${hasError ? theme.colors.red1000 : theme.colors.gray400};
  }
`;

const Login = () => {
  const theme = useCustomTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const from = state?.from?.pathName;
  const safeRedirectPath = from && from !== ROUTES.LOGIN ? from : ROUTES.HOME;
  const { login } = useAuth();
  const {
    id,
    pw,
    setId,
    setPw,
    touchedId,
    touchedPw,
    setTouchedId,
    setTouchedPw,
    isValidId,
    isValidPw,
    idError,
    pwError,
  } = useLoginForm();

  const handleLogin = async () => {
    if (isValidId && isValidPw) {
      try {
        const response = await axios.post('/api/login', {
          email: id,
          password: pw,
        });
        const token = response.data.data.authToken;
        const { id: userId, name, email } = response.data.data;
        const userInfo = { id: userId, name, email, authToken: token };
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userInfo));
        toast.success('로그인 성공!');
        login(userInfo);
        navigate(safeRedirectPath, { replace: true });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (isClientRequestError(error)) {
            toast.error(
              error.response?.data?.message || '로그인에 실패했습니다.'
            );
          } else if (isServerError(error)) {
            toast.error('서버 오류가 발생했습니다.');
          } else {
            toast.error('알 수 없는 오류가 발생했습니다.');
          }
        } else {
          console.error('Unexpected error:', error);
          toast.error('예상치 못한 오류가 발생했습니다.');
        }
      }
    } else {
      setTouchedId(true);
      setTouchedPw(true);
    }
  };

  return (
    <div css={logContainer(theme)}>
      <h2 style={{ textAlign: 'center' }}>KaKao</h2>

      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        onBlur={() => setTouchedId(true)}
        css={logStyle(theme, touchedId && !isValidId)}
      />
      {touchedId && idError && (
        <div style={{ color: theme.colors.red800, fontSize: 12, marginTop: 4 }}>
          {idError}
        </div>
      )}

      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        onBlur={() => setTouchedPw(true)}
        css={logStyle(theme, touchedPw && !isValidPw)}
      />
      {touchedPw && pwError && (
        <div style={{ color: theme.colors.red800, fontSize: 12, marginTop: 4 }}>
          {pwError}
        </div>
      )}

      <Button
        onClick={handleLogin}
        baseColor={
          !isValidId || !isValidPw
            ? theme.colors.semantic.kakaoYellowActive
            : theme.colors.semantic.kakaoYellowHover
        }
        textColor="black"
        disabled={!isValidId || !isValidPw}
      >
        로그인
      </Button>
    </div>
  );
};

export default Login;
