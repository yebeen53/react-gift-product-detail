import theme from '@/data/theme';
import { useProductDetail } from '@/hooks/useProductDetail';

interface Props {
  productId: string;
}

const ProductAnnouncements = ({ productId }: Props) => {
  const { data: detail } = useProductDetail(productId);
  if (!detail?.announcements?.length) return null;
  return (
    <section
      style={{
        backgroundColor: theme.colors.semantic.backgroundDefault,
        padding: theme.spacing.spacing4,
        borderRadius: theme.spacing.spacing2,
        margin: theme.spacing.spacing4,
      }}
    >
      <h2>상세정보</h2>

      {detail.announcements.map((a) => (
        <li key={a.displayOrder}>
          <strong>{a.name}</strong>: {a.value}
        </li>
      ))}
    </section>
  );
};
export default ProductAnnouncements;
