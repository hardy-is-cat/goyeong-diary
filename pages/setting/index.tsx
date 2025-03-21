import Button from "@/components/Button";
import { signOut } from "firebase/auth";
import { auth } from "firebaseInit";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
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
    <>
      <h1>안녕하세요! {user?.displayName}님!</h1>
      <Button onClick={handleLogout}>로그아웃</Button>
    </>
  );
}

export default SettingIndex;
