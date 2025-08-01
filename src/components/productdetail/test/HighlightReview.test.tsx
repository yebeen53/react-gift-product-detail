import { render, screen} from '@testing-library/react';
import HighlightReview from '../HighlightReview';
import { useHighlightReview } from '@/hooks/useProduct'; 


jest.mock('@/hooks/useProduct', () => ({
  useHighlightReview: jest.fn(),
}));

describe('HighlightReview 컴포넌트', () => {
  const mockReviewData = {
    reviews: [
      { id: '1', authorName: '김구매자', content: '정말 만족스러운 상품입니다!' },
      { id: '2', authorName: '이소비자', content: '배송이 빠르고 품질도 좋아요.' },
    ],
  };

  beforeEach(() => {
    (useHighlightReview as jest.Mock).mockClear();
  });

  it('리뷰 데이터가 없을 때 아무것도 렌더링하지 않아야 한다', () => {
    (useHighlightReview as jest.Mock).mockReturnValue({ data: undefined });
    const { container } = render(<HighlightReview productId="p1" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('리뷰 데이터가 있을 때 제목과 리뷰 내용이 올바르게 렌더링되어야 한다', async () => {
    (useHighlightReview as jest.Mock).mockReturnValue({ data: mockReviewData });
    render(<HighlightReview productId="p1" />);

    expect(screen.getByRole('heading', { name: '선물후기' })).toBeInTheDocument();
    expect(screen.getByText('정말 만족스러운 상품입니다!')).toBeInTheDocument();
    expect(screen.getByText('김구매자')).toBeInTheDocument();
    expect(screen.getByText('배송이 빠르고 품질도 좋아요.')).toBeInTheDocument();
    expect(screen.getByText('이소비자')).toBeInTheDocument();
  });

  it('리뷰 배열이 비어있을 때 제목만 렌더링되어야 한다', () => {
    (useHighlightReview as jest.Mock).mockReturnValue({ data: { reviews: [] } });
    render(<HighlightReview productId="p1" />);
    expect(screen.getByRole('heading', { name: '선물후기' })).toBeInTheDocument();
    expect(screen.queryByText('정말 만족스러운 상품입니다!')).not.toBeInTheDocument();
  });

  it('컴포넌트의 스타일 및 구조가 스냅샷과 일치해야 한다', () => {
    (useHighlightReview as jest.Mock).mockReturnValue({ data: mockReviewData });
    const { asFragment } = render(<HighlightReview productId="p1" />);
    expect(asFragment()).toMatchSnapshot();
  });
});