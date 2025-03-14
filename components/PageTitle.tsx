"use client";

import { usePathname } from "next/navigation";
import styled from "styled-components";

function PageTitle() {
  const pathname = usePathname();

  const currentTitle = (pathname: string) => {
    let title;
    switch (pathname) {
      case "/record/toilet":
        title = "화장실 기록";
        break;
      case "/record/feeding":
        title = "식사 기록";
        break;
      case "/record/playing":
        title = "놀이 기록";
        break;
      case "/record/vaccination":
        title = "접종 기록";
        break;
      case "/hospital":
        title = "내주변 병원";
        break;
      case "/calendar":
        title = "기록 확인";
        break;
      case "/user/add-pet":
        title = "내새꾸 등록하기";
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
