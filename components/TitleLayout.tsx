import React, { ReactElement } from "react";
import GlobalStyle from "styles/global-styles";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";

import Layout from "@/components/Layout";
import PageTitle from "@/components/PageTitle";

const TitleLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <Layout>
          <PageTitle />
          {children}
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default TitleLayout;
