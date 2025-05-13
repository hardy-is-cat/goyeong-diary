import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

function MainMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert("로그인이 필요한 서비스입니다!");
    }
  };
  return (
    <MenuBlock>
      <li>
        <Link href="/record/toilet" onClick={handleClick}>
          <p>감자캐기</p>
          <Image
            src="/images/icons/icon-dig-potato.png"
            width={82}
            height={47}
            sizes="100vw"
            alt="화장실 기록하기"
          />
        </Link>
      </li>
      <li>
        <Link href="/record/feeding" onClick={handleClick}>
          <p>밥주기</p>
          <Image
            src="/images/icons/icon-feeding.png"
            width={88}
            height={46}
            sizes="100vw"
            alt="급여 기록하기"
          />
        </Link>
      </li>
      <li>
        <Link href="/record/playing" onClick={handleClick}>
          <p>놀아주기</p>
          <Image
            src="/images/icons/icon-playing.png"
            width={61}
            height={46}
            sizes="100vw"
            alt="놀이시간 기록하기"
          />
        </Link>
      </li>
      <li>
        <Link href="/record/vaccination" onClick={handleClick}>
          <p>접종하기</p>
          <Image
            src="/images/icons/icon-vaccination.png"
            width={72}
            height={45}
            sizes="100vw"
            alt="접종 기록하기"
          />
        </Link>
      </li>
    </MenuBlock>
  );
}

export default MainMenu;

const MenuBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 auto 80px;

  li {
    width: calc(50% - 6px);
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
    color: white;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;

    a {
      display: block;
      padding-top: 32px;
      padding-bottom: 32px;
    }

    p {
      margin-bottom: 20px;
    }
  }
`;
