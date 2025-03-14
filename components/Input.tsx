import { forwardRef } from "react";
import styled from "styled-components";

interface InputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  state?: "error" | "correct";
}

const Input = forwardRef<HTMLInputElement, InputTypes>(
  (
    { placeholder, disabled, helperText, type = "text", state, ...props },
    ref
  ) => {
    return (
      <InputWrapper $state={state}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        {helperText && <p>{helperText}</p>}
      </InputWrapper>
    );
  }
);

export default Input;

const InputWrapper = styled.div<{ $state: string | undefined }>`
  input {
    padding: 10px;
    width: 100%;
    font-size: inherit;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray2};

    ${({ $state, theme }) => {
      if ($state === "error") {
        return `box-shadow: 0 0 5px ${theme.colors.error}`;
      } else if ($state === "correct") {
        return `box-shadow: 0 0 5px ${theme.colors.correct}`;
      }
    }}
  }

  input:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
  }

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.gray1};
    font-size: 14px;

    ${({ $state, theme }) => {
      if ($state === "error") {
        return `color: ${theme.colors.error}`;
      } else if ($state === "correct") {
        return `color: ${theme.colors.correct}`;
      }
    }}
  }
`;
