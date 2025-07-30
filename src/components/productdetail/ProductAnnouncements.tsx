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
      <ul style={{ backgroundColor: theme.colors.semantic.backgroundDefault }}>
        {detail.announcements.map((announcement) => (
          <li key={announcement.displayOrder}>
            <strong>{announcement.name}</strong>: {announcement.value}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default ProductAnnouncements;
