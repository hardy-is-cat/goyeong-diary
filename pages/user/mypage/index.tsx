import Button from "@/components/Button";
import { signOut } from "firebase/auth";
import { auth } from "firebaseInit";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState, userInfoState } from "util/atoms";

function SettingIndex() {
  const router = useRouter();
  const user = auth.currentUser;
  const setUserInfoState = useSetRecoilState(userInfoState);
  const setIsLoggedInState = useSetRecoilState(isLoggedInState);

  const handleLogout = () => {
    signOut(auth);
    // setUserInfoState({});
    // setIsLoggedInState(false);
    localStorage.clear();
    alert("로그아웃되었습니다!");
    router.push("/user/login");
  };

  return (
    <SectionBlock>
      <h1>안녕하세요 {user?.displayName}님!</h1>
      <Button onClick={() => alert("준비중입니다!")}>프로필 수정</Button>
      <Button onClick={handleLogout} warn>
        로그아웃
      </Button>
    </SectionBlock>
  );
}

export default SettingIndex;

const SectionBlock = styled.section`
  padding: 80px 0;

  h1 {
    font-size: ${({ theme }) => theme.fontSize.headline3};
    margin-bottom: 40px;
    text-align: center;
  }

  button {
    margin-bottom: 10px;
  }
`;
