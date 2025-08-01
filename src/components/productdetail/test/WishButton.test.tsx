import { render, screen, fireEvent } from '@testing-library/react';
import WishButton from '../WishButton'; 
import { useWishCount, useWishMutation } from '@/hooks/useProduct';

jest.mock('@/hooks/useProduct', () => ({
  useWishCount: jest.fn(),
  useWishMutation: jest.fn(),
}));

describe('WishButton 컴포넌트', () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    
    jest.clearAllMocks();
    (useWishCount as jest.Mock).mockReturnValue({
      data: { wishCount: 10, isWished: false },
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });

    (useWishMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null,
      reset: jest.fn(),
      status: 'idle',
      variables: undefined,
    });
  });

  it('찜하기 버튼과 찜 카운트가 올바르게 렌더링되어야 한다 (찜 안 한 상태)', () => {
    render(<WishButton productId="p1" />); 

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button').querySelector('svg')).toHaveAttribute(
      'fill',
      'none'
    );
  });

  it('찜하기 버튼과 찜 카운트가 올바르게 렌더링되어야 한다 (찜 한 상태)', () => {
    (useWishCount as jest.Mock).mockReturnValue({
      data: { wishCount: 15, isWished: true },
    });
    render(<WishButton productId="p1" />);

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button').querySelector('svg')).toHaveAttribute(
      'fill',
      'red'
    );
  });

  it('찜하기 버튼 클릭 시 mutate 함수가 호출되어야 한다', () => {
    render(<WishButton productId="p1" />); 

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it('mutation이 진행 중일 때는 버튼 클릭 시 mutate 함수가 호출되지 않아야 한다', () => {
    (useWishMutation as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true, 
      isSuccess: false,
      isError: false,
      data: undefined,
      error: null,
      reset: jest.fn(),
      status: 'pending', 
      variables: undefined,
    });
    render(<WishButton productId="p1" />); 

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('컴포넌트의 스타일이 스냅샷과 일치해야 한다', () => {
    (useWishCount as jest.Mock).mockReturnValue({
      data: { wishCount: 0, isWished: false },
    });
    const { asFragment } = render(<WishButton productId="p1" />); 
    expect(asFragment()).toMatchSnapshot();
  });

  it('찜한 상태일 때 컴포넌트의 스타일이 스냅샷과 일치해야 한다', () => {
    (useWishCount as jest.Mock).mockReturnValue({
      data: { wishCount: 1, isWished: true },
    });
    const { asFragment } = render(<WishButton productId="p1" />); 
    expect(asFragment()).toMatchSnapshot();
  });
});

