import { ReactNode } from "react";
import styled, { css } from "styled-components";

type ButtonTypes = {
  children: ReactNode;
  disabled?: boolean;
  filled?: boolean;
  warn?: boolean;
};

function Button({ children, disabled, filled, warn }: ButtonTypes) {
  return (
    <ButtonBlock disabled={disabled} $filled={filled} $warn={warn}>
      {children}
    </ButtonBlock>
  );
}

export default Button;

const ButtonBlock = styled.button<{
  $filled: boolean | undefined;
  $warn: boolean | undefined;
}>`
  width: 100%;
  padding: 10px;
  font-size: inherit;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  ${({ $warn, theme }) =>
    $warn &&
    css`
      border: 1px solid ${theme.colors.error};
      color: ${theme.colors.error};
    `}

  ${({ $filled, theme }) =>
    $filled &&
    css`
      border: none;
      background-color: ${theme.colors.primary};
      color: white;
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray2};
    color: white;
    border: none;
    cursor: not-allowed;
  }
`;
