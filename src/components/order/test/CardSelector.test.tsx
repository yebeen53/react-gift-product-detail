import { render, screen, fireEvent } from '@testing-library/react';
import CardSelector from '../CardSelector';
import orderCard from '@/data/orderCard';
import theme from '@/data/theme';

describe('CardSelector', () => {
  const mockSetValue = jest.fn();

  beforeEach(() => {
    mockSetValue.mockClear();
  });

  it('카드 썸네일 12개까지만 렌더링되어야 한다', () => {
    render(
      <CardSelector
        selectedCardId={null}
        setValue={mockSetValue}
        theme={theme}
      />
    );

    const thumbnails = screen.getAllByRole('img');
    expect(thumbnails.length).toBeLessThanOrEqual(12);
  });

  it('카드를 클릭하면 setValue가 호출되어야 한다', () => {
    render(
      <CardSelector
        selectedCardId={null}
        setValue={mockSetValue}
        theme={theme}
      />
    );

    const firstCardId = orderCard.slice(0, 12)[0].id;
    const firstCardAlt = `card-${firstCardId}`;

    const firstCard = screen.getByAltText(firstCardAlt);
    fireEvent.click(firstCard);

    expect(mockSetValue).toHaveBeenCalledWith('selectedCardId', `card${firstCardId}`);
    expect(mockSetValue).toHaveBeenCalledWith(
      'message',
      orderCard.find((c) => c.id === firstCardId)?.defaultTextMessage ?? ''
    );
  });
});
