import { render, screen } from '@testing-library/react';
import ProductAnnouncements from '../ProductAnnouncements';
import { useProductDetail } from '@/hooks/useProductDetail';

jest.mock('@/hooks/useProductDetail');

describe('ProductAnnouncements 컴포넌트', () => {
  const mockUseProductDetail = useProductDetail as jest.Mock;

  it('공지사항 데이터가 있을 때 제목과 리스트가 올바르게 렌더링되어야 한다', () => {
    mockUseProductDetail.mockReturnValue({
      data: {
        announcements: [
          { displayOrder: 1, name: '구성품', value: '상품 본품, 설명서' },
          { displayOrder: 2, name: '주의사항', value: '직사광선 주의' },
        ],
      },
    });

    render(<ProductAnnouncements productId="1" />);
    expect(screen.getByText('상세정보')).toBeInTheDocument();

    const 구성품StrongTag = screen.getByText('구성품');
    expect(구성품StrongTag).toBeInTheDocument();
    expect(구성품StrongTag.parentElement).toHaveTextContent('구성품: 상품 본품, 설명서');

    const 주의사항StrongTag = screen.getByText('주의사항');
    expect(주의사항StrongTag).toBeInTheDocument();
    expect(주의사항StrongTag.parentElement).toHaveTextContent('주의사항: 직사광선 주의');
  });

  it('공지사항이 없으면 아무것도 렌더링하지 않는다', () => {
    mockUseProductDetail.mockReturnValue({ data: { announcements: [] } });

    const { container } = render(<ProductAnnouncements productId="1" />);
    expect(container).toBeEmptyDOMElement();
  });
});