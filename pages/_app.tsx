import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "@/components/Layout";

import GlobalStyle from "styles/global-styles";
import { defaultTheme } from "styles/theme";

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
