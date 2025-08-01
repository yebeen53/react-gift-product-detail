import { render, screen } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { ThemeProvider } from 'styled-components';
import SenderInput from '../SenderInput';
import theme from '@/data/theme';
import type { OrderFormData } from '@/schemas/orderSchema';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      senderName: '',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

describe('SenderInput 컴포넌트', () => {
  it('레이블과 입력 필드가 렌더링되어야 한다', () => {
    render(
      <SenderInput register={jest.fn()} theme={theme} />,
      { wrapper: Wrapper }
    );

    expect(screen.getByText('보내는 사람')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('에러 메시지가 있으면 표시되어야 한다', () => {
    render(
      <SenderInput
        register={jest.fn()}
        error={{ message: '이름을 입력해주세요' }}
        theme={theme}
      />,
      { wrapper: Wrapper }
    );

    expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument();
  });
});