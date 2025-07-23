import styled from 'styled-components';
import type { Theme } from '@/data/theme';
type Props = {
  totalPrice: number;
  theme: Theme;
  onOrder: () => void;
};

const SummaryBox = styled.div<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.spacing3};
`;

const OrderButton = styled.button<{ theme: Theme }>`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing3};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  cursor: pointer;
  border: none;
`;

const PriceSummary = ({ totalPrice, theme, onOrder }: Props) => {
  return (
    <>
      <SummaryBox theme={theme}>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
      </SummaryBox>
      <OrderButton type="submit" theme={theme} onClick={onOrder}>
        {totalPrice.toLocaleString()}원 주문하기
      </OrderButton>
    </>
  );
};

export default PriceSummary;
