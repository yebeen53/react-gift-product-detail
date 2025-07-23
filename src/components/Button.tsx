import { css, type SerializedStyles } from '@emotion/react';
import theme from '@/data/theme';
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  baseColor?: string;
  selectedColor?: string;
  css?: SerializedStyles;
  transparent?: boolean;
  textColor?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const buttonStyle = (
  baseColor = '#5084ea',
  selectedColor = '#0047b3',
  selected = false,
  textColor = 'white'
) => css`
  background-color: ${selected ? selectedColor : baseColor};
  color: ${textColor};
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  font-size: ${theme.typography.subtitle1Bold.fontSize};
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${selected ? selectedColor : baseColor + 'cc'};
  }
  border: none;
`;

const Button = ({
  children,
  onClick,
  selected = false,
  baseColor,
  selectedColor,
  textColor = 'white',
  disabled = false,
  type = 'submit',
}: ButtonProps) => {
  return (
    <button
      type={type}
      css={buttonStyle(baseColor, selectedColor, selected, textColor)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
