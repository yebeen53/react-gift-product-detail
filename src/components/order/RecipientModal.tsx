import type {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayRemove,
  UseFieldArrayAppend,
  FieldArrayWithId,
  UseFormSetValue,
} from 'react-hook-form';
import type { OrderFormData } from '@/schemas/orderSchema';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import type { Theme } from '@/data/theme';

type Props = {
  register: UseFormRegister<OrderFormData>;
  errors?: FieldErrors<OrderFormData>;
  fields: FieldArrayWithId<OrderFormData, 'recipients', 'id'>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<OrderFormData, 'recipients'>;
  setModalOpen: (open: boolean) => void;
  theme: Theme;
  setValue: UseFormSetValue<OrderFormData>;
};

const ModalWrapper = styled.div<{ theme: Theme }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  padding: ${({ theme }) => theme.spacing.spacing6};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1000;
`;

const Title = styled.h2<{ theme: Theme }>`
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const InfoText = styled.p<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const AddButton = styled.button<{ theme: Theme; disabled: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  padding: ${({ theme }) => `
  ${theme.spacing.spacing2} ${theme.spacing.spacing3}
`};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundFill};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const RecipientContainer = styled.div<{ theme: Theme }>`
  border-top: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  padding-top: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled.button<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  border: 1px solid ${({ theme }) => theme.colors.semantic.textDefault};
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.spacing1};
`;

const Input = styled.input<{ theme: Theme }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing2}${({ theme }) =>
      theme.spacing.spacing3};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  margin-bottom: ${({ theme }) => theme.spacing.spacing1};
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const ErrorText = styled.p<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.semantic.statusCritical};
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
`;

const BottomButtonGroup = styled.div<{ theme: Theme }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.spacing3};
  margin-top: ${({ theme }) => theme.spacing.spacing3};
`;

const CancelButton = styled.button<{ theme: Theme }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;

const CompleteButton = styled.button<{ theme: Theme }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  border: none;
`;

const RecipientModal = ({
  register,
  errors,
  fields,
  remove,
  append,
  setModalOpen,
  theme,
  setValue,
}: Props) => {
  const recipientErrors = errors?.recipients ?? [];
  const { trigger } = useFormContext();
  const appendedOnOpen = useRef(false);

  useEffect(() => {
    appendedOnOpen.current = false;
  }, []);

  const handleCancel = () => {
    setValue('recipients', []);
    setModalOpen(false);
  };

  const handleComplete = async () => {
    const isValid = await trigger('recipients');
    if (isValid) {
      appendedOnOpen.current = false;
      setModalOpen(false);
    }
  };

  return (
    <ModalWrapper theme={theme}>
      <Title theme={theme}>받는 사람</Title>
      <InfoText theme={theme}>
        * 최대 10명까지 추가할 수 있어요.
        <br />* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
      </InfoText>

      <AddButton
        type="button"
        onClick={() => {
          if (fields.length < 10) {
            append({ name: '', phoneNumber: '', quantity: 1 });
          }
        }}
        disabled={fields.length >= 10}
        theme={theme}
      >
        추가하기
      </AddButton>

      {fields.map((field, index) => (
        <RecipientContainer key={field.id} theme={theme}>
          <Row theme={theme}>
            <strong>받는 사람 {index + 1}</strong>
            <DeleteButton
              type="button"
              onClick={() => remove(index)}
              theme={theme}
            >
              삭제
            </DeleteButton>
          </Row>

          <div style={{ marginTop: theme.spacing.spacing2 }}>
            <Input
              {...register(`recipients.${index}.name`)}
              placeholder="이름을 입력하세요."
              theme={theme}
            />
            {recipientErrors?.[index]?.name && (
              <ErrorText theme={theme}>
                {recipientErrors[index]?.name?.message}
              </ErrorText>
            )}

            <Input
              {...register(`recipients.${index}.phoneNumber`)}
              placeholder="전화번호를 입력하세요."
              theme={theme}
            />
            {recipientErrors?.[index]?.phoneNumber && (
              <ErrorText theme={theme}>
                {recipientErrors[index]?.phoneNumber?.message}
              </ErrorText>
            )}

            <Input
              type="number"
              min={1}
              {...register(`recipients.${index}.quantity`)}
              placeholder="수량"
              theme={theme}
            />
            {recipientErrors?.[index]?.quantity && (
              <ErrorText theme={theme}>
                {recipientErrors[index]?.quantity?.message}
              </ErrorText>
            )}
          </div>
        </RecipientContainer>
      ))}

      <BottomButtonGroup theme={theme}>
        <CancelButton type="button" onClick={handleCancel} theme={theme}>
          취소
        </CancelButton>
        <CompleteButton type="button" onClick={handleComplete} theme={theme}>
          {fields.length}명 완료
        </CompleteButton>
      </BottomButtonGroup>
    </ModalWrapper>
  );
};

export default RecipientModal;
