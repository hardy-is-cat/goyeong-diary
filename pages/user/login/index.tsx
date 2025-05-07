import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { auth, storage } from "firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Button from "@/components/Button";
import Input from "@/components/Input";

function LoginIndex() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // setUserInfo((prev) => ({
        //   ...prev,
        //   displayName: userCredential.user.displayName,
        //   uid: userCredential.user.uid,
        // }));
        localStorage.setItem("displayName", userCredential.user.displayName!);
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("photoURL", userCredential.user.photoURL!);
        // setIsLoggedIn(true);
        // user 컬렉션 내부의 uid 문서에서 pet 배열이 비어있으면 펫 등록 페이지로 이동
        const docRef = doc(storage, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        if (userData?.pet.length === 0) {
          router.push("/user/add-pet");
        } else {
          // setUserInfo((prev) => ({
          //   ...prev,
          //   pet: userData?.pet,
          // }));
          localStorage.setItem("pet", userData?.pet);
          router.push("/");
        }
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

  const signInTesting = () => {
    const TEST_ID = process.env.NEXT_PUBLIC_FIREBASE_TEST_ID!;
    const TEST_PASSWORD = process.env.NEXT_PUBLIC_FIREBASE_TEST_PASSWORD!;
    signInWithEmailAndPassword(auth, TEST_ID, TEST_PASSWORD)
      .then(async (userCredential) => {
        localStorage.setItem("displayName", userCredential.user.displayName!);
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("photoURL", userCredential.user.photoURL!);

        const docRef = doc(storage, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        localStorage.setItem("pet", userData?.pet);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/too-many-requests") {
          alert("잠시 후 다시 시도해주세요.");
        } else {
          alert("로그인에 실패했습니다!");
        }
      });
  };

  return (
    <MainWrapper>
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
        <Button type="submit" disabled={!email || !password} filled>
          로그인
        </Button>
        <Button type="button" filled onClick={signInTesting}>
          테스트 계정으로 로그인
        </Button>
        <Link href="/user/signup">회원가입</Link>
      </LoginBlock>
    </MainWrapper>
  );
}

export default LoginIndex;

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
`;

const H1Block = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.headline1};
  margin-bottom: 20px;
  text-align: center;
`;

const LoginBlock = styled.form`
  width: 100%;
  text-align: center;

  & > * {
    margin-bottom: 10px;
  }
`;
