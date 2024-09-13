import Link from "next/link";
import styled from "styled-components";

function MainMenu() {
  return (
    <MenuBlock>
      <li>
        <Link href="#">
          <p>감자캐기</p>
          <img src="images/icons/icon-dig-potato.png" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <p>밥주기</p>
          <img src="images/icons/icon-feeding.png" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <p>놀아주기</p>
          <img src="images/icons/icon-playing.png" />
        </Link>
      </li>
      <li>
        <Link href="#">
          <p>접종하기</p>
          <img src="images/icons/icon-vaccination.png" />
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
  width: 90%;
  margin: 0 auto;

  li {
    width: calc(50% - 6px);
    padding-top: 32px;
    padding-bottom: 32px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
    color: white;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;

    p {
      margin-bottom: 20px;
    }
  }
`;
