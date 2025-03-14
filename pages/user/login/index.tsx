import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import styled from "styled-components";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";

function LoginIndex() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-credential") {
          alert("이메일 혹은 패스워드 정보가 일치하지 않습니다.");
        } else if (errorCode === "auth/invalid-email") {
          alert("이메일 형식을 올바르게 입력해주세요.");
        } else if (errorCode === "auth/too-many-requests") {
          alert("잠시 후 다시 시도해주세요.");
        } else {
          alert("로그인에 실패했습니다!");
        }
      });
  };

  return (
    <WrapperBlock>
      <H1Block>로그인</H1Block>
      <LoginBlock onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          로그인
        </Button>
        <Link href="/user/signup">회원가입</Link>
      </LoginBlock>
    </WrapperBlock>
  );
}

export default LoginIndex;

const WrapperBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 0 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1Block = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  margin-bottom: 20px;
`;

const LoginBlock = styled.form`
  width: 100%;
  text-align: center;

  & > * {
    margin-bottom: 10px;
  }
`;
