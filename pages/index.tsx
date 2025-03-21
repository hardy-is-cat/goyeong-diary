import { auth } from "firebaseInit";
import styled from "styled-components";

import MainMenu from "@/components/MainMenu";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState<string | null>("");
  const [photoURL, setPhotoURL] = useState<string | null>("");

  useEffect(() => {
    if (localStorage.getItem("displayName")) {
      setDisplayName(localStorage.getItem("displayName"));
      setPhotoURL(localStorage.getItem("photoURL"));
    }
  }, []);

  return (
    <main>
      <MyCatPicBlock>
        <Image
          src={photoURL || "https://i.ibb.co/Kc6tjcX5/default-profile.png"}
          alt="사용자 프로필사진"
          width={180}
          height={180}
          priority={true}
        />
      </MyCatPicBlock>
      <GreetBlock>
        안녕하세요 {displayName}님!
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
  line-height: 1.25;
`;
