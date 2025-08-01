import { render, screen, fireEvent } from '@testing-library/react';
import FixedOrderBar from '../FixedOrderBar';
import { BrowserRouter, useNavigate } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: jest.fn(), 
}));


jest.mock('../WishButton', () => ({
  __esModule: true,
  default: ({ productId }: { productId: string }) => (
    <button data-testid="mock-wish-button">찜하기 {productId}</button>
  ),
}));

describe('FixedOrderBar 컴포넌트', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate); 
    mockNavigate.mockClear();
  });

  it('주문하기 버튼이 올바르게 렌더링되어야 한다', () => {
    render(<FixedOrderBar productId="test-product-id" />, { wrapper: BrowserRouter }); 
    expect(screen.getByRole('button', { name: '주문하기' })).toBeInTheDocument();
  });

  it('찜하기 버튼(모킹)이 올바르게 렌더링되어야 한다', () => {
    render(<FixedOrderBar productId="test-product-id" />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('mock-wish-button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-wish-button')).toHaveTextContent('찜하기 test-product-id');
  });

  it('주문하기 버튼 클릭 시 navigate 함수가 올바른 경로로 호출되어야 한다', () => {
    const productId = 'product-123';
    render(<FixedOrderBar productId={productId} />, { wrapper: BrowserRouter });

    const orderButton = screen.getByRole('button', { name: '주문하기' });
    fireEvent.click(orderButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/order/${productId}`);
  });

  it('컴포넌트의 스타일 및 구조가 스냅샷과 일치해야 한다', () => {
    const { asFragment } = render(<FixedOrderBar productId="test-product-id" />, { wrapper: BrowserRouter });
    expect(asFragment()).toMatchSnapshot();
  });
});