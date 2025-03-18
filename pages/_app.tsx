import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "@/components/Layout";

import GlobalStyle from "styles/global-styles";
import { defaultTheme } from "styles/theme";
import { RecoilRoot, RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}
