import theme from '@/data/theme';
import { useHighlightReview } from '@/hooks/useProduct';

interface Review {
  id: string;
  authorName: string;
  content: string;
}

interface Props {
  productId: string;
}

const HighlightReview = ({ productId }: Props) => {
  const { data: reviewData } = useHighlightReview(productId);

  if (!reviewData) return null;

  return (
    <section style={{ margin: theme.spacing.spacing4 }}>
      <h2>선물후기</h2>
      {reviewData.reviews?.map((review: Review) => (
        <div key={review.id}>
          <p>{review.content}</p>
          <p>{review.authorName}</p>
        </div>
      ))}
    </section>
  );
};

export default HighlightReview;
