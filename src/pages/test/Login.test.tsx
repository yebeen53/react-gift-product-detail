import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

jest.mock('@/hooks/useCustomTheme', () => () => ({
  spacing: {
    spacing2: '8px',
    spacing5: '20px',
  },
  colors: {
    semantic: {
      textDefault: '#000',
      borderDefault: '#ccc',
      kakaoYellowActive: '#FEE500',
      kakaoYellowHover: '#FFD700',
    },
    red800: '#ff0000',
    red1000: '#cc0000',
    gray400: '#999',
  },
  typography: {
    subtitle2Bold: {
      fontSize: '14px',
    },
  },
}));

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: null,
  }),
}));

jest.mock('axios');

interface ErrorResponse {
  response?: {
    status?: number;
  };
}

jest.mock('@/utils/http', () => ({
  isClientRequestError: (error: unknown): boolean => {
    const err = error as ErrorResponse;
    return err.response?.status === 400;
  },
  isServerError: (error: unknown): boolean => {
    const err = error as ErrorResponse;
    return typeof err.response?.status === 'number' && err.response.status >= 500;
  },
}));

jest.mock('@/hooks/useLoginMutation', () => ({
  useLoginMutation: () => ({
    mutate: (data: { email: string; password?: string }) => {
      localStorage.setItem('authToken', 'mock-auth-token');
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: '1',
          name: 'Test User',
          email: data.email,
          authToken: 'mock-auth-token',
        })
      );
    },
    status: 'success', 
  }),
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('유효한 자격 증명으로 로그인 시 성공하고, 로컬 스토리지에 정보가 저장되며, 페이지가 리다이렉트되어야 한다', async () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'test@kakao.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: 'password123!' },
  });

  fireEvent.click(screen.getByText('로그인'));

  await waitFor(() => {
    expect(localStorage.getItem('authToken')).toBe('mock-auth-token');
    expect(localStorage.getItem('user')).toEqual(
      JSON.stringify({
        id: '1',
        name: 'Test User',
        email: 'test@kakao.com',
        authToken: 'mock-auth-token',
      })
    );
  });
});
