import { auth } from "firebaseInit";
import { useEffect } from "react";
import styled from "styled-components";

import MainMenu from "@/components/MainMenu";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const user = auth.currentUser;

  // useEffect(() => {
  //   if (user === null) {
  //     router.push("/user/login");
  //   }
  // }, []);

  return (
    <main>
      <MyCatPicBlock>
        <img
          src={
            user?.photoURL || "https://i.ibb.co/Kc6tjcX5/default-profile.png"
          }
          alt="사용자 프로필사진"
        />
      </MyCatPicBlock>
      <GreetBlock>
        안녕하세요 {user?.displayName}님!
        <br />
        오늘은 무엇을 함께 했나요?
      </GreetBlock>
      <MainMenu />
    </main>
  );
}

const MyCatPicBlock = styled.div`
  width: 180px;
  height: 180px;
  margin: 50px auto 20px;
  background-color: gray;
  border-radius: 999px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`;

const GreetBlock = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.headline2};
`;
