import "styled-components";
import { ColorsTypes, FontSizeTypes, MediaQueryTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTypes;
    fontSize: FontSizeTypes;
    media: MediaQueryTypes;
  }
}
