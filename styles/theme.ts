import { DefaultTheme } from "styled-components";

const colors = {
  text: "#222",
  black: "#444",
  gray1: "#666",
  gray2: "#999",
  gray3: "#AAAAAA",
  lightGray: "#E5E5E5",
  primary: "#AD58E1",
  error: "#EC4848",
  correct: "#19B200",
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

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type MediaQueryTypes = typeof media;

export const defaultTheme: DefaultTheme = {
  colors,
  media,
  fontSize,
};
