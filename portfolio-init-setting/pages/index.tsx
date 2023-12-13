import { useState } from "react";
import styled from "styled-components";
import NextIcon from "/public/images/next.svg";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <H1Block isClicked={isClicked} onClick={() => setIsClicked(!isClicked)}>
        해위
      </H1Block>
      <PBlock>배위</PBlock>
      <NextIconBlock />
    </>
  );
}

const H1Block = styled.h1<{ isClicked: boolean }>`
  color: ${({ isClicked }) => (isClicked ? "red" : "blue")};
  font-size: ${({ theme }) => theme.fontSize.headline1};
`;

const PBlock = styled.p`
  font-weight: 400;
`;

const NextIconBlock = styled(NextIcon)`
  path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
