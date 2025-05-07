import Button from "@/components/Button";
import { signOut } from "firebase/auth";
import { auth } from "firebaseInit";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState, userInfoState } from "util/atoms";

function SettingIndex() {
  const user = auth.currentUser;
  const setUserInfoState = useSetRecoilState(userInfoState);
  const setIsLoggedInState = useSetRecoilState(isLoggedInState);

  const handleLogout = () => {
    signOut(auth);
    // setUserInfoState({});
    // setIsLoggedInState(false);
    localStorage.clear();
    alert("로그아웃되었습니다!");
    window.location.href = "/user/login";
  };

  return (
    <MainWrapper>
      <h1>안녕하세요 {user?.displayName}님!</h1>
      <Link href="/user/edit-pet">프로필 수정</Link>
      <Button onClick={handleLogout} warn>
        로그아웃
      </Button>
    </MainWrapper>
  );
}

export default SettingIndex;

const MainWrapper = styled.main`
  max-width: 430px;
  min-height: 100vh;
  padding: 80px 30px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline3};
    margin-bottom: 40px;
    text-align: center;
  }

  button {
    margin-bottom: 10px;
  }

  a {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: inherit;
    text-align: center;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: white;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;
