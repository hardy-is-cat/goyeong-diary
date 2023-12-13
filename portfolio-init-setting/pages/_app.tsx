import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/global-styles";
import { darkTheme, lightTheme } from "styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "라이트모드" : "다크모드"}
        </button>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
