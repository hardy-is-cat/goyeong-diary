import styled from "styled-components";

interface InputType {
  quantity: number;
  handleQuantity: (num: number) => void;
}

function QuantityInput({ quantity, handleQuantity }: InputType) {
  return (
    <QuantityInputBlock>
      <DecreaseButton
        type="button"
        onClick={() => handleQuantity(-1)}
        $quantity={quantity}
        disabled={quantity === 0}
      >
        <span className="a11y-hidden">1개 감소</span>
      </DecreaseButton>
      <input type="number" value={quantity} readOnly />
      <IncreaseButton type="button" onClick={() => handleQuantity(1)}>
        <span className="a11y-hidden">1개 증가</span>
      </IncreaseButton>
    </QuantityInputBlock>
  );
}

export default QuantityInput;

const QuantityInputBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  input {
    height: 40px;
    text-align: center;
    background-color: white;
    flex-grow: 1;
  }
`;

const DecreaseButton = styled.button<{ $quantity: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray2};
    cursor: not-allowed;
  }

  // - 아이콘
  &::before {
    content: "";
    display: block;
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }

  &:disabled::before {
    background-color: ${({ theme }) => theme.colors.gray2};
  }
`;

const IncreaseButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.99);
  }

  // + 아이콘
  &::before {
    position: absolute;
    content: "";
    display: block;
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    content: "";
    display: block;
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;
