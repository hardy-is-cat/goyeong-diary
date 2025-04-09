import styled from "styled-components";
import GNB from "./GNB";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GNB />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
}

export default Layout;

const MainWrapper = styled.main`
  max-width: 430px;
  min-height: 100vh;
  padding-bottom: 80px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
