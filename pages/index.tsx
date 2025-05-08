import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { auth } from "firebaseInit";

import MainMenu from "@/components/MainMenu";
import Loading from "@/components/Loading";

export default function Home() {
  const [displayName, setDisplayName] = useState<string | null>("");
  const [photoURL, setPhotoURL] = useState<string | null>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL);
      }
      setIsLoading(false);
    });

    if (localStorage.getItem("isLoggedIn") === "true") setIsLoggedIn(true);
  }, []);

  return (
    <MainWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
            {isLoggedIn ? (
              <>
                안녕하세요 {displayName}님!
                <br />
                오늘은 무엇을 함께 했나요?
              </>
            ) : (
              <>
                로그인 후 기록을 저장해보세요!
                <br />
                <Link href="/user/login">로그인하기</Link>
              </>
            )}
          </GreetBlock>
          <MainMenu isLoggedIn={isLoggedIn} />
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.main`
  max-width: 430px;
  min-height: 100vh;
  padding: 80px 30px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const MyCatPicBlock = styled.div`
  width: 180px;
  height: 180px;
  margin: 0 auto 20px;
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

  a {
    display: inline-block;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    margin-top: 10px;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: ${({ theme }) => theme.fontSize.headline4};
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.2s;

    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const LogoutGreetBlock = styled;
