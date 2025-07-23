import Button from '@/components/Button';
import type { FieldErrors } from 'react-hook-form';
import type { OrderFormData } from '@/schemas/orderSchema';
import styled from 'styled-components';
import type { Theme } from '@/data/theme';

type RecipientSummaryProps = {
  recipients: OrderFormData['recipients'];
  errors?: FieldErrors<OrderFormData>['recipients'];
  setModalOpen: (open: boolean) => void;
  theme: Theme;
};

const Section = styled.section<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  border-radius: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing4};
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;

const Heading = styled.h3<{ theme: Theme }>`
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const Description = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const RecipientList = styled.ul<{ theme: Theme }>`
  padding-left: ${({ theme }) => theme.spacing.spacing5};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  background-color: white;
`;

const ErrorMessage = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.semantic.statusCritical};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
`;

const RecipientSummary = ({
  recipients,
  errors,
  setModalOpen,
  theme,
}: RecipientSummaryProps) => {
  return (
    <Section theme={theme}>
      <Heading theme={theme}>받는 사람</Heading>

      {recipients.length === 0 ? (
        <Description theme={theme}>
          받는 사람이 없습니다. <br />
          받는 사람을 추가해주세요.
        </Description>
      ) : (
        <RecipientList theme={theme}>
          {recipients.map((r, index) => (
            <li key={index}>
              {r.name} {r.phoneNumber} {r.quantity || 1}개
            </li>
          ))}
        </RecipientList>
      )}

      {typeof errors?.message === 'string' && (
        <ErrorMessage theme={theme}>{errors.message}</ErrorMessage>
      )}

      <Button
        type="button"
        baseColor={theme.colors.semantic.backgroundDefault}
        textColor={theme.colors.semantic.textDefault}
        onClick={() => setModalOpen(true)}
      >
        {recipients.length > 0 ? '수정' : '추가'}
      </Button>
    </Section>
  );
};

export default RecipientSummary;
