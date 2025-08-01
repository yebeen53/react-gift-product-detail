import { render, screen } from '@testing-library/react';
import theme from '@/data/theme';
import ProductSummary from '../ProductSummary';

interface Product {
  imageURL?: string;
  name: string;
  brandName?: string;
  price: number;
}

describe('ProductSummary 컴포넌트', () => {
  const mockProduct: Product = {
    imageURL: 'https://example.com/product-image.jpg',
    name: '멋진 선물세트',
    brandName: '최고의 브랜드',
    price: 35000,
  };

  it('product prop이 null일 때 아무것도 렌더링하지 않아야 한다', () => {
    const productNull = null as unknown as Product | null;
    const { container } = render(<ProductSummary product={productNull} theme={theme} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('모든 제품 정보가 올바르게 렌더링되어야 한다', () => {
    render(<ProductSummary product={mockProduct} theme={theme} />);

    expect(screen.getByRole('img', { name: mockProduct.name })).toHaveAttribute('src', mockProduct.imageURL!);
    expect(screen.getByRole('heading', { level: 3, name: mockProduct.name })).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brandName!)).toBeInTheDocument();
    expect(screen.getByText(`상품가 ${mockProduct.price.toLocaleString()}원`)).toBeInTheDocument();
  });

  it('브랜드 이름이 없을 때 렌더링되지 않아야 한다', () => {
    const productWithoutBrand: Product = { ...mockProduct, brandName: undefined };
    render(<ProductSummary product={productWithoutBrand} theme={theme} />);
    expect(screen.queryByText(mockProduct.brandName!)).not.toBeInTheDocument();
  });

  it('이미지 URL이 없을 때 이미지가 렌더링되지 않아야 한다', () => {
    const productWithoutImage: Product = { ...mockProduct, imageURL: undefined };
    render(<ProductSummary product={productWithoutImage} theme={theme} />);
    expect(screen.queryByRole('img', { name: mockProduct.name })).not.toBeInTheDocument();
  });

  it('컴포넌트의 스타일이 스냅샷과 일치해야 한다', () => {
    const { asFragment } = render(<ProductSummary product={mockProduct} theme={theme} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
