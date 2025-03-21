import styled from "styled-components";
import Button from "./Button";

function DateInput({
  value,
  onChange,
  onClick,
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <DateInputWrapper>
      <InputBlock
        type="datetime-local"
        name="date"
        value={value}
        onChange={onChange}
      />
      <Button filled onClick={onClick}>
        현재시간
      </Button>
    </DateInputWrapper>
  );
}

export default DateInput;

const DateInputWrapper = styled.div`
  display: flex;
  gap: 4px;

  input {
    flex-grow: 1;
  }

  button {
    width: 100px;
  }
`;

const InputBlock = styled.input`
  height: 40px;
`;
