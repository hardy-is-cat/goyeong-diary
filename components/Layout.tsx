import GNB from "./GNB";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GNB />
      {children}
    </>
  );
}

export default Layout;
