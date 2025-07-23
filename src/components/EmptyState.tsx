import theme from '@/data/theme';

const EmptyState = () => {
  return (
    <div
      style={{
        padding: theme.spacing.spacing5,
        textAlign: 'center',
        color: theme.colors.semantic.textDefault,
      }}
    >
      등록된 상품이 없습니다.
    </div>
  );
};

export default EmptyState;
