import MainMenu from "@/components/MainMenu";
import styled from "styled-components";

export default function Home() {
  return (
    <main>
      <MyCatPicBlock></MyCatPicBlock>
      <GreetBlock>오늘은 무엇을 함께 했나요?</GreetBlock>
      <MainMenu />
    </main>
  );
}

const MyCatPicBlock = styled.div`
  width: 240px;
  height: 240px;
  margin: 50px auto 20px;
  background-color: gray;
  border-radius: 999px;
`;

const GreetBlock = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.headline2};
`;
