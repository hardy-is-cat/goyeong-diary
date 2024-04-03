import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/global-styles";
import { defaultTheme } from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
