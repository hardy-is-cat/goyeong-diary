"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

function PageTitle() {
  const pathname = usePathname();

  const currentTitle = (pathname: string) => {
    let title;
    switch (pathname) {
      case "/toilet":
        title = "화장실 기록하기";
        break;
      case "/feed":
        title = "식사 기록하기";
        break;
      case "/play":
        title = "놀이 기록하기";
        break;
      case "/calendar":
        title = "놀이 기록하기";
        break;
      case "/hospital":
        title = "놀이 기록하기";
        break;
      case "/calendar":
        title = "놀이 기록하기";
        break;

      default:
        title = "페이지 이름 없음";
        break;
    }
    return title;
  };

  return <H1Block>{currentTitle(pathname)}</H1Block>;
}

export default PageTitle;

const H1Block = styled.h1`
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.headline3};
  text-align: center;
  padding: 20px;
`;
