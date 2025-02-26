import Button from "@/components/Button";
import Input from "@/components/Input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebaseInit";
import { useRouter } from "next/router";
import { useState } from "react";

function SignUpIndex() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMatchedPassword, setIsMatchedPassword] = useState<boolean>();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("회원가입 성공!");
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage, "회원가입 실패!");
      });
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === password) {
      setIsMatchedPassword(true);
    } else {
      setIsMatchedPassword(false);
    }
  };

  return (
    // <form action="#">
    <>
      <Input
        type="email"
        placeholder="이메일을 입력해주세요."
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        helperText="비밀번호는 8자리 이상의 영어, 숫자, 특수문자 !@만 사용 가능합니다."
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        onChange={(e) =>
          e.target.value === password
            ? setIsMatchedPassword(true)
            : setIsMatchedPassword(false)
        }
        state={
          isMatchedPassword === undefined
            ? undefined
            : isMatchedPassword
              ? "correct"
              : "error"
        }
        helperText={
          isMatchedPassword === undefined
            ? undefined
            : isMatchedPassword
              ? "비밀번호가 일치합니다"
              : "비밀번호가 일치하지 않습니다"
        }
      />
      <Button type="button" onClick={handleSignUp}>
        회원가입
      </Button>
    </>
    // </form>
  );
}

export default SignUpIndex;
