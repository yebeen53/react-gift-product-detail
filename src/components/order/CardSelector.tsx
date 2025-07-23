import orderCard from '@/data/orderCard';
import type { UseFormSetValue } from 'react-hook-form';
import type { OrderFormData } from '@/schemas/orderSchema';
import styled from 'styled-components';
import type { Theme } from '@/data/theme';

type Props = {
  selectedCardId: string | null;
  setValue: UseFormSetValue<OrderFormData>;
  theme: Theme;
};

const ScrollContainer = styled.div<{ theme: Theme }>`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.spacing4};
  margin: ${({ theme }) =>
    `${theme.spacing.spacing2} 0 ${theme.spacing.spacing4}`};
`;

const CardThumbnail = styled.img<{ selected: boolean; theme: Theme }>`
  width: ${({ theme }) => theme.spacing.spacing16};
  height: ${({ theme }) => theme.spacing.spacing10};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
`;

const SelectedImage = styled.img<{ theme: Theme }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
`;

const CardSelector = ({ selectedCardId, setValue, theme }: Props) => {
  const handleSelectCard = (cardId: number) => {
    const isSelected = selectedCardId === `card${cardId}`;
    setValue('selectedCardId', isSelected ? null : `card${cardId}`);
    setValue(
      'message',
      isSelected
        ? ''
        : orderCard.find((c) => c.id === cardId)?.defaultTextMessage || ''
    );
  };

  const selectedCard = orderCard.find((c) => `card${c.id}` === selectedCardId);

  return (
    <section>
      <ScrollContainer theme={theme}>
        {orderCard.slice(0, 12).map((card) => (
          <CardThumbnail
            key={card.id}
            src={card.thumbUrl}
            alt="card"
            onClick={() => handleSelectCard(card.id)}
            selected={selectedCardId === `card${card.id}`}
            theme={theme}
          />
        ))}
      </ScrollContainer>
      {selectedCard && (
        <SelectedImage src={selectedCard.imageUrl} theme={theme} />
      )}
    </section>
  );
};

export default CardSelector;
