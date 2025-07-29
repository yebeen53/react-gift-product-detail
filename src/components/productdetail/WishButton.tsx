import { useWishCount, useWishMutation } from '@/hooks/useProduct';
import { Heart } from 'lucide-react';
import { css } from '@emotion/react';
import type { Theme } from '@/data/theme';
import theme from '@/data/theme';

interface Props {
  productId: string;
}

const WishButton = ({ productId }: Props) => {
  const { data } = useWishCount(productId);
  const mutation = useWishMutation(productId);

  const wishCount = data?.wishCount ?? 0;
  const isWished = data?.isWished ?? false;

  const handleClick = () => {
    if (!mutation.isPending) {
      mutation.mutate();
    }
  };

  return (
    <button onClick={handleClick} css={buttonStyle(theme)} aria-pressed={isWished}>
      <Heart size={25} fill={isWished ? 'red' : 'none'} color="red" />
      <span>{wishCount}</span>
    </button>
  );
};

const buttonStyle =(theme:Theme)=> css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.spacing4};
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default WishButton;
