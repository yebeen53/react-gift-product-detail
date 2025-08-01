import { render, screen, waitFor } from '@testing-library/react';
import ProductDetailSummary from '../ProductDetailSummary';
import { useProduct } from '@/hooks/useProduct';

jest.mock('@/hooks/useProduct', () => ({
  useProduct: jest.fn(),
}));

describe('ProductDetailSummary 컴포넌트', () => {
  const mockProductData = {
    imageURL: 'product-main.jpg',
    name: '최신 스마트워치',
    price: { sellingPrice: 250000 },
    brandInfo: {
      imageURL: 'brand-logo.png',
      name: 'ABC 전자',
    },
  };

  beforeEach(() => {
    (useProduct as jest.Mock).mockClear();
  });

  it('제품 정보가 올바르게 렌더링되어야 한다', async () => {
    (useProduct as jest.Mock).mockReturnValue({ data: mockProductData });

    render(<ProductDetailSummary productId="p1" />);

    await waitFor(() => {
      const productImage = screen.getByRole('img', { name: mockProductData.name });
      expect(productImage).toHaveAttribute('src', mockProductData.imageURL);

      const productName = screen.getByRole('heading', { name: mockProductData.name });
      expect(productName).toBeInTheDocument();

      const priceText = `${mockProductData.price.sellingPrice}원`;
      const priceHeading = screen.getByRole('heading', { name: priceText });
      expect(priceHeading).toBeInTheDocument();

      const brandLogo = screen.getByRole('img', { name: mockProductData.brandInfo.name });
      expect(brandLogo).toHaveAttribute('src', mockProductData.brandInfo.imageURL);
      const brandName = screen.getByRole('heading', { name: mockProductData.brandInfo.name });
      expect(brandName).toBeInTheDocument();
    });
  });

  it('컴포넌트의 스타일 및 구조가 스냅샷과 일치해야 한다', async () => {
    (useProduct as jest.Mock).mockReturnValue({ data: mockProductData });

    const { asFragment } = render(<ProductDetailSummary productId="p1" />);
    await waitFor(() => {}); 

    expect(asFragment()).toMatchSnapshot();
  });
});
