import { DefaultTheme } from "styled-components";

const lightColors = {
  bg: "#fff",
  gnb: "#fff",
  text: "#2D373B",
  primary: "#F5467A",
};

const darkColors = {
  bg: "#253034",
  gnb: "#2D373B",
  text: "#fff",
  primary: "#ACEA6E",
};

const fontSize = {
  headline1: "2.25rem",
  headline2: "1.5rem",
  headline3: "1.25rem",
  headline4: "1.125rem",
  headline5: "1rem",
  discription: "1rem",
  helperText: "0.875rem",
};

const customMediaQuery = (maxWidth: number): string => {
  return `@media (max-width: ${maxWidth}px)`;
};

const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1200),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(360),
};

export type LightColorTypes = typeof lightColors;
export type DarkColorTypes = typeof darkColors;
export type FontSizeTypes = typeof fontSize;
export type MediaQueryTypes = typeof media;

export const darkTheme: DefaultTheme = {
  colors: darkColors,
  media,
  fontSize,
};

export const lightTheme: DefaultTheme = {
  colors: lightColors,
  media,
  fontSize,
};
