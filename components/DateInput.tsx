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
      <Button className="current-button" filled onClick={onClick}>
        현재시간
      </Button>
    </DateInputWrapper>
  );
}

export default DateInput;

const DateInputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: 0;
  gap: 4px;

  input {
    flex-grow: 1;
    min-width: 0;
  }

  .current-button {
    width: inherit;
    min-width: max-content;
    flex-shrink: 0;
  }
`;

const InputBlock = styled.input`
  height: 40px;
`;
