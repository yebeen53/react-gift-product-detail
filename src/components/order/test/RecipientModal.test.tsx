import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { ThemeProvider } from 'styled-components';
import theme from '@/data/theme';
import RecipientModal from '../RecipientModal';


const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      recipients: [],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

describe('RecipientModal 컴포넌트', () => {
  const defaultProps = {
    register: jest.fn(),
    errors: {},
    fields: [],
    remove: jest.fn(),
    append: jest.fn(),
    setModalOpen: jest.fn(),
    setValue: jest.fn(),
    theme,
  };

  it('제목과 안내 텍스트가 렌더링되어야 한다', () => {
    render(<RecipientModal {...defaultProps} />, { wrapper: Wrapper });

    expect(screen.getByText('받는 사람')).toBeInTheDocument();
    expect(screen.getByText(/최대 10명까지/)).toBeInTheDocument();
  });

  it('추가하기 버튼 클릭 시 append 함수가 호출되어야 한다', () => {
    render(<RecipientModal {...defaultProps} />, { wrapper: Wrapper });

    const addButton = screen.getByRole('button', { name: '추가하기' });
    fireEvent.click(addButton);

    expect(defaultProps.append).toHaveBeenCalled();
  });

  it('취소 버튼 클릭 시 recipients 초기화 및 모달 닫기', () => {
    render(<RecipientModal {...defaultProps} />, { wrapper: Wrapper });

    const cancelButton = screen.getByRole('button', { name: '취소' });
    fireEvent.click(cancelButton);

    expect(defaultProps.setValue).toHaveBeenCalledWith('recipients', []);
    expect(defaultProps.setModalOpen).toHaveBeenCalledWith(false);
  });
});