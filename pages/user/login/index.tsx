import Button from "@/components/Button";
import Input from "@/components/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseInit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function LoginIndex() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("로그인 성공!");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("회원정보를 확인해주세요!");
      });
  };

  return (
    <>
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
      <Button onClick={handleLogin} disabled={!email || !password}>
        로그인
      </Button>
      <Link href="/user/signup">회원가입</Link>
    </>
  );
}

export default LoginIndex;
