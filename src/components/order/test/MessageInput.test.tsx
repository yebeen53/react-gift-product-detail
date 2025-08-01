import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { ThemeProvider } from 'styled-components';
import MessageInput from '../MessageInput';
import theme from '@/data/theme';
import type { OrderFormData } from '@/schemas/orderSchema';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      message: '',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

describe('MessageInput 컴포넌트', () => {
  it('레이블과 입력 필드가 렌더링되어야 한다', () => {
    render(
      <MessageInput
        register={jest.fn()}
        theme={theme}
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByText('메시지')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('에러 메시지가 있을 경우 렌더링되어야 한다', () => {
    render(
      <MessageInput
        register={jest.fn()}
        error={{ message: '에러 메시지입니다' }}
        theme={theme}
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByText('에러 메시지입니다')).toBeInTheDocument();
  });
});