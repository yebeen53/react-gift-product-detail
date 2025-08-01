import { render, screen, fireEvent } from '@testing-library/react';
import theme from '@/data/theme';
import PriceSummary from '../PriceSummary';

describe('PriceSummary 컴포넌트', () => {
  const mockOnOrder = jest.fn();

  it('총 금액이 올바르게 렌더링되어야 한다', () => {
    render(<PriceSummary totalPrice={123456} theme={theme} onOrder={mockOnOrder} />);
    expect(screen.getByText('총 금액: 123,456원')).toBeInTheDocument();
  });

  it('주문하기 버튼이 올바른 텍스트와 함께 렌더링되어야 한다', () => {
    render(<PriceSummary totalPrice={78900} theme={theme} onOrder={mockOnOrder} />);
    const orderButton = screen.getByRole('button', { name: '78,900원 주문하기' });
    expect(orderButton).toBeInTheDocument();
  });

  it('주문하기 버튼 클릭 시 onOrder 함수가 호출되어야 한다', () => {
    render(<PriceSummary totalPrice={10000} theme={theme} onOrder={mockOnOrder} />);
    const orderButton = screen.getByRole('button', { name: '10,000원 주문하기' });
    fireEvent.click(orderButton);
    expect(mockOnOrder).toHaveBeenCalledTimes(1);
  });

  it('컴포넌트의 스타일이 스냅샷과 일치해야 한다', () => {
    const { asFragment } = render(<PriceSummary totalPrice={50000} theme={theme} onOrder={mockOnOrder} />);
    expect(asFragment()).toMatchSnapshot();
  });
});