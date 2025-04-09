import styled from "styled-components";
import Link from "next/link";

import HomeIcon from "/public/images/icons/icon-home.svg";
import HospitalIcon from "/public/images/icons/icon-hospital.svg";
import CalendarIcon from "/public/images/icons/icon-calendar.svg";
import SettingIcon from "/public/images/icons/icon-setting.svg";

function GNB() {
  return (
    <GNBBlock>
      <li>
        <Link href="/">
          <HomeIcon />홈
        </Link>
      </li>
      {/* <li>
        <Link href="#">
          <HospitalIcon />
          병원찾기
        </Link>
      </li> */}
      <li>
        <Link href="/diary">
          <CalendarIcon />
          기록
        </Link>
      </li>
      <li>
        <Link href="/user/mypage">
          <SettingIcon />
          설정
        </Link>
      </li>
    </GNBBlock>
  );
}

export default GNB;

const GNBBlock = styled.ul`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: white;

  li {
    width: 33.33%;
    text-align: center;

    svg {
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 8px;
    }
  }
`;
