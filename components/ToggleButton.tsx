import { useState } from "react";
import styled from "styled-components";

function ToggleButton() {
  const [checkedToggle, setCheckedToggle] = useState(false);

  const clickToggle = () => {
    if (checkedToggle) {
      setCheckedToggle(false);
    } else {
      setCheckedToggle(true);
    }
  };

  return (
    <ToggleButtonBlock
      role="checkbox"
      aria-checked={checkedToggle}
      onClick={clickToggle}
      title={checkedToggle ? "활성화" : "비활성화"}
    ></ToggleButtonBlock>
  );
}

export default ToggleButton;

const ToggleButtonBlock = styled.button`
  width: 80px;
  height: 40px;
  padding: 0;
  border: 4px;
  border-style: solid;
  border-radius: 999px;
  transition: all 0.2s;

  &::before {
    display: block;
    content: "";
    background-color: white;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    transition: all 0.2s;
  }

  &[aria-checked="true"] {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};

    &::before {
      transform: translateX(40px);
    }
  }

  &[aria-checked="false"] {
    border-color: ${({ theme }) => theme.colors.gray3};
    background-color: ${({ theme }) => theme.colors.gray3};

    &::before {
      transform: translateX(0px);
    }
  }
`;
