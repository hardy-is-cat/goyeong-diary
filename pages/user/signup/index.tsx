import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage } from "firebaseInit";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

function SignUpIndex() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [validateEmail, setValidateEmail] = useState<boolean>();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState<boolean>();
  const [tryPassword, setTryPassword] = useState("");
  const [isMatchedPassword, setIsMatchedPassword] = useState<boolean>();

  const REG_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const REG_PASSWORD = /^[A-Za-z\d!@#$%^&*]{8,}$/;

  const addFirebaseUserInfo = async (
    userCredential: UserCredential,
    nickname: string
  ) => {
    const { uid } = userCredential.user;
    const userDocRef = doc(storage, "users", uid);
    await setDoc(userDocRef, {
      uid,
      displayName: nickname,
      petId: "",
    });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: nickname,
          photoURL: "https://i.ibb.co/Kc6tjcX5/default-profile.png",
        });
        addFirebaseUserInfo(userCredential, nickname);
        alert(`환영합니다 ${nickname}님!`);
        router.push("/user/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage, "회원가입 실패!");
      });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (!REG_EMAIL.test(e.target.value)) {
      setValidateEmail(false);
    } else {
      setValidateEmail(true);
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (!REG_PASSWORD.test(e.target.value)) {
      setValidatePassword(false);
    } else {
      setValidatePassword(true);
    }

    if (tryPassword?.length) {
      if (e.target.value === tryPassword) {
        setIsMatchedPassword(true);
      } else {
        setIsMatchedPassword(false);
      }
    }
  };

  const handleTryPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTryPassword(e.target.value);
    if (e.target.value === password) {
      setIsMatchedPassword(true);
    } else {
      setIsMatchedPassword(false);
    }
  };

  return (
    <MainWrapper>
      <form>
        <InputBlock>
          <label htmlFor="signup-email">이메일</label>
          <Input
            id="signup-email"
            type="email"
            placeholder="이메일을 입력해주세요."
            state={
              email?.length ? (validateEmail ? "correct" : "error") : undefined
            }
            helperText={
              email?.length
                ? validateEmail
                  ? "사용 가능한 이메일입니다."
                  : "이메일 형식을 확인해주세요."
                : undefined
            }
            onChange={(e) => handleEmail(e)}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="signup-nickname">닉네임</label>
          <Input
            id="signup-nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={(e) => setNickname(e.target.value)}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="signup-password">비밀번호</label>
          <Input
            id="signup-password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            state={
              validatePassword === undefined
                ? undefined
                : validatePassword
                  ? "correct"
                  : "error"
            }
            helperText={
              validatePassword === undefined
                ? undefined
                : validatePassword
                  ? "사용 가능한 비밀번호입니다."
                  : "비밀번호는 8자리 이상의 영어, 숫자, 특수문자 !@#$%^&*의 조합만 가능합니다."
            }
            onChange={(e) => handlePassword(e)}
            value={password}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="signup-password-try">비밀번호 확인</label>
          <Input
            id="signup-password-try"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            onChange={(e) => handleTryPassword(e)}
            value={tryPassword}
            state={
              tryPassword?.length
                ? isMatchedPassword
                  ? "correct"
                  : "error"
                : undefined
            }
            helperText={
              tryPassword?.length
                ? isMatchedPassword
                  ? "비밀번호가 일치합니다"
                  : "비밀번호가 일치하지 않습니다"
                : undefined
            }
          />
        </InputBlock>
        <Button
          type="button"
          onClick={handleSignUp}
          filled
          disabled={
            !email ||
            !validateEmail ||
            !nickname ||
            !password ||
            !isMatchedPassword
          }
        >
          회원가입
        </Button>
      </form>
    </MainWrapper>
  );
}

export default SignUpIndex;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 430px;
  min-height: 100vh;
  padding: 80px 30px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  form {
    width: 100%;
  }
`;

const InputBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;

  label {
    width: 100px;
    flex-shrink: 0;
  }

  & > div {
    flex-grow: 1;
  }
`;
