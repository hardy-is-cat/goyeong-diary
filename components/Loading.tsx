import { ClipLoader } from "react-spinners";
import styled from "styled-components";

function Loading() {
  return (
    <SpinnerBlock>
      <ClipLoader size={40} color="#AD58E1" />
      <p>데이터 로딩중...</p>
    </SpinnerBlock>
  );
}

export default Loading;

const SpinnerBlock = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 20px;
`;
