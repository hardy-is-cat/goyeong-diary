import styled from "styled-components";

interface DateInputType extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  handleDate: (date: string) => void;
}

function DateInput({ name, handleDate }: DateInputType) {
  // 현재 시간 가져오는 함수, input 기본값으로 설정하려 했는데 선택값이랑 충돌나서 뺌
  const getCurrentTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <InputBlock
      type="datetime-local"
      name={name}
      onChange={(e) => handleDate(e.target.value)}
    />
  );
}

export default DateInput;

const InputBlock = styled.input`
  height: 40px;
`;
