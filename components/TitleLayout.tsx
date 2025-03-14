import React, { ReactElement } from "react";
import GlobalStyle from "styles/global-styles";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";

import PageTitle from "@/components/PageTitle";

const TitleLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <PageTitle />
        {children}
      </ThemeProvider>
    </>
  );
};

export default TitleLayout;
