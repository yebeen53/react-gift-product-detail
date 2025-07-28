import WishButton from './WishButton';
import theme from '@/data/theme';
import { useNavigate } from 'react-router-dom';

interface FixedOrderBarProps {
  productId: string;
}

const FixedOrderBar = ({ productId }: FixedOrderBarProps) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`/order/${productId}`);
  };

  return (
    <>
      <div style={{ height: theme.spacing.spacing16 }} />

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.semantic.backgroundDefault,
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center',
          padding: theme.spacing.spacing4,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.spacing4,
            width: '100%',
            maxWidth: '720px',
          }}
        >
          <WishButton productId={productId} />
          <button
            style={{
              backgroundColor: theme.colors.semantic.kakaoYellow,
              color: theme.colors.semantic.textDefault,
              flex: 1,
              border: 'none',
              height: theme.spacing.spacing10,
              borderRadius: theme.spacing.spacing1,
              cursor: 'pointer',
            }}
            onClick={handleOrderClick}
          >
            주문하기
          </button>
        </div>
      </div>
    </>
  );
};

export default FixedOrderBar;
