import type { UseFormRegister } from 'react-hook-form';
import type { OrderFormData } from '@/schemas/orderSchema';
import styled from 'styled-components';
import type { Theme } from '@/data/theme';
type Props = {
  register: UseFormRegister<OrderFormData>;
  error?: { message?: string };
  theme: Theme;
};

const Wrapper = styled.div<{ theme: Theme }>``;

const Label = styled.label<{ theme: Theme }>`
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
`;

const TextArea = styled.textarea<{ theme: Theme }>`
  width: 100%;
  height: ${({ theme }) => theme.spacing.spacing16};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  padding: ${({ theme }) => theme.spacing.spacing1};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const ErrorMessage = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.semantic.statusCritical};
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
`;

const MessageInput = ({ register, error, theme }: Props) => {
  return (
    <Wrapper theme={theme}>
      <Label theme={theme}>메시지</Label>
      <TextArea {...register('message')} rows={3} theme={theme} />
      {error && <ErrorMessage theme={theme}>{error.message}</ErrorMessage>}
    </Wrapper>
  );
};

export default MessageInput;
