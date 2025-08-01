import { render, screen, waitFor } from '@testing-library/react';
import ProductDetailInfo from '../ProductDetailInfo';
import { useProductDetail } from '@/hooks/useProduct';

jest.mock('@/hooks/useProduct', () => ({
  useProductDetail: jest.fn(),
}));

describe('ProductDetailInfo 컴포넌트', () => {
  const mockProductDetail = {
    description: '<p>이것은 <strong>상품 설명</strong>입니다.</p>',
    images: ['image1.jpg', 'image2.jpg'],
  };

  beforeEach(() => {
    (useProductDetail as jest.Mock).mockClear();
  });

  it('데이터 로딩 중에는 폴백 메시지가 렌더링되어야 한다', () => {
    (useProductDetail as jest.Mock).mockReturnValue({ data: undefined });
    const { container } = render(<ProductDetailInfo productId="p1" />);
    expect(container).toHaveTextContent(/로딩중/i);
  });

  it('상품 설명과 이미지가 올바르게 렌더링되어야 한다', async () => {
    (useProductDetail as jest.Mock).mockReturnValue({ data: mockProductDetail });
    render(<ProductDetailInfo productId="p1" />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /상품설명/i })).toBeInTheDocument();
      expect(screen.getByText(/이것은/)).toBeInTheDocument();
      expect(screen.getByText(/상품 설명/)).toBeInTheDocument();

      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute('src', 'image1.jpg');
      expect(images[1]).toHaveAttribute('src', 'image2.jpg');
    });
  });

  it('컴포넌트의 스타일 및 구조가 스냅샷과 일치해야 한다', async () => {
    (useProductDetail as jest.Mock).mockReturnValue({ data: mockProductDetail });
    const { asFragment } = render(<ProductDetailInfo productId="p1" />);
    await waitFor(() => {
      expect(screen.getByText(/상품 설명/)).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
